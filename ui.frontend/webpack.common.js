'use strict';

const path = require('path');
const glob = require('glob');
const webpack = require('webpack'); //to access built-in plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const modulesManager = require('./conf/modulesManger').instance;
const Util = require('./conf/util');
const projectModules = modulesManager.getModules();
const resourcesArr = modulesManager.getResourceModules();

const util = new Util({ module: 'Webpack.common' });
const SOURCE_ROOT = __dirname + '/src/main/webpack';

/* Common resolve configs for loader */
const resolve = {
    extensions: ['.js', '.ts'],
    plugins: [new TSConfigPathsPlugin({
        configFile: './tsconfig.json'
    })],
    alias: {
        'Datepicker': path.join(__dirname, 'node_modules/ab-datepicker/js/datepicker.min.js')
    }
};

/* webpack entry config handler, return object of each clientlib module */
const handleEntry = () => {
    const entryModulesObj = {};

    Object.values(projectModules).forEach((module) => {
        if (!entryModulesObj[module.namespace]) {
            entryModulesObj[module.namespace] = module.currentModuleRootFile;
        } else {
            entryModulesObj[module.pathReferencedModuleName] = module.currentModuleRootFile;
        }
    });

    return entryModulesObj
}

/* webpack output config handler */
const handleOutput = () => {
    const output = {};

    output.filename = (chunkData) => {
        const name = `${projectModules[chunkData.chunk.name].distClientlibDir}/[name].js`
        return name;
    };
    output.path = path.resolve(__dirname, 'dist');

    return output
}

/* webpack all loader config handler, rule array contain each loader configs */
const handleLoaders = () => {
    const module = {};
    let rules = [];
    /* typescript handler loader */
    rules.push({
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
            { loader: 'ts-loader' },
            {
                loader: 'glob-import-loader',
                options: { resolve: resolve }
            }
        ]
    });

    /* js and jsx loader */
    rules.push({
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [{
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        "targets": "defaults"
                    }],
                    '@babel/preset-react'
                ]
            }
        }]
    });

    /* CSS and SCSS loaders */
    rules.push({
        test: /\.(css|sass|scss)$/,
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    url: false
                }
            },
            {
                loader: 'sass-loader',
            },
            {
                loader: 'glob-import-loader',
                options: {
                    resolve: resolve
                }
            }
        ]
    });

    /* LESS css loader */
    rules.push({
        test: /\.less$/i,
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: "css-loader", // translates CSS into CommonJS
            },
            {
                loader: "less-loader", // compiles Less to CSS
            },
            {
                loader: 'glob-import-loader',
                options: {
                    resolve: resolve
                }
            }
        ],
    });

    /* font and image loader */
    rules.push({
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource'
    });

    module.rules = rules;
    return module
}

/* webpack plugins config handler */
const handlerPlugins = () => {
    let plugins = [];
    /* progress indicator plugin */
    plugins.push(new webpack.ProgressPlugin());

    /* clean webpack plugin to remove/clean your build folder*/
    plugins.push(new CleanWebpackPlugin());

    /* Plugin uses eslint to find and fix problems in javaScript code */
    plugins.push(new ESLintPlugin({
        extensions: ['js', 'ts', 'tsx']
    }));

    /* This plugin extracts CSS into separate files and creates a CSS file per JS file which contains CSS */
    plugins.push(new MiniCssExtractPlugin({
        filename: ({ chunk }) => {
            const name = `${projectModules[chunk.name].distClientlibDir}/[name].css`;
            return name;
        },
    }));

    /* Automatically load modules instead of having to import or require them everywhere */
    plugins.push(new webpack.ProvidePlugin({
        Popper: ['popper.js', 'default'],
        '$.fn.datepicker': 'Datepicker'
    }));

    /* Adds a banner to the top of each generated chunk */
    plugins.push(new webpack.BannerPlugin({
        banner: () => {
            return `Bundled - [filebase] at ${new Date()}`;
        },
    }));

    /* compress assets plugin */
    plugins.push(new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.jsx?$|\.css$|\.(scss|sass)$/
    }));

    /* Copies individual files or entire directories, which already exist, to the build directory */
    if (resourcesArr.length) {
        plugins.push(new CopyWebpackPlugin({
            patterns: [...resourcesArr]
        }));
    };

    return plugins
};

/* returns webpack resolve config */
const handleResolve = () => {
    return resolve
}

/* webpack stats config handler */
const handleStats = () => {
    return {
        assetsSort: 'chunks',
        builtAt: true,
        children: false,
        chunkGroups: true,
        chunkOrigins: true,
        colors: false,
        errors: true,
        errorDetails: true,
        env: true,
        modules: false,
        performance: true,
        providedExports: false,
        source: false,
        warnings: true
    };
}

/* webpack config object */
module.exports = {
    entry: handleEntry(),
    output: handleOutput(),
    module: handleLoaders(),
    plugins: handlerPlugins(),
    resolve: handleResolve(),
    stats: handleStats()
}