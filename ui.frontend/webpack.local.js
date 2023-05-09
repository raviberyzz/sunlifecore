const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const SOURCE_ROOT = __dirname + '/src/main/webpack';

module.exports = env => {

    const writeToDisk = env && Boolean(env.writeToDisk);

    return merge(common, {
        mode: 'development',
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin(),
                new CssMinimizerPlugin({
                    minimizerOptions: {
                        preset: ['default', {
                            calc: true,
                            convertValues: true,
                            discardComments: {
                                removeAll: true
                            },
                            discardDuplicates: true,
                            discardEmpty: true,
                            mergeRules: true,
                            normalizeCharset: true,
                            reduceInitial: true, // This is since IE11 does not support the value Initial
                            svgo: true
                        }],
                    }
                }),
            ],
            splitChunks: {
                cacheGroups: {
                    main: {
                        chunks: 'all',
                        name: 'site',
                        test: 'main',
                        enforce: true
                    }
                }
            }
        },
        performance: {
            hints: 'warning',
            maxAssetSize: 1048576,
            maxEntrypointSize: 1048576
        }
    });
}
