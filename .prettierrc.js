module.exports = {
  ...require('@grafana/toolkit/src/config/prettier.plugin.config.json'),
  // If this is not here, prettier takes default 'always', which doesnt seem to be the rule that grafana-toolkit is linting by
  arrowParens: 'avoid',
};
