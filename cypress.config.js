const { defineConfig } = require('cypress');
const cypressSplit = require('cypress-split');

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    reportFilename: '[name].html',
    overwrite: true,
    html: true,
    json: false,
  },
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
    setupNodeEvents(on, config) {
      cypressSplit(on, config);

      // Set default config
      config.baseUrl = 'https://front.serverest.dev';
      config.viewportWidth = 1366;
      config.viewportHeight = 788;
      config.video = true;
      config.defaultCommandTimeout = 10000;
      // config.reporter = 'cypress-multi-reporters';
      // config.reporterOptions = { configFile: 'reporter-config.json' };

      const environmentName = config.env.environmentName || 'qa';
      const environmentFilename = `./config/${environmentName}.json`;
      console.log('LOG: [CLI] Loading %s', environmentFilename);
      const settings = require(environmentFilename);

      if (settings.baseUrl) {
        config.baseUrl = settings.baseUrl;
      }
      if (settings.env) {
        config.env = {
          ...config.env,
          ...settings.env,
        };
      }

      return config;
    },
  },
});
