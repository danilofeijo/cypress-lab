/// <reference types="cypress" />
import locator from '../../../support/locators';
import '../../../support/commandsBalance';
import '../../../support/commandsMovimentacao';

describe('Bank balance tests', () => {
  beforeEach(function () {
    // Log in application
    cy.fixture('loginData')
      .as('login')
      .then(() => {
        cy.loginApp(this.login.email, this.login.passwd);
      });

    // Reset application data
    cy.resetApp();
  });

  it('Should validate account balance', () => {
    const incomeData = {
      description: 'Salário mensal',
      value: '900',
      receiver: 'Eu mesmo',
      account: 'Conta para movimentacoes',
    };
    cy.visitPageMovimentacao();
    cy.insertMovementIncome(incomeData);

    cy.visitPageHome().reload();
    cy.xpath(locator.home.fn_xp_saldo_conta(incomeData.account))
      .should('contain', '-R$')
      .and('contain', '600');
  });
});
