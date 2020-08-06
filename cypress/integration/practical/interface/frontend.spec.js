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

  it('Should insert new account', () => {
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

describe.only('Bank transition tests', () => {
  beforeEach(() => {
    // Access page Movimentacao
    cy.visitPageMovimentacao();
  });

  it('Should insert new income', () => {
    const today = new Date();

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
        data_transacao: today,
        data_pagamento: today,
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
      response: [
        {
          conta: incomeData.account,
          id: 121212,
          descricao: incomeData.description,
          envolvido: incomeData.receiver,
          observacao: null,
          tipo: 'REC',
          data_transacao: today,
          data_pagamento: today,
          valor: incomeData.value,
          status: true,
          conta_id: 1002,
          usuario_id: 100,
          transferencia_id: null,
          parcelamento_id: null,
        },
        {
          conta: 'Conta para movimentacoes',
          id: 206612,
          descricao: 'Movimentacao para exclusao',
          envolvido: 'AAA',
          observacao: null,
          tipo: 'DESP',
          data_transacao: '2020-08-06T03:00:00.000Z',
          data_pagamento: '2020-08-06T03:00:00.000Z',
          valor: '-1500.00',
          status: true,
          conta_id: 231029,
          usuario_id: 10089,
          transferencia_id: null,
          parcelamento_id: null,
        },
        {
          conta: 'Conta com movimentacao',
          id: 206613,
          descricao: 'Movimentacao de conta',
          envolvido: 'BBB',
          observacao: null,
          tipo: 'DESP',
          data_transacao: '2020-08-06T03:00:00.000Z',
          data_pagamento: '2020-08-06T03:00:00.000Z',
          valor: '-1500.00',
          status: true,
          conta_id: 231030,
          usuario_id: 10089,
          transferencia_id: null,
          parcelamento_id: null,
        },
        {
          conta: 'Conta para saldo',
          id: 206614,
          descricao: 'Movimentacao 1, calculo saldo',
          envolvido: 'CCC',
          observacao: null,
          tipo: 'REC',
          data_transacao: '2020-08-06T03:00:00.000Z',
          data_pagamento: '2020-08-06T03:00:00.000Z',
          valor: '3500.00',
          status: false,
          conta_id: 231031,
          usuario_id: 10089,
          transferencia_id: null,
          parcelamento_id: null,
        },
        {
          conta: 'Conta para saldo',
          id: 206615,
          descricao: 'Movimentacao 2, calculo saldo',
          envolvido: 'DDD',
          observacao: null,
          tipo: 'DESP',
          data_transacao: '2020-08-06T03:00:00.000Z',
          data_pagamento: '2020-08-06T03:00:00.000Z',
          valor: '-1000.00',
          status: true,
          conta_id: 231031,
          usuario_id: 10089,
          transferencia_id: null,
          parcelamento_id: null,
        },
        {
          conta: 'Conta para saldo',
          id: 206616,
          descricao: 'Movimentacao 3, calculo saldo',
          envolvido: 'EEE',
          observacao: null,
          tipo: 'REC',
          data_transacao: '2020-08-06T03:00:00.000Z',
          data_pagamento: '2020-08-06T03:00:00.000Z',
          valor: '1534.00',
          status: true,
          conta_id: 231031,
          usuario_id: 10089,
          transferencia_id: null,
          parcelamento_id: null,
        },
        {
          conta: 'Conta para extrato',
          id: 206617,
          descricao: 'Movimentacao para extrato',
          envolvido: 'FFF',
          observacao: null,
          tipo: 'DESP',
          data_transacao: '2020-08-06T03:00:00.000Z',
          data_pagamento: '2020-08-06T03:00:00.000Z',
          valor: '-220.00',
          status: true,
          conta_id: 231032,
          usuario_id: 10089,
          transferencia_id: null,
          parcelamento_id: null,
        },
      ],
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

  // TODO Tests

  //   it('Should update an existing transaction', () => {
  //     // Add transaction to be deleted
  //     const incomeData = {
  //       description: 'Movimentacao Aguardando edicao',
  //       value: '111',
  //       receiver: 'Alguem',
  //       account: 'Conta para movimentacoes',
  //     };
  //     cy.insertTransactionIncome(incomeData);
  //     cy.closeToast();

  //     // Edit transaction previously created
  //     cy.visitPageExtrato();
  //     cy.xpath(
  //       locator.extrato.fn_xp_movimentacao_edit(incomeData.description),
  //     ).click();
  //     cy.get(locator.movimentacao.field_descricao).should($el => {
  //       expect($el.val()).to.be.equal(incomeData.description);
  //     });
  //     cy.get(locator.movimentacao.field_descricao)
  //       .clear()
  //       .type('Movimentacao Descricao Editada');
  //     cy.get(locator.movimentacao.field_valor).clear().type('222');
  //     cy.get(locator.movimentacao.field_interessado)
  //       .clear()
  //       .type('Interessado Editado');
  //     // eslint-disable-next-line cypress/no-unnecessary-waiting
  //     cy.wait(1000);
  //     cy.get(locator.movimentacao.btn_salvar).click();

  //     // Validation
  //     cy.get(locator.toast.success).should(
  //       'contain',
  //       'Movimentação alterada com sucesso!',
  //     );
  //   });

  //   it('Should remove an existing transaction', () => {
  //     // Add transaction to be deleted
  //     const incomeData = {
  //       description: 'Deletar movimentacao',
  //       value: '777',
  //       receiver: 'Ninguem',
  //       account: 'Conta para movimentacoes',
  //     };
  //     cy.insertTransactionIncome(incomeData);
  //     cy.closeToast();

  //     // Delete transaction previously created
  //     cy.visitPageExtrato();
  //     cy.deleteTransaction(incomeData.description);

  //     // Validation
  //     cy.get(locator.toast.success).should(
  //       'contain',
  //       'Movimentação removida com sucesso!',
  //     );
  //   });

  afterEach(() => {
    cy.closeToast();
  });

  after(() => {
    cy.clearLocalStorage();
  });
});

// describe('Bank balance tests', () => {
//   before(function () {
//     // Log in application
//     cy.fixture('loginData')
//       .as('login')
//       .then(() => {
//         cy.loginApp(this.login.email, this.login.passwd);
//       });
//   });

//   it('Should validate account balance', () => {
//     const incomeData = {
//       description: 'Salário mensal',
//       value: '900',
//       receiver: 'Eu mesmo',
//       account: 'Conta para movimentacoes',
//     };
//     cy.visitPageMovimentacao();
//     cy.insertTransactionIncome(incomeData);

//     cy.visitPageHome().reload();
//     cy.xpath(locator.home.fn_xp_saldo_conta(incomeData.account))
//       .should('contain', '-R$')
//       .and('contain', '600');
//   });
// });
