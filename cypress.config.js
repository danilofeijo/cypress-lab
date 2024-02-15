const { defineConfig } = require('cypress');

module.exports = defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
    setupNodeEvents(on, config) {
      // Set default config
      config.baseUrl = 'https://front.serverest.dev';
      config.viewportWidth = 1366;
      config.viewportHeight = 788;
      config.video = true;
      config.defaultCommandTimeout = 10000;
      config.retries = { openMode: 0, runMode: 2 };

      config.reporter = 'cypress-multi-reporters';
      config.reporterOptions = { configFile: 'reporter-config.json' };

      const environmentName = config.env.environmentName || 'qa';
      const environmentFilename = `./config/${environmentName}.json`;
      console.info('[LOG CLI] Loading %s', environmentFilename);
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
