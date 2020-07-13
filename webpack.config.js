const util = require('util');

module.exports.getWebpackConfig = (config, options) => {
  // removes all 'data-test' attributes from React components - only 'remove-object-properties' worked, so if any lib need 'data-test', bad luck :S
  if (options.production) {
    const rulesWithBabelLoader = config.module.rules.filter(x => {
      if (x.loaders) {
        return x.loaders.some(loader => loader.loader === 'babel-loader');
      }
      return false;
    });
    const patchedBabelRules = rulesWithBabelLoader.map(rule => ({
      ...rule,
      loaders: rule.loaders.map(loader => ({
        ...loader,
        options: {
          ...loader.options,
          ...(loader.options.plugins
            ? {
                plugins: [...loader.options.plugins, ['remove-object-properties', { regexp: 'data-test' }]],
              }
            : {}),
        },
      })),
    }));
    return {
      ...config,
      module: {
        ...config.module,
        rules: [...config.module.rules, ...patchedBabelRules],
      },
    };
  }
  return config;
};
