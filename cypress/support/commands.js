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

// Deprecated code
// import locator from '../support/locators';

// Cypress.Commands.add('clickAlert', (locator, message) => {
//   cy.get(locator).click();
//   cy.on('window:alert', msg => {
//     expect(msg).to.be.equal(message);
//   });
// });

// Cypress.Commands.add(
//   'loginApp',
//   (user = 'fake@email.com', pass = 'fakePass') => {
//     cy.visit(Cypress.config().baseUrlFront);
//     cy.get(locator.login.field_user).type(user);
//     cy.get(locator.login.field_pass).type(pass);
//     cy.get(locator.login.btn_login).click();

//     cy.get(locator.toast.info).should('contain', 'Bem vindo');
//     cy.closeToast();
//   },
// );

// Cypress.Commands.add('resetApp', () => {
//   cy.get(locator.menu.option_settings).click();
//   cy.get(locator.menu.option_resetar).click();
//   cy.closeToast();
// });

// Cypress.Commands.add('closeToast', () => {
//   cy.get(locator.toast.closeButton).click();
//   cy.get(locator.toast.success).should('not.exist');
//   cy.get(locator.toast.info).should('not.exist');
//   cy.get(locator.toast.error).should('not.exist');
// });

// // API Commands
// Cypress.Commands.add('getToken', (user, passwd) => {
//   cy.request({
//     method: 'POST',
//     url: '/signin',
//     body: {
//       email: user,
//       senha: passwd,
//       redirecionar: false,
//     },
//   })
//     .its('body.token')
//     .should('not.be.empty')
//     .then(token => {
//       Cypress.env('token', token);
//       return token;
//     });
// });

// Cypress.Commands.add('resetData', () => {
//   cy.request({
//     method: 'GET',
//     // Commented due to Cypress.Command.overwrite
//     // headers: { Authorization: `JWT ${token}` },
//     url: 'reset',
//   })
//     .its('status')
//     .should('be.equal', 200);
// });

// Cypress.Commands.add('getContaByName', accountName => {
//   cy.request({
//     method: 'GET',
//     // Commented due to Cypress.Command.overwrite
//     // headers: { Authorization: `JWT ${token}` },
//     url: '/contas',
//     qs: {
//       nome: accountName,
//     },
//   }).then(res => {
//     return res.body[0].id;
//   });
// });

// Cypress.Commands.overwrite('request', (originalFn, ...options) => {
//   if (options.length === 1) {
//     if (Cypress.env('token')) {
//       options[0].headers = {
//         Authorization: `JWT ${Cypress.env('token')}`,
//       };
//     }
//   }

//   return originalFn(...options);
// });
