/// <reference types="cypress" />

import '../../../support/commandsContas';
import '../../../support/commandsBalance';
import '../../../support/commandsMovimentacao';

const { commerce } = require('faker');
import locator from '../../../support/locators';

beforeEach(function () {
  // Log in application
  cy.fixture('loginData')
    .as('login')
    .then(() => {
      cy.loginApp(this.login.email, this.login.passwd);
    });

  cy.resetApp();
});

describe('Account tests', () => {
  beforeEach(() => {
    // Access page Contas
    cy.visitPageContas();
  });

  it('Should insert new account', () => {
    const accountName = commerce.color();

    // Insert new account
    cy.insertAccount(accountName);
    cy.get(locator.toast.success).should(
      'contain',
      'Conta inserida com sucesso!',
    );
  });

  it('Should edit a created account', () => {
    // Updating account name
    cy.xpath(locator.contas.xp_btn_edit_conta_extrato).click();
    cy.get(locator.contas.field_account_name)
      .clear()
      .type('Account name updated');
    cy.get(locator.contas.btn_save).click();
    cy.get(locator.toast.success).should(
      'contain',
      'Conta atualizada com sucesso!',
    );
  });

  it('Should not Insert duplicated account', () => {
    const accountName = commerce.color();

    // Insert first account
    cy.insertAccount(accountName);
    cy.get(locator.toast.success).should(
      'contain',
      'Conta inserida com sucesso!',
    );
    cy.closeToast();

    // Try to insert the same account again
    cy.insertAccount(accountName);
    cy.get(locator.toast.error).should(
      'contain',
      'Request failed with status code 400',
    );
  });
});

describe('Bank balance tests', () => {
  it('Should validate account balance', () => {
    const incomeData = {
      description: 'Salário mensal',
      value: '900',
      receiver: 'Eu mesmo',
      account: 'Conta para movimentacoes',
    };
    cy.visitPageMovimentacao();
    cy.insertTransactionIncome(incomeData);

    cy.visitPageHome().reload();
    cy.xpath(locator.home.fn_xp_saldo_conta(incomeData.account))
      .should('contain', '-R$')
      .and('contain', '600');
  });
});

describe('Bank transition tests', () => {
  beforeEach(() => {
    // Access page Movimentacao
    cy.visitPageMovimentacao();
  });

  it('Should insert new income', () => {
    const incomeData = {
      description: 'Salário mensal',
      value: '950',
      receiver: 'Eu mesmo',
      account: 'Conta para movimentacoes',
    };

    // Insert new income
    cy.insertTransactionIncome(incomeData);

    // Validation
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
    const expenseData = {
      description: 'Compras no shopping',
      value: '150',
      receiver: 'Shopping Iguatemi',
      account: 'Conta para movimentacoes',
    };
    // eslint-disable-next-line max-len
    const expectedExpense = `//span[contains(.,'${expenseData.description}')]/following-sibling::small[contains(.,'${expenseData.value}')]`;

    // Insert new expense
    cy.insertTransactionExpense(expenseData);

    // Validation
    cy.get(locator.toast.success).should(
      'contain',
      'Movimentação inserida com sucesso!',
    );
    cy.get(locator.extrato.item).should('have.length', 7);
    cy.xpath(expectedExpense).should('exist');
  });

  it('Should update an existing transaction', () => {
    // Add transaction to be deleted
    const incomeData = {
      description: 'Movimentacao Aguardando edicao',
      value: '111',
      receiver: 'Alguem',
      account: 'Conta para movimentacoes',
    };
    cy.insertTransactionIncome(incomeData);
    cy.closeToast();

    // Edit transaction previously created
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

    // Validation
    cy.get(locator.toast.success).should(
      'contain',
      'Movimentação alterada com sucesso!',
    );
  });

  it('Should remove an existing transaction', () => {
    // Add transaction to be deleted
    const incomeData = {
      description: 'Deletar movimentacao',
      value: '777',
      receiver: 'Ninguem',
      account: 'Conta para movimentacoes',
    };
    cy.insertTransactionIncome(incomeData);
    cy.closeToast();

    // Delete transaction previously created
    cy.visitPageExtrato();
    cy.deleteTransaction(incomeData.description);

    // Validation
    cy.get(locator.toast.success).should(
      'contain',
      'Movimentação removida com sucesso!',
    );
  });

  afterEach(() => {
    cy.closeToast();
  });
});
