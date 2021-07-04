// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

const fs = require('fs-extra');
const path = require('path');

function getConfigurationByFile(file) {
  // caminho da pasta onde estão presentes os arquivos JSON dos ambientes
  const pathToConfigFile = path.resolve('config', `${file}.json`);

  return fs.readJson(pathToConfigFile);
}

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  const file = config.env.configFile || 'qa';
  console.info('Environment:', file);

  return getConfigurationByFile(file);
};
