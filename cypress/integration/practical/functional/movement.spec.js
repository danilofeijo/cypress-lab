/// <reference types="cypress" />
import locator from '../../../support/locators'
import '../../../support/commandsMovimentacao'

describe('Bank transition tests', () => {
  beforeEach(function () {
    // Log in application
    cy.fixture('loginData').as('login').then(() => {
      cy.loginApp(this.login.email, this.login.passwd)
    })

    // Reset application data
    cy.resetApp()

    // Access page Movimentacao
    cy.visitPageMovimentacao()
  });

  it('Should insert new income', () => {
    const incomeData = {
      description: 'Salário mensal',
      value: '950',
      receiver: 'Eu mesmo',
      account: 'Conta para movimentacoes'
    }

    // Insert new income
    cy.insertMovementIncome(incomeData)

    cy.get(locator.toast.success)
      .should('contain', 'Movimentação inserida com sucesso')
    cy.get(locator.extrato.item)
      .should('have.length', 7)
    cy.xpath(locator.extrato.fn_xp_movimentacao_item(incomeData.description, incomeData.value))
      .should('exist')
  });

  it('Should insert new expense', () => {
    const expenseData = {
      description: 'Compras no shopping',
      value: '150',
      receiver: 'Shopping Iguatemi',
      account: 'Conta para movimentacoes'
    }
    const expectedExpense = `//span[contains(.,'${expenseData.description}')]/following-sibling::small[contains(.,'${expenseData.value}')]`

    // Insert new expense
    cy.insertMovementExpense(expenseData)

    cy.get(locator.toast.success)
      .should('contain', 'Movimentação inserida com sucesso!')
    cy.get(locator.extrato.item)
      .should('have.length', 7)
    cy.xpath(expectedExpense)
      .should('exist')
  });

  it('Should remove a existing movement', () => {
    // Add movement to be deleted
    const incomeData = {
      description: 'Deletar movimentacao',
      value: '777',
      receiver: 'Ninguem',
      account: 'Conta para movimentacoes'
    }
    cy.insertMovementIncome(incomeData)

    // Delete movement previously created
    cy.xpath(locator.extrato.fn_xp_movimentacao_delete(incomeData.description)).click()

    cy.get(locator.toast.success)
      .should('contain', 'Movimentação removida com sucesso!')
  });
});
