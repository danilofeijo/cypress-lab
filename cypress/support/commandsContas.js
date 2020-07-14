import locator from './locators';

Cypress.Commands.add('visitPageContas', () => {
  cy.get(locator.menu.option_settings).click();
  cy.get(locator.menu.option_contas).click();
  cy.get(locator.contas.header).should('have.text', 'Contas');
});

Cypress.Commands.add('insertAccount', accountName => {
  cy.get(locator.contas.field_account_name).type(accountName);
  cy.get(locator.contas.btn_save).click();
});
