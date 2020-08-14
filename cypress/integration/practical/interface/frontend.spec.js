/// <reference types="cypress" />

import '../../../support/commandsContas';
import '../../../support/commandsBalance';
import '../../../support/commandsMovimentacao';
import locator from '../../../support/locators';
import buildEnv from '../../../support/buildEnv';

const { commerce } = require('faker');

beforeEach(() => {
  // Set routes
  buildEnv();

  // Log in application
  cy.loginApp();
});

describe('Account tests', () => {
  beforeEach(() => {
    // Access accounts page
    cy.visitPageContas();
  });

  it('Should validate data to create new account', () => {
    const accountName = commerce.color();

    // Validate data sent on request - Option 3.1
    // const reqStub = cy.stub();

    // Set fake account data
    cy.route({
      method: 'POST',
      url: '/contas',
      response: [
        {
          id: 1003,
          nome: accountName,
          visivel: true,
          usuario_id: 100,
        },
      ],
      // Validate data sent on request - Option 2
      // onRequest: req => {
      //   console.log(req);
      //   expect(req.request.body.nome).to.be.not.empty;
      //   expect(req.request.headers).to.have.property('Authorization');
      // },

      // Validate data sent on request - Option 3.2
      // onRequest: reqStub,
    }).as('POST-contas');

    cy.insertAccount(accountName);
    // cy.insertAccount('{CONTROL}'); // Send empty data

    // Validate data sent on request - Option 1
    // cy.wait('@POST-contas').its('request.body.nome').should('not.be.empty');

    // Validate data sent on request - Option 3.3
    // cy.wait('@POST-contas').then(() => {
    //   console.log(reqStub.args[0][0]);
    //   expect(reqStub.args[0][0].request.body.nome).to.be.not.empty;
    //   expect(reqStub.args[0][0].request.headers).to.have.property('Authorization');
    // });

    // Validation
    cy.get(locator.toast.success).should(
      'contain',
      'Conta inserida com sucesso!',
    );
  });

  it('Should create new account', () => {
    const accountName = commerce.color();

    // Set fake account data
    cy.route({
      method: 'POST',
      url: '/contas',
      response: [
        {
          id: 1003,
          nome: accountName,
          visivel: true,
          usuario_id: 100,
        },
      ],
    }).as('POST-contas');

    // Optional - Set fake account data after POST call
    cy.route({
      method: 'GET',
      url: '/contas',
      response: [
        {
          id: 1001,
          nome: 'fake Digital Wallet',
          visivel: true,
          usuario_id: 100,
        },
        {
          id: 1002,
          nome: 'fake Default Account',
          visivel: true,
          usuario_id: 100,
        },
        {
          id: 1003,
          nome: accountName,
          visivel: true,
          usuario_id: 100,
        },
      ],
    }).as('GET-contas-salvas');

    cy.insertAccount(accountName);

    // Validation
    cy.get(locator.toast.success).should(
      'contain',
      'Conta inserida com sucesso!',
    );
  });

  it('Should edit a created account', () => {
    const updatedAccountName = 'Fake Account ' + commerce.color() + ' updated';

    // Set fake account data updated
    cy.route({
      method: 'PUT',
      url: '/contas/**',
      response: [
        {
          id: 1001,
          nome: updatedAccountName,
          visivel: true,
          usuario_id: 100,
        },
      ],
    }).as('POST-contas');

    // Updating account name
    cy.xpath(locator.contas.xp_btn_edit_conta_fake_digital_wallet).click();
    cy.get(locator.contas.field_account_name).clear().type(updatedAccountName);
    cy.get(locator.contas.btn_save).click();
    cy.get(locator.toast.success).should(
      'contain',
      'Conta atualizada com sucesso!',
    );
  });

  it('Should not Insert duplicated account', () => {
    // Set fake account data
    cy.route({
      method: 'POST',
      url: '/contas',
      status: 400,
      response: [{ error: 'Já existe uma conta com esse nome!' }],
    }).as('POST-contas-400');

    // Try to insert account with the same name
    cy.insertAccount('fake Digital Wallet');
    cy.get(locator.toast.error).should(
      'contain',
      'Request failed with status code 400',
    );
  });

  afterEach(() => {
    cy.closeToast();
  });

  after(() => {
    cy.clearLocalStorage();
  });
});

describe('Bank transaction tests', () => {
  beforeEach(() => {
    // Access page Movimentacao
    cy.visitPageMovimentacao();
  });

  it('Should insert new income', () => {
    const incomeData = {
      description: 'Salário mensal',
      value: '950',
      receiver: 'Eu mesmo',
      account: 'fake Default Account',
    };

    cy.route({
      method: 'POST',
      url: '/transacoes',
      response: {
        id: 121212,
        descricao: incomeData.description,
        envolvido: incomeData.receiver,
        observacao: null,
        tipo: 'REC',
        data_transacao: '2020-08-06T03:00:00.000Z',
        data_pagamento: '2020-08-06T03:00:00.000Z',
        valor: incomeData.value,
        status: true,
        conta_id: 1002,
        usuario_id: 100,
        transferencia_id: null,
        parcelamento_id: null,
      },
    }).as('POST-transacoes-200');

    // Set fake bank statement
    cy.route({
      method: 'GET',
      url: '/extrato/**',
      response: 'fixture:savedTransaction',
    }).as('GET-statement-200-it');

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

  it('Should remove an existing transaction', () => {
    cy.route({
      method: 'DELETE',
      url: '/transacoes/**',
      response: {},
      status: 204,
    }).as('DELETE-statement-204');

    // Delete transaction previously created
    cy.visitPageExtrato();
    cy.deleteTransaction('Movimentacao para exclusao');

    // Validation
    cy.get(locator.toast.success).should(
      'contain',
      'Movimentação removida com sucesso!',
    );
  });

  afterEach(() => {
    cy.closeToast();
  });

  after(() => {
    cy.clearLocalStorage();
  });
});

describe('Bank balance tests', () => {
  it('Should validate data to create account balance', () => {
    const incomeData = {
      description: 'Salário mensal',
      value: '950',
      receiver: 'Eu mesmo',
      account: 'fake Default Account',
    };

    cy.visitPageMovimentacao();
    cy.insertTransactionIncome(incomeData);

    cy.visitPageHome().reload();
    cy.xpath(locator.home.fn_xp_saldo_conta(incomeData.account))
      .should('contain', 'R$')
      .and('contain', '2.000,00');
  });
});
