/// <reference types="cypress" />

describe('Tests at API level', () => {
  before(() => {
    // Nothing for now
  })

  beforeEach(() => {
    // Nothing for now
  })

  it('Should create an account', () => {
    cy.request({
      method: 'POST',
      url: 'https://barrigarest.wcaquino.me/signin',
      body: {
        email: "danilo.silvafs@gmail.com",
        senha: "Test;123",
        redirecionar: false
      }
    }).its('body.token').should('not.be.empty')
  });

  // TODO - Tests to be developed
  // it('Should update an account', () => {});
  // it('Should not create a duplicated account', () => {});
  // it('Should insert new transaction', () => { });
  // it('Should get balance', () => {});
  // it('Should remove a transaction', () => { });
});
