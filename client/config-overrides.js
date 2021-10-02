const {
  override,
  // addDecoratorsLegacy,
  // disableEsLint,
  // addBundleVisualizer,
  addWebpackAlias,
  addWebpackResolve,
  // addWebpackPlugin,
  // adjustWorkbox, 
} = require(`customize-cra`);

const path = require(`path`);
// const webpack = require(`webpack`);

function PoundResolverPlugin (source, target, prefix, to) {
  this.source = source || `resolve`;
  this.target = target || `resolve`;
  if (!prefix) throw new Error(`prefix is required`);
  if (!to) throw new Error(`to is required`);
  this.prefix = prefix;
  this.to = to;
  this.re = new RegExp(`^${prefix}([A-Z][a-z\\d]*)\\.js$`);
  // console.log(this.re);
}

PoundResolverPlugin.prototype.apply = function (resolver) {
  const target = resolver.ensureHook(this.target);
  resolver.getHook(this.source).tapAsync(`PoundResolverPlugin`,
    (request, resolveContext, callback) => {
      let m;
      if (m = request.request.match(this.re)) {
        // console.log(request.request);
        var req = m[1];
        // console.log(request.path, this.to, `${req}.js`);
        var obj = Object.assign({}, request, {
          request: path.join(request.path, this.to, `${req}.js`),
        });
        // console.log(obj);
        return resolver.doResolve(target, obj, null, resolveContext, callback);
      }
      callback();
    });
};

module.exports = override(
  // enable legacy decorators babel plugin
  // addDecoratorsLegacy(),
 
  // disable eslint in webpack
  // disableEsLint(),
 
  // add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
  // process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),
 
  // add an alias for "ag-grid-react" imports
  addWebpackAlias({
    // eslint-disable-next-line no-useless-computed-key
    [`@`]: path.resolve(__dirname, `./src`),
  }),
  addWebpackResolve({
    plugins: [new PoundResolverPlugin(null, null, `#`, `components`)],
  }),
);