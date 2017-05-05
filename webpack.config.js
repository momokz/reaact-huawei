var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var dirname = 'React-Redux-work';
var pages = getEntries(dirname + '/**.html');
var entries = getEntries(dirname + '/scripts/entry/**.js');
var chunks = Object.keys(entries);
var config = {
    entry: entries,
    output: {
        path: __dirname + '/dist',
        // 每个页面对应的主js的生成配置
        filename: 'scripts/[name].js',
        chunkFilename: 'scripts/[id].chunk.js?[chunkhash]'
    },
    devServer: {
        inline: true,
        colors: true,
        historyApiFallback: true
    },
    module: {
        loaders: [{
            test: /\.css$/,
            // loader: 'style!css?minimize!postcss'
            loader: ExtractTextPlugin.extract('style', 'css?-minimize!postcss')
        }, {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.html$/,
            loader: "html?-minimize"
        }, {
            test: /\.(jpg|png|eot|svg|ttf|woff)$/,
            // loader: 'url?limit=8192&name=images/[name].[ext]'
            loader: 'url?limit=1&name=[path][name].[ext]'
        }]
    },
    postcss: [require('autoprefixer')({
        browsers: ['last 2 versions', '> 5%', 'ie 8', 'ie 9']
    })],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new CommonsChunkPlugin({
            // 将公共模块提取，生成名为`main`的chunk
            name: 'main',
            //提取哪些模块共有的部分
            chunks: chunks,
            // 提取chunks.length模块共有的部分
            minChunks: chunks.length
        }),
        new ExtractTextPlugin('[name].css')
    ]
};

// 获取指定路径下的入口文件
function getEntries(globPath) {
    var files = glob.sync(globPath),
        entries = {},
        extname,
        basename;
    files.forEach(function(filepath) {
        extname = path.extname(filepath);
        basename = path.basename(filepath, extname);
        entries[basename] = './' + filepath;
    });
    return entries;
};

Object.keys(pages).forEach(function(name) {
    // 生成html
    var conf = {
        // 生成的html存放路径，相对于dist文件
        filename: './' + name + '.html',
        // html模板路径
        template: './' + dirname + '/' + name + '.html',
        // js插入的位置，true-->'body', false-->'head'
        inject: true,
        // 为静态资源生成hash值
        hash: true,
        /*
         * 压缩这块，调用了html-minify，会导致压缩时候的很多html语法检查问题，
         * 如在html标签属性上使用{{...}}表达式，所以很多情况下并不需要在此配置压缩项，
         * 另外，UglifyJsPlugin会在压缩代码的时候连同html一起压缩。
         * 为避免压缩html，需要在html-loader上配置'html?-minimize'，见loaders中html-loader的配置。
         */
        minify: {
            // 移除HTML中的注释
            removeComments: true,
            // 删除空白符与换行符
            collapseWhitespace: false
        }
    };
    if (name in config.entry) {
        // 需要引入的chunk，不配置就会引入所有页面的资源
        conf.chunks = ['main', name];
    }
    config.plugins.push(new HtmlWebpackPlugin(conf));
});

module.exports = config;