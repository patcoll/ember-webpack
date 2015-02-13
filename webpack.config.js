var extend = require('extend');
var webpack = require('webpack');
var path = require('path');
var production = (process.env.NODE_ENV === 'production');
var dist = production ? 'dist' : 'build';
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var common = {
  module: {
    // handle packages that need brfs processing.
    postLoaders: [
      { test: /app\/register\.js$/, loader: 'transform/cacheable?require-globify' }
    ],
    loaders: [
      // loader for es6
      { test: /app\/[^\/]+\/.+\.js$/, loader: '6to5' },

      // copies files from app/static (shallow) as-is to output.path, ignoring file's full path.
      // if you want the full path, use [path][name].[ext]
      // { test: /app(\/|\\)(static|public)(\/|\\)[^\/\\]+/, loader: 'file?name=[name].[ext]' },
      { test: /(static|public)(\/|\\)[^\/\\]+/, loader: 'file?name=[name].[ext]' },

      // processes yaml files into json, then from json into a javascript object.
      // { test: /\.yml$/, loader: 'json!yaml' },

      // require JSON in a node-compatible way
      // { test: /\.json$/, loader: 'json' },

      // give well-behaved jquery plugins the $ global variable.
      // { test: /jquery[a-z\.-]+\.js$/i, loader: 'imports?$=jquery,jQuery=jquery' },

      // for static assets.
      { test: /\.(gif|jpg|png|eot|woff|ttf|svg)$/, loader: 'file?name=[path][name]-[sha512:hash:base62:7].[ext]' },
      // { test: /(\.md|LICENSE|README)$/, loader: 'file?name=[path][name]-[sha512:hash:base62:7].[ext]' },

      { test: /jquery(\.min)?\.js$/, loader: 'exports?jQuery!expose?jQuery' },

      // give bootstrap js plugins the jQuery global variable.
      // { test: /bootstrap\/js\/.+$/, loader: 'imports?$=jquery,jQuery=jquery' },
      { test: /ember(\.(min|debug))?\.js$/, loader: 'exports?Ember!imports?jQuery=jquery' },
      { test: /ember-data(\.(min|prod))?\.js$/, loader: 'exports?Ember.lookup.DS' },
      // { test: /ember/, loader: 'imports?jQuery=jquery' },

      // compiles less.
      // { test: /\.less$/, loader: ExtractTextPlugin.extract("style", "css!less") },
      // compiles less.
      // { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css") },

      // ember handlebars
      { test: /\.hbs$/, loader: 'ember-templates' },

      // compiles coffeescript.
      { test: /\.coffee$/, loader: 'coffee' }
    ],
    noParse: [
      // /jquery\.js$/
    ]
  },
  node: {
    __filename: true,
    __dirname: true
  },
  resolve: {
    root: __dirname,
    alias: {
      'jquery': 'bower_components/jquery/dist/jquery.min.js',
      'ember': 'bower_components/ember/ember.min.js',
      'ember-data': 'bower_components/ember-data/ember-data.min.js'
    },
    modulesDirectories: [
      "bower_components",
      "node_modules",
      "vendor/js"
    ],
    extensions: ["", ".js", ".jsx", ".coffee", ".less", ".css"]
  },
  devServer: {
    contentBase: "./build",
    lazy: true
  }
};

var plugins = function(opts) {
  var options = extend(true, {
    production: false,
    define: {
      FRONTEND: false
    }
  }, opts);
  var plugins = [];
  plugins.push(
    new webpack.ResolverPlugin(new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main']))
  );
  plugins.push(new webpack.ProvidePlugin({
    'window.jQuery': 'jquery',
    'window.Ember': 'ember',
    'window.DS': 'ember-data'
  }));
  // plugins.push(new webpack.IgnorePlugin(/vertx/));
  // plugins.push(new webpack.IgnorePlugin(/canvas/));
  plugins.push(new ExtractTextPlugin("app.css", { allChunks: true }));
  plugins.push(new webpack.DefinePlugin(options.define));
  if (options.production) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
    plugins.push(new webpack.optimize.OccurenceOrderPlugin());
  }
  return plugins;
};

module.exports = [
  extend(true, {}, common, {
    name: 'app',
    target: 'web',
    entry: path.resolve('app/main.coffee'),
    output: {
      path: path.resolve(dist),
      filename: 'app.js'
    },
    plugins: plugins({
      define: {
        FRONTEND: true
      },
      production: production
    })
  })
  // extend(true, {}, common, {
  //   name: 'vendor',
  //   target: 'web',
  //   entry: path.resolve('app/vendor.coffee'),
  //   output: {
  //     path: path.resolve(dist),
  //     filename: 'vendor.js'
  //   },
  //   plugins: plugins({
  //     define: {
  //       FRONTEND: true
  //     },
  //     production: production
  //   })
  // })
];
