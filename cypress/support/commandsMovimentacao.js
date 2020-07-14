import locator from './locators';

Cypress.Commands.add('visitPageMovimentacao', () => {
  cy.get(locator.menu.option_movimentacao).click();
  cy.url().should('eq', Cypress.config().baseUrlFront + '/movimentacao');
});

Cypress.Commands.add('visitPageExtrato', () => {
  cy.get(locator.menu.option_extrato).click();
  cy.url().should('eq', Cypress.config().baseUrlFront + '/extrato');
});

Cypress.Commands.add('insertTransaction', transactionData => {
  cy.get(locator.movimentacao.field_descricao).type(
    transactionData.description,
  );
  cy.get(locator.movimentacao.field_valor).type(transactionData.value, {
    delay: 100,
  });
  cy.get(locator.movimentacao.field_interessado).type(
    transactionData.receiver,
    { delay: 100 },
  );
  cy.get(locator.movimentacao.select_conta).select(transactionData.account, {
    delay: 100,
  });
  cy.get(locator.movimentacao.btn_status).click();
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(1000);
  cy.get(locator.movimentacao.btn_salvar).click();
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(1000);
});

Cypress.Commands.add('insertTransactionIncome', incomeData => {
  cy.get(locator.movimentacao.btn_tipo_receita).click();
  cy.insertTransaction(incomeData);
});

Cypress.Commands.add('insertTransactionExpense', expenseData => {
  cy.get(locator.movimentacao.btn_tipo_despesa).click();
  cy.insertTransaction(expenseData);
});

Cypress.Commands.add('deleteTransaction', transactionDescription => {
  cy.xpath(
    locator.extrato.fn_xp_movimentacao_delete(transactionDescription),
  ).click();
});
