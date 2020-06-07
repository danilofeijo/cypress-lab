import locator from './locators'

Cypress.Commands.add('visitPageMovimentacao', () => {
  cy.get(locator.menu.option_movimentacao).click()
  cy.url()
    .should('eq', Cypress.config().baseUrl + '/movimentacao')
})

Cypress.Commands.add('insertMovement', (movementData) => {
  cy.get(locator.movimentacao.field_descricao).type(movementData.description)
  cy.get(locator.movimentacao.field_valor).type(movementData.value)
  cy.get(locator.movimentacao.field_interessado).type(movementData.receiver)
  cy.get(locator.movimentacao.select_conta).select(movementData.account)
  cy.get(locator.movimentacao.btn_status).click()
  cy.get(locator.movimentacao.btn_salvar).click()
})

Cypress.Commands.add('insertMovementIncome', (incomeData) => {
  cy.get(locator.movimentacao.btn_tipo_receita).click()
  cy.insertMovement(incomeData)
})

Cypress.Commands.add('insertMovementExpense', (expenseData) => {
  cy.get(locator.movimentacao.btn_tipo_despesa).click()
  cy.insertMovement(expenseData)
})

