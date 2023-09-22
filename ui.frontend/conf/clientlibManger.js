const glob = require('glob');
const fs = require('fs');
const path = require('path');


const ClientLibManager = class {
    constructor(params) {
        this.clientlibConfig = {};
        this.modules = params.modules;
        this.explicitCLConfig = {};
        this.tenant = params.tenant;
        this._isExplicitModule = false;
        this._isComponentModule = false;
        this.processModules();
    }

    /**
        This function is responsible for processing each module and initializing the clientlibConfig property for each module. It loops through each module and calls the _getExplicitConfigs(module) function to initialize the explicit client library configurations for the module.
        @function processModules
    **/
    processModules() {
        let modules = Object.keys(this.modules);
        for (let i = 0; i < modules.length; i++) {
            const module = modules[i];
            this.clientlibConfig[module] = {};
            this.setModuleType(module)
            this._getExplicitConfigs(module);
        }

    }

    /**
       This function is responsible for setting module component type boolen value depending upon it mouduleType value. 
       @function setModuleType
   **/
    setModuleType(module) {
        this._isComponentModule = this.modules[module].moduleType === 'components' ? true : false;
    }

    /**
       This function is responsible for configuring the client library object for a given module. It calls several other private functions _updateCLName(), _updateCLOutputPath(), _updateCLCategory(), _updateCLEmbed(), and _updateCLAssests() to set the different properties of the client library object.
       @function configureClientlibObj
   **/
    configureClientlibObj(module) {
        this._updateCLName(module);
        this._updateCLOutputPath(module);
        this._updateCLCategory(module);
        this._updateCLDependencies(module);
        this._updateCLEmbed(module);
        this._updateCLAssests(module);
    }

    /**
        This function returns the root directory for a given module based on its type. It returns the prerequisite root directory if the module is a prerequisite, and the component root directory if the module is a component.
        @function _getCLRoot
    **/
    _getCLRoot(module) {
        if (!this._isComponentModule) {
            return this._getPrerequisiteCLPath(module);
        } else {
            return this._getComponentCLPath(module);
        }
    }

    /**
       This function returns an array of values for a given type of explicit client library configuration. If the type exists in the explicitCLConfig object, it returns an array of the values. Otherwise, it returns an empty array.
       @function _getExplicitProperty
   **/
    _getExplicitProperty(type) {
        let returnPropArray = [];
        if (this.explicitCLConfig[type]) {
            returnPropArray.push(...this.explicitCLConfig[type].split(','));
        }
        return returnPropArray;
    }

    /**
        This function sets the name property of the client library object for a given module to the module's name.
        @function _updateCLName
    **/
    _updateCLName(module) {
        if (this._isExplicitModule) {
            this.clientlibConfig[module]['name'] = this.explicitCLConfig.name;
            return;
        }
        this.clientlibConfig[module]['name'] = module;
    }

    /**
        This function sets the outputPath property of the client library object for a given module. It sets the output path based on the module's type.
        @function _updateCLOutputPath
    **/
    _updateCLOutputPath(module) {
        const clientlibRootDir = this.modules[module].appClientlibRootDir;
        const clientLibPath = this._isComponentModule ? `${clientlibRootDir}/clientlibs` : `${clientlibRootDir}/`;
        this.clientlibConfig[module]['outputPath'] = clientLibPath;
    }

    /**
        This function sets the categories property of the client library object for a given module. It sets the categories based on the module's type and explicit categories.
        @function _updateCLCategory
    **/
    _updateCLCategory(module) {
        const categoriesArr = [];

        if (this._isExplicitModule || this.modules[module].isPrefixModule) {

            categoriesArr.push(...this._getExplicitProperty('categories'));

            if (this.modules[module].isReactComp) {
                categoriesArr.push(`sunlife.${this.tenant}-react-component`);
            }

            if (this._isComponentModule) {
                categoriesArr.push(`sunlife.${this.tenant}-components`, `sunlife.${this.tenant}-component.${module}`);
            }

            this.clientlibConfig[module]['categories'] = categoriesArr;
            return
        }


        if (this._isComponentModule) {
            categoriesArr.push(`sunlife.${this.tenant}.component`, `sunlife.${this.tenant}.components.content.${module}`);
        }

        if (this.modules[module].isReactComp) {
            categoriesArr.push(`sunlife.${this.tenant}.react-component`);
        }

        categoriesArr.push(`sunlife.${this.tenant}.${module}`, ...this._getExplicitProperty('categories'));

        this.clientlibConfig[module]['categories'] = categoriesArr;
    }

    /**
        This function sets the embed property of the client library object for a given module. It sets the embed property based on the explicit embed property.
        @function _updateCLEmbed
    **/
    _updateCLEmbed(module) {
        const embedArr = [];
        embedArr.push(...this._getExplicitProperty('embed'));
        this.clientlibConfig[module]['embed'] = embedArr;
    }

    /**
        This function sets the dependencies property of the client library object for a given module. It sets the dependencies property based on the explicit dependencies property.
        @function _updateCLDependencies
    **/
    _updateCLDependencies(module) {
        const dependenciesArr = [];
        dependenciesArr.push(...this._getExplicitProperty('dependencies'));
        this.clientlibConfig[module]['dependencies'] = dependenciesArr;
    }

    /**
        This function sets the assets property of the client library object for a given module. It sets the js and css properties based on the module's distribution client library directory. If the module contains resources, it sets the resources property.
        @function _updateCLAssests
    **/
    _updateCLAssests(module) {
        this.clientlibConfig[module]['assets'] = {
            js: this._getAssetInfo('js', module),
            css: this._getAssetInfo('css', module)
        };

        if (this.modules[module].isContainResources) {
            this.clientlibConfig[module]['assets']['resources'] = { base: "resources", files: ['*.eot', '*.svg', '*.ttf', '*.woff', '*.woff2', '*.png', '*.otf', '**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2', '**/*.png', '**/*.otf'] };
        }
    }

    /**
        This function returns an object containing information about the assets of a given type for a given module. It takes an optional third parameter configs to override the default configuration. It sets the cwd property to the module's distribution client library directory and sets the files property to include all files of the given type in the directory.
        @function _getAssetInfo
    **/
    _getAssetInfo(type, module, configs) {
        return {
            cwd: this.modules[module].distClientlibDir,
            files: [`*.${type}`, `**/*.${type}`],
            flatten: false,
            ...configs
        }
    }

    /**
        This function reads the context.json file
        @function _getExplicitConfigs
    **/
    _getExplicitConfigs(module) {
        const configPath = path.join(__dirname, '..', this.modules[module].currentModuleRootDir, 'context.json');

        if (fs.existsSync(configPath)) {
            let fileContent = null,
                explicitConfigs = null;
            try {
                fileContent = fs.readFileSync(configPath, { encoding: 'utf8' });
                explicitConfigs = JSON.parse(fileContent);
                this._isExplicitModule = explicitConfigs.isExplicitModule ? true : false;
                this.explicitCLConfig = { ...explicitConfigs }
            }
            catch (err) {
                console.log('Error while reading context.json at -', configPath, err);
                return;
            }
        } else {
            this.explicitCLConfig = {};
            this._isExplicitModule = false;
        }

        this.configureClientlibObj(module);
    }

    /**
        Get function to return the clientlib config object
        @function getClientlibs
    **/
    getClientlibs() {
        return this.clientlibConfig;
    }

    /**
        Get method for explicit module type
        @function isExplicitModule
    **/
    get isExplicitModule() {
        return this._isExplicitModule;
    }

    /**
        Set method for explicit module type
        @function isExplicitModule
    **/
    set isExplicitModule(flag) {
        this._isExplicitModule = flag;
    }
};

module.exports.clientLibManager = ClientLibManager;
