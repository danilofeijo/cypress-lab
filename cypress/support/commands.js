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
import locator from '../support/locators'

Cypress.Commands.add('clickAlert', (locator, message) => {
  cy.get(locator).click()
  cy.on('window:alert', msg => {
    expect(msg).to.be.equal(message);
  })
})

Cypress.Commands.add('loginApp', (user, pass) => {
  cy.visit(Cypress.config().baseUrl)
  cy.get(locator.login.field_user).type(user)
  cy.get(locator.login.field_pass).type(pass)
  cy.get(locator.login.btn_login).click()

  cy.get(locator.toast.info)
  .should('contain', 'Bem vindo')
})

Cypress.Commands.add('resetApp', () => {
  cy.get(locator.menu.option_settings).click()
  cy.get(locator.menu.option_resetar).click()
})
