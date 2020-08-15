/// <reference types="cypress" />

import '../../../support/commandsContas';
import '../../../support/commandsBalance';
import '../../../support/commandsMovimentacao';

const { commerce } = require('faker');
import locator from '../../../support/locators';

beforeEach(function () {
  cy.resetApp();
});

describe('Account tests', () => {
  before(function () {
    // Log in application
    cy.fixture('loginData')
      .as('login')
      .then(() => {
        cy.loginApp(this.login.email, this.login.passwd);
      });
  });

  beforeEach(() => {
    // Access page Contas
    cy.visitPageContas();
  });

  it('Should insert new account', () => {
    // Set up data
    const accountName = commerce.color();

    // Actions - Insert new account
    cy.insertAccount(accountName);

    // Validations
    cy.get(locator.toast.success).should(
      'contain',
      'Conta inserida com sucesso!',
    );
  });

  it('Should edit a created account', () => {
    // Actions - Updating account name
    cy.xpath(locator.contas.xp_btn_edit_conta_extrato).click();
    cy.get(locator.contas.field_account_name)
      .clear()
      .type('Account name updated');
    cy.get(locator.contas.btn_save).click();

    // Validations
    cy.get(locator.toast.success).should(
      'contain',
      'Conta atualizada com sucesso!',
    );
  });

  it('Should not Insert duplicated account', () => {
    // Set up data
    const accountName = commerce.color();

    // Set up data - Insert first account
    cy.insertAccount(accountName);
    cy.get(locator.toast.success).should(
      'contain',
      'Conta inserida com sucesso!',
    );
    cy.closeToast();

    // Actions - Try to insert the same account again
    cy.insertAccount(accountName);

    // Validations
    cy.get(locator.toast.error).should(
      'contain',
      'Request failed with status code 400',
    );
  });

  afterEach(() => {
    cy.closeToast();
  });
});

describe('Bank balance tests', () => {
  before(function () {
    // Log in application
    cy.fixture('loginData')
      .as('login')
      .then(() => {
        cy.loginApp(this.login.email, this.login.passwd);
      });
  });

  it('Should validate account balance', () => {
    // Set up data
    const incomeData = {
      description: 'Salário mensal',
      value: '900',
      receiver: 'Eu mesmo',
      account: 'Conta para movimentacoes',
    };

    // Actions
    cy.visitPageMovimentacao();
    cy.insertTransactionIncome(incomeData);
    cy.visitPageHome().reload();

    // Validations
    cy.xpath(locator.home.fn_xp_saldo_conta(incomeData.account))
      .should('contain', '-R$')
      .and('contain', '600');
  });
});

describe('Bank transition tests', () => {
  before(function () {
    // Log in application
    cy.fixture('loginData')
      .as('login')
      .then(() => {
        cy.loginApp(this.login.email, this.login.passwd);
      });
  });

  beforeEach(() => {
    // Access page Movimentacao
    cy.visitPageMovimentacao();
  });

  it('Should insert new income', () => {
    // Set up data
    const incomeData = {
      description: 'Salário mensal',
      value: '950',
      receiver: 'Eu mesmo',
      account: 'Conta para movimentacoes',
    };

    // Actions - Insert new income
    cy.insertTransactionIncome(incomeData);

    // Validations
    cy.get(locator.toast.success).should(
      'contain',
      'Movimentação inserida com sucesso',
    );
    cy.get(locator.extrato.item).should('have.length', 7);
    cy.xpath(
      locator.extrato.fn_xp_movimentacao_item(
        incomeData.description,
        incomeData.value,
      ),
    ).should('exist');
  });

  it('Should insert new expense', () => {
    // Set up data
    const expenseData = {
      description: 'Compras no shopping',
      value: '150',
      receiver: 'Shopping Iguatemi',
      account: 'Conta para movimentacoes',
    };
    // eslint-disable-next-line max-len
    const expectedExpense = `//span[contains(.,'${expenseData.description}')]/following-sibling::small[contains(.,'${expenseData.value}')]`;

    // Actions - Insert new expense
    cy.insertTransactionExpense(expenseData);

    // Validations
    cy.get(locator.toast.success).should(
      'contain',
      'Movimentação inserida com sucesso!',
    );
    cy.get(locator.extrato.item).should('have.length', 7);
    cy.xpath(expectedExpense).should('exist');
  });

  it('Should update an existing transaction', () => {
    // Set up data - Add transaction to be deleted
    const incomeData = {
      description: 'Movimentacao Aguardando edicao',
      value: '111',
      receiver: 'Alguem',
      account: 'Conta para movimentacoes',
    };
    cy.insertTransactionIncome(incomeData);
    cy.closeToast();

    // Actions - Edit transaction previously created
    cy.visitPageExtrato();
    cy.xpath(
      locator.extrato.fn_xp_movimentacao_edit(incomeData.description),
    ).click();
    cy.get(locator.movimentacao.field_descricao).should($el => {
      expect($el.val()).to.be.equal(incomeData.description);
    });
    cy.get(locator.movimentacao.field_descricao)
      .clear()
      .type('Movimentacao Descricao Editada');
    cy.get(locator.movimentacao.field_valor).clear().type('222');
    cy.get(locator.movimentacao.field_interessado)
      .clear()
      .type('Interessado Editado');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get(locator.movimentacao.btn_salvar).click();

    // Validations
    cy.get(locator.toast.success).should(
      'contain',
      'Movimentação alterada com sucesso!',
    );
  });

  it('Should remove an existing transaction', () => {
    // Set up data - Add transaction to be deleted
    const incomeData = {
      description: 'Deletar movimentacao',
      value: '777',
      receiver: 'Ninguem',
      account: 'Conta para movimentacoes',
    };
    cy.insertTransactionIncome(incomeData);
    cy.closeToast();

    // Actions - Delete transaction previously created
    cy.visitPageExtrato();
    cy.deleteTransaction(incomeData.description);

    // Validations
    cy.get(locator.toast.success).should(
      'contain',
      'Movimentação removida com sucesso!',
    );
  });

  afterEach(() => {
    cy.closeToast();
  });
});
