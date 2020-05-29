/// <reference types="cypress" />
const { commerce } = require('faker')

const baseUrl = 'http://barrigareact.wcaquino.me'

describe('Account tests', () => {
  before(function () {
    // Visit login page
    cy.visit(baseUrl)

    // Log in application
    cy.fixture('loginData').as('login').then(() => {
      cy.get('[data-test=email]').type(this.login.email)
      cy.get('[data-test=passwd]').type(this.login.passwd)
    })
    cy.get('button[type=submit]').click()

    cy.get('.toast-info')
      .should('contain', 'Bem vindo')
  });

  it('Insert new account', () => {
    // Access Account page
    cy.get('[data-test=menu-settings]').click()
    cy.get('a[href="/contas"]').click()

    // Adding new account
    cy.get('[data-test=nome]').type(commerce.color())
    cy.get('.btn').click()

    cy.get('.toast-success')
      .should('contain', 'Conta inserida com sucesso!')
  });
});
