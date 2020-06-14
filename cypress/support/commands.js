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
  cy.visit('http://barrigareact.wcaquino.me')
  cy.get(locator.login.field_user).type(user)
  cy.get(locator.login.field_pass).type(pass)
  cy.get(locator.login.btn_login).click()

  cy.get(locator.toast.info)
  .should('contain', 'Bem vindo')
})

Cypress.Commands.add('resetApp', () => {
  cy.get(locator.menu.option_settings).click()
  cy.get(locator.menu.option_resetar).click()
  cy.visit(Cypress.config().baseUrl)
})

// API Commands
Cypress.Commands.add('getToken', (user, passwd) => {
  cy.request({
    method: 'POST',
    url: '/signin',
    body: {
      email: user,
      senha: passwd,
      redirecionar: false
    }
  }).its('body.token').should('not.be.empty')
})

Cypress.Commands.add('resetData', (token) => {
  cy.request({
    method: 'GET',
    headers: { Authorization: `JWT ${token}` },
    url: 'reset',
  }).its('status').should('be.equal', 200)
})
