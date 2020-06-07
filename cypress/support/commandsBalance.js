import locator from './locators'

Cypress.Commands.add('visitPageHome', () => {
  cy.get(locator.menu.option_home).click()
  cy.url()
    .should('eq', Cypress.config().baseUrl + '/')
})
