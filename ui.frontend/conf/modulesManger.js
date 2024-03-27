const glob = require('glob');
const fs = require('fs');
const path = require('path');
const Util = require('./util');

const APP_PROJECT_DIR = path.join(__dirname,
    '..', 'ui.apps', 'src', 'main', 'content', 'jcr_root', 'apps', 'sunlife');
const UI_APP = 'ui.apps';
const tenant = 'core';
const moduleEntryFile = 'index_module.js'; 

const util = new Util({ module: 'ModulesManager' });

Util.tenantPrefix = `${tenant}-`;

const explicitModulesPaths = [
    'src/main/webpack/components/content/accordion/index_module.js',
    'src/main/webpack/components/content/core-accordion/v1/accordion/index_module.js',
    'src/main/webpack/components/form/text/index_module.js',
    'src/main/webpack/components/content/text/index_module.js',
    'src/main/webpack/prerequisite/base/index_module.js',
    'src/main/webpack/prerequisite/core-utils/v1/index_module.js',
    'src/main/webpack/prerequisite/core-vendor.jquery/v1/index_module.js'
];

const explicitModules = () => {
    if (explicitModulesPaths) {
        util.logger(`Indexing explicit modules with debug true`);
        util.logger(`Explicit modules : \n ${explicitModulesPaths}`);
        return explicitModulesPaths;
    }

    let rootDir = 'src/main/webpack/components/'
    let explicitModulesArr = glob.sync(rootDir + '*/**/index_module.js');
    util.logger(`Indexing explicit modules with debug ${this.debug}`);
    util.logger(`Explicit modules on root -'${rootDir}'  : \n ${explicitModulesArr}`);
    return explicitModulesArr;
}

