/// <reference types="cypress" />
import locator from '../../../support/locators'
import '../../../support/commandsContas'
const { commerce } = require('faker')

describe('Account tests', () => {
  beforeEach(function () {
    // Log in application
    cy.fixture('loginData').as('login').then(() => {
      cy.loginApp(this.login.email, this.login.passwd)
    })

    // Access page Contas
    cy.visitPageContas()
  });

  it('Should insert new account', () => {
    const accountName = commerce.color()

    // Insert new account
    cy.insertAccount(accountName)
    cy.get(locator.toast.success)
      .should('contain', 'Conta inserida com sucesso!')
  });

  it('Should edit a created account', () => {
    // Updating account name
    cy.xpath(locator.contas.xp_btn_edit_conta_extrato).click()
    cy.get(locator.contas.field_account_name)
      .clear()
      .type('Account name updated')
    cy.get(locator.contas.btn_save).click()
    cy.get(locator.toast.success)
      .should('contain', 'Conta atualizada com sucesso!')
  });

  it('Should not Insert duplicated account', () => {
    const accountName = commerce.color()
    
    // Insert first account
    cy.insertAccount(accountName)
    cy.get(locator.toast.success)
    .should('contain', 'Conta inserida com sucesso!')

    // Try to insert the same account again
    cy.insertAccount(accountName)
    cy.get(locator.toast.error)
    .should('contain', 'Request failed with status code 400')

  });

  afterEach(() => {
    cy.resetApp()
  });
});
