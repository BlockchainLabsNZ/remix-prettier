module.exports = function override(config, env) {
  config.optimization.minimize = false;
  console.log(config);

  return config;
};