const ModulesManager = class {
    constructor(params) {
        this.modules = {};
        this.modulesToBundle = {};
        this.resourceModules = [];
        this.reactComps = [];
        this.globalModulesObj = {};
        this.debug = params.debug;
        this.tenant = params.tenant;
        this.tenantDir = this.getTenantDir(this.tenant);
        this.moduleVersion = null;
        this.initModules();
    }

    /**
        This method is responsible for initializing the searching of all the module in the app which need to be bundled.
        @function initModules
    **/
    initModules() {
        this.findModules();
    }

    /**
        It returns the path of ui.app directory.
        @function getTenantDir
    **/
    getTenantDir(tenant) {
        const tenantDir = path.join(APP_PROJECT_DIR, tenant);
        return UI_APP.concat(tenantDir.split(UI_APP)[1]);
    }

    /**
        This method find all the modules in the app which need to be bundled using webpack by finding index_module.js in the app structure.
        @function findModules
    **/
    findModules() {
        const modules = this.debug ? explicitModules() : glob.sync('*/**/index_module.js');
        // util.logger(`Indexing modules with debug ${this.debug}`);

        for (let i = 0; i < modules.length; i++) {
            const modulePath = modules[i];
            let moduleName = null;
            const md = this.getModuleDefinition(modulePath);

            if (md) {
                moduleName = !this.modules[md.namespace] ? md.namespace : md.pathReferencedModuleName;
                md.isGlobal = false;
                this.modules[moduleName] = md;
            }

            this.globalModuleConfigHandler(moduleName);

            if(moduleName && !this.modules[moduleName].isGlobal) {
                this.modulesToBundle[moduleName] = md;
            }
        }

        if (this.reactComps.length) {
            util.logger(`Indexed react-components ${this.reactComps}`);
            this.modules['react-components'].currentModuleRootFile = this.reactComps;
        }

        // util.logger(`getModuleDefinition ${JSON.stringify(this.modules, null, 4)}`);
    }

    /**
        HOC method update the global module config depending upon its nature
        @function globalModuleConfigHandler
        @param {string} moduleName - name of the module
    **/
    globalModuleConfigHandler(moduleName){
        if(!moduleName) return;
        let module = this.modules[moduleName];
        if(!this.isModuleGlobal(this.modules[moduleName].currentModuleRootDir)){
            return;
        }
        this.generateGlobalModuleConfigObj(module, moduleName)
    }

    /**
        This method generate the global module config of a module
        @function generateGlobalModuleConfigObj
         @param {Object} module - Object containing metadata of a module
        @param {String} moduleName - name of the module
    **/
    generateGlobalModuleConfigObj(module, moduleName) {
        let allFilesInCurrentModule = [];
        const modulePathStr = `${module.currentModuleRootDir.substring(0, module.currentModuleRootDir.length - 1)}`;
        const filePath = `${module.distClientlibDir}/${moduleName}`;
        this.modules[moduleName].isGlobal = true;

        allFilesInCurrentModule = this.getFiles(modulePathStr);
        allFilesInCurrentModule = this.excludeEntryFile(allFilesInCurrentModule);

        if(this.isJsFileExists(allFilesInCurrentModule)) {
            this.appendGlobalModuleConfigObj(allFilesInCurrentModule, filePath,'js');
        }
        
        if(this.isCssFileExists(allFilesInCurrentModule)) {
            this.appendGlobalModuleConfigObj(allFilesInCurrentModule, filePath, 'css');
        }  
    }

    appendGlobalModuleConfigObj(allFilesInCurrentModule,filePath, type ) {
        const regex = type === 'js' ? /\.js$/ : /\.css$/;
        let globalModuleConfigObj = {};
        const filteredFiles = this.filterFiles(allFilesInCurrentModule, regex);

        globalModuleConfigObj.out =`${filePath}.${type}`;
        globalModuleConfigObj.src = filteredFiles;
        this.globalModulesObj[globalModuleConfigObj.out] = globalModuleConfigObj.src;
    }

    /**
        This recursive method to get files
        @function getFiles
        @param {String} dir - path sting of directory to get files
        @param {Array} files - list of files
    **/
    getFiles(dir, files = []) {
        // Get an array of all files and directories in the passed directory using fs.readdirSync
        const fileList = fs.readdirSync(dir);
        // Create the full path of the file/directory by concatenating the passed directory and file/directory name
        for (const file of fileList) {
        const name = `${dir}/${file}`;
        // Check if the current file/directory is a directory using fs.statSync
        if (fs.statSync(name).isDirectory()) {
            // If it is a directory, recursively call the getFiles function with the directory path and the files array
            this.getFiles(name, files);
        } else {
            // If it is a file, push the full path to the files array
            files.push(name);
        }
        }
        return files;
    }

    /**
        This method filter the files from given array based on provided regex
        @function filterFiles
        @param {Array} filePaths - list of files paths to filter out
        @param {String} regex - regex to filter files
    **/
    filterFiles(filePaths, regex) {
        const filteredFiles = [];
      
        for (const filePath of filePaths) {
          if (filePath.match(regex)) {
            filteredFiles.push(filePath);
          }
        }
      
        return filteredFiles;
    }

    /**
        This method return boolen values based upon if JS files exists into given filePaths or not.
        @function isJsFileExists
        @param {Array} filePaths - list of files paths to look into
    **/
    isJsFileExists(filePaths) {
        const jsRegex = /\.js$/;
        return this.filterFiles(filePaths, jsRegex).length;
    }

    /**
        This method return boolen values based upon if CSS files exists into given filePaths or not.
        @function isCssFileExists
        @param {Array} filePaths - list of files paths to look into
    **/
    isCssFileExists(filePaths) {
        const cssRegex = /\.css$/;
        return this.filterFiles(filePaths, cssRegex).length;
    }

    /**
        This method return list of files after excluding the module entry file
        @function excludeEntryFile
        @param {Array} allFilesInCurrentModule - list of files paths to look into and filter out entry file
    **/
    excludeEntryFile(allFilesInCurrentModule) {
        return allFilesInCurrentModule.filter(function(file) {
            return !file.includes(moduleEntryFile)
        })
    }

    /**
        This method returns the module information in a object of the given name.
        @function getModule
    **/
    getModule(name) {
        return this.getModules()[name];
    }

    /**
        This method returns the name of module based on namespace and path of the module given.
        @function getModuleName
    **/
    getModuleName(namespace, pathReferencedModuleName) {
        if (!this.modules[namespace]) {
            return namespace;
        } else {
            return pathReferencedModuleName;
        }
    }

     /**
        This method returns the module details after processing the module and its attribute.
        @function getModuleDefinition
    **/
    getModuleDefinition(currentModuleRootFile) {
        let isReactComp = false;
        let isContainResources = false;
        let jsxFiles = [];
        let moduleNamespaceIndex = null;
        let isPrefixModule = false;
        this.moduleVersion = null;

        /* current given root file paths root directory */
        const currentModuleRootDir = currentModuleRootFile.replace('index_module.js', '');

        /* search for jsx file in current directory */
        jsxFiles = glob.sync(`${currentModuleRootDir}**/*jsx`);

        /* if jsx(react) files exist then push then to any array for bundling together as one */
        if (jsxFiles.length) {
            isReactComp = true;
            this.reactComps.push(currentModuleRootFile);
            return
        }

        /* collect root file path chucks in a array */
        const currentModuleRootFileChunks = currentModuleRootFile.split('/');

        this.moduleVersion = currentModuleRootFileChunks.filter(util.getVersion)[0];

        isPrefixModule = currentModuleRootFileChunks.some(util.isTenantPrefixModule);

        currentModuleRootFileChunks.shift();

        if (this.moduleVersion) {
            moduleNamespaceIndex = currentModuleRootFileChunks.indexOf(this.moduleVersion) - 1;
        } else {
            moduleNamespaceIndex = currentModuleRootFileChunks.length - 2
        }

        /* assign a namespace to module as its folder name */
        const namespace = `${currentModuleRootFileChunks[moduleNamespaceIndex]}${this.moduleVersion ? '.' + this.moduleVersion : ''}`;

        /* check module type as component or prerequisite */
        const moduleType = currentModuleRootFileChunks.includes('components') ? 'components' : 'prerequisite';

        const moduleTypeDir = moduleType === 'components' ? 'components' : 'clientlibs';
        const currentModulePathDir = path.join(moduleTypeDir, ...currentModuleRootFileChunks.slice(3, currentModuleRootFileChunks.length - 1));


        const appClientlibRootDir = path.join(this.tenantDir, currentModulePathDir).replace(/\\/g, '/');

        /* make unique module name by appending it with parent folder to avoid duplicate modules if exist */
        const pathReferencedModuleName = [...currentModuleRootFileChunks.slice(3, currentModuleRootFileChunks.length - 1)].join('.');

        const type = moduleType === 'components' ? 'comp-' : '';
        const moduleName = this.getModuleName(namespace, pathReferencedModuleName);

        /* folder name for webpack output bundle for current module */
        const distClientlibDir = `clientlib-${type}${moduleName}`;


        /* if current module contain any resources directory then create webpack copy plugin pattern array to move everything in that clientlib dist folder */
        try {
            if (fs.existsSync(path.join(currentModuleRootDir, 'resources'))) {
                isContainResources = true;
                let files = glob.sync(currentModuleRootDir + 'resources/*.*');
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    this.resourceModules.push(
                        {
                            from: `./${file}`, to: `./${distClientlibDir}/resources`
                        }
                    )
                }
            }
        } catch (e) {
            console.log("An error occurred.", currentModuleRootDir, e)
        }

        return {
            namespace,
            currentModuleRootFile,
            currentModuleRootDir,
            moduleType,
            appClientlibRootDir,
            pathReferencedModuleName,
            distClientlibDir,
            isContainResources,
            isReactComp,
            isPrefixModule
        };
    }

    /**
        This method return boolen whether the passed current module is global scope module or not.
        @function isModuleGlobal
        @param currentModuleRootDir String path of the module to be verified
    **/
    isModuleGlobal(currentModuleRootDir) {
        let isGlobalModule =  false;
        const configPath = path.join(currentModuleRootDir, 'context.json');
        if (fs.existsSync(configPath)) {
            let fileContent = null,
                explicitConfigs = null;
            try {
                fileContent = fs.readFileSync(configPath, { encoding: 'utf8' });
                explicitConfigs = JSON.parse(fileContent);
                isGlobalModule = explicitConfigs.isGlobalModule ? true : false;
            }
            catch (err) {
                console.log('Error while reading context.json at -', configPath, err);
                return;
            }
        } 

        return isGlobalModule;
    }

    /**
        This method return all the module exists in the app.
        @function getModules
    **/
    getModules() {
        return this.modules;
    }

    /**
        This method return all the modules which need to be bundled through webpack.
        @function getModulesToBundle
    **/
    getModulesToBundle() {
        return this.modulesToBundle;
    }

    /**
        This method return all the module which have resource folder in them.
        @function getResourceModules
    **/
    getResourceModules() {
        return this.resourceModules;
    }

    /**
        This method return all the global scope module configs along with file path and source of files need to merge without getting bundled with webpack.
        @function getGlobalModules
    **/
    getGlobalModules() {
        return this.globalModulesObj;
    }
};


module.exports.ModulesManager = ModulesManager;

module.exports.instance = new ModulesManager({
    namespace: 'sunlife',
    debug: false,
    tenant: tenant
});