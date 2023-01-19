'use strict';

const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const modulesManager = require('./conf/modulesManger').instance;

const SOURCE_ROOT = __dirname + '/src/main/webpack';

const resolve = {
    extensions: ['.js', '.ts'],
    plugins: [new TSConfigPathsPlugin({
        configFile: './tsconfig.json'
    })],
    alias: {
        // Force all modules to use the same jquery version.
        'jquery': path.join(__dirname, 'node_modules/jquery/src/jquery')
    }
};
const projectModules = modulesManager.getModules();
const resourcesArr = modulesManager.getResourceModules();

module.exports = {
    resolve: resolve,

    entry: () => {
        const entryModulesObj = {};
        Object.values(projectModules).forEach((module) => {
            if(!entryModulesObj[module.namespace]) {
                entryModulesObj[module.namespace] = module.currentModuleRootFile;
            } else {
                entryModulesObj[module.pathReferencedModuleName] = module.currentModuleRootFile;
            }
        });
        return entryModulesObj;
    },

    output: {
        filename: (chunkData) => {
            const name = `${projectModules[chunkData.chunk.name].distClientlibDir}/[name].js`
            return name;
        },
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    },
                    {
                        loader: 'glob-import-loader',
                        options: {
                            resolve: resolve
                        }
                    }
                ]
            },
            {
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
            },
            {
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
            },
            {
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
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                type: 'asset/resource'
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ESLintPlugin({
            extensions: ['js', 'ts', 'tsx']
        }),
        new MiniCssExtractPlugin({
            filename: ({ chunk }) => {
                const name = `${projectModules[chunk.name].distClientlibDir}/[name].css`;
                return name;
            },
          }),
        new CopyWebpackPlugin({
            patterns: [...resourcesArr]
        })
    ],
    stats: {
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
    },
};
