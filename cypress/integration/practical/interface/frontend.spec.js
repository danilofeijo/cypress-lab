/// <reference types="cypress" />

import '../../../support/commandsContas';
import '../../../support/commandsBalance';
import '../../../support/commandsMovimentacao';
import locator from '../../../support/locators';

const { commerce } = require('faker');

const userCredentials = {
  email: 'danilo.silvafs@gmail.com',
  passwd: 'Test;123',
};

describe('Account tests', () => {
  before(function () {
    // Set fake login data
    cy.server();
    cy.route({
      method: 'POST',
      url: '/signin',
      response: {
        id: 100,
        nome: 'Fake Feijó',
        token: 'fake-token-added-by-route',
      },
    }).as('POST-signin');

    // Log in application
    cy.loginApp(userCredentials.email, userCredentials.passwd);

    // Set fake balance data
    cy.route({
      method: 'GET',
      url: '/saldo',
      status: 200,
      response: [
        {
          conta_id: 1001,
          conta: 'fake Digital Wallet',
          saldo: '100.00',
        },
        {
          conta_id: 1002,
          conta: 'fake Default Account',
          saldo: '2000.00',
        },
      ],
    }).as('GET-saldo');
  });

  beforeEach(() => {
    // Set fake account data
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
      ],
    }).as('GET-contas');

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

    // Set fake account data after POST call
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

  // it('Should edit a created account', () => {
  //   // Updating account name
  //   cy.xpath(locator.contas.xp_btn_edit_conta_extrato).click();
  //   cy.get(locator.contas.field_account_name)
  //     .clear()
  //     .type('Account name updated');
  //   cy.get(locator.contas.btn_save).click();
  //   cy.get(locator.toast.success).should(
  //     'contain',
  //     'Conta atualizada com sucesso!',
  //   );
  // });

  // it('Should not Insert duplicated account', () => {
  //   const accountName = commerce.color();

  //   // Insert first account
  //   cy.insertAccount(accountName);
  //   cy.get(locator.toast.success).should(
  //     'contain',
  //     'Conta inserida com sucesso!',
  //   );
  //   cy.closeToast();

  //   // Try to insert the same account again
  //   cy.insertAccount(accountName);
  //   cy.get(locator.toast.error).should(
  //     'contain',
  //     'Request failed with status code 400',
  //   );
  // });

  afterEach(() => {
    // cy.closeToast();
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

// describe('Bank transition tests', () => {
//   before(function () {
//     // Log in application
//     cy.fixture('loginData')
//       .as('login')
//       .then(() => {
//         cy.loginApp(this.login.email, this.login.passwd);
//       });
//   });

//   beforeEach(() => {
//     // Access page Movimentacao
//     cy.visitPageMovimentacao();
//   });

//   it('Should insert new income', () => {
//     const incomeData = {
//       description: 'Salário mensal',
//       value: '950',
//       receiver: 'Eu mesmo',
//       account: 'Conta para movimentacoes',
//     };

//     // Insert new income
//     cy.insertTransactionIncome(incomeData);

//     // Validation
//     cy.get(locator.toast.success).should(
//       'contain',
//       'Movimentação inserida com sucesso',
//     );
//     cy.get(locator.extrato.item).should('have.length', 7);
//     cy.xpath(
//       locator.extrato.fn_xp_movimentacao_item(
//         incomeData.description,
//         incomeData.value,
//       ),
//     ).should('exist');
//   });

//   it('Should insert new expense', () => {
//     const expenseData = {
//       description: 'Compras no shopping',
//       value: '150',
//       receiver: 'Shopping Iguatemi',
//       account: 'Conta para movimentacoes',
//     };
// eslint-disable-next-line max-len
//     const expectedExpense = `//span[contains(.,'${expenseData.description}')]/following-sibling::small[contains(.,'${expenseData.value}')]`;

//     // Insert new expense
//     cy.insertTransactionExpense(expenseData);

//     // Validation
//     cy.get(locator.toast.success).should(
//       'contain',
//       'Movimentação inserida com sucesso!',
//     );
//     cy.get(locator.extrato.item).should('have.length', 7);
//     cy.xpath(expectedExpense).should('exist');
//   });

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

//   afterEach(() => {
//     cy.closeToast();
//   });
// });
