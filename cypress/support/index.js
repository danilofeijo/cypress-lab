// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import addContext from 'mochawesome/addContext';
require('cypress-xpath');

Cypress.on('test:after:run', (test, runnable) => {
  let videoName = Cypress.spec.name;
  videoName = videoName.replace('/.js.*', '.js');
  const videoUrl = 'videos/' + videoName + '.mp4';

  console.info(runnable);
  addContext({ test }, videoUrl);
});

// Priorização de Locators
Cypress.SelectorPlayground.defaults({
  selectorPriority: ['data-test', 'id', 'class', 'attributes', 'tag', 'nth-child'],
});

// Alternatively you can use CommonJS syntax:
// require('./commands')
