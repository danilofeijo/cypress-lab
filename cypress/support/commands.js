// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import 'cypress-file-upload';
import { LoginUI } from '../page/login';
const globalElements = require('../page/global/elements').ELEMENTS;

Cypress.Commands.add('login', (email, pass) => {
  LoginUI.visitLogin();
  LoginUI.submitLogin(email, pass);

  cy.get(globalElements.headerBar);
});

/**
 * Log in conduit through API
 */
Cypress.Commands.add('loginAPI', (email, password) => {
  // TODO - Make it log in, set the JWT token, start a logged session
  cy.request({
    method: 'POST',
    url: 'https://conduit.productionready.io/api/users/login',
    form: true,
    body: {
      user: {
        email,
        password,
      },
    },
  })
    .its('status')
    .should('equal', 200);
});
