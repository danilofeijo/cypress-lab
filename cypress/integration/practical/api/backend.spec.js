/// <reference types="cypress" />
const { commerce } = require('faker')

describe('Tests at API level', () => {
  before(() => {
    // Nothing for now
  })

  beforeEach(() => {
    // Nothing for now
  })

  const baseUrl = 'https://barrigarest.wcaquino.me'

  it('Should create an account', () => {
    const accountName = commerce.color()

    cy.request({
      method: 'POST',
      url: `${baseUrl}/signin`,
      body: {
        email: "danilo.silvafs@gmail.com",
        senha: "Test;123",
        redirecionar: false
      }
    }).its('body.token').should('not.be.empty')
      .then(token => {
        cy.request({
          method: 'POST',
          headers: { Authorization: `JWT ${token}`},
          url: `${baseUrl}/contas`,
          body: {
            nome: accountName
          }
        }).as('response')
      })

    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(201)
      expect(res.body).to.have.property('id')
      expect(res.body).to.have.property('nome', accountName)
      expect(res.body).to.have.property('visivel', true)
      expect(res.body).to.have.property('usuario_id', 10089)
    })
  });

  // TODO - Tests to be developed
  // it('Should update an account', () => {});
  // it('Should not create a duplicated account', () => {});
  // it('Should insert new transaction', () => { });
  // it('Should get balance', () => {});
  // it('Should remove a transaction', () => { });
});
