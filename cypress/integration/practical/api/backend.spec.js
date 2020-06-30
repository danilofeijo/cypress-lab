/// <reference types="cypress" />
const { commerce } = require('faker');

const lorem = 'lorem';
console.log(lorem);

describe('Tests at API level', () => {
  const user = 'danilo.silvafs@gmail.com';
  const passwd = 'Test;123';
  let token;

  before(() => {
    cy.getToken(user, passwd).then(tkn => {
      token = tkn;
    });
  });

  beforeEach(() => {
    cy.resetData(token);
  });

  it('Should create an account', () => {
    const accountName = commerce.color();

    cy.request({
      method: 'POST',
      headers: { Authorization: `JWT ${token}` },
      url: '/contas',
      body: {
        nome: accountName,
      },
    }).as('response');

    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(201);
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('nome', accountName);
      expect(res.body).to.have.property('visivel', true);
      expect(res.body).to.have.property('usuario_id', 10089);
    });
  });

  it('Should reset data', () => {
    cy.request({
      method: 'GET',
      headers: { Authorization: `JWT ${token}` },
      url: '/reset',
    }).as('response');

    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(200);
    });

    // Short option
    cy.resetData(token).then(res => {
      console.log('res reset: ', res);
      expect(res).to.be.equal(200);
    });
  });

  it('Should update an account', () => {
    const updatedName = 'Updated account name';

    cy.request({
      method: 'GET',
      headers: { Authorization: `JWT ${token}` },
      url: '/contas',
      qs: {
        nome: 'Conta para alterar',
      },
    }).then(res => {
      cy.request({
        method: 'PUT',
        headers: { Authorization: `JWT ${token}` },
        url: `/contas/${res.body[0].id}`,
        body: {
          nome: updatedName,
        },
      }).as('response');
    });

    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(200);
      expect(res.body.nome).to.be.equal(updatedName);
    });
    cy.get('@response').should(res => {
      expect(res.status).to.be.equal(200);
      expect(res.body.nome).to.be.equal(updatedName);
    });
    cy.get('@response').its('status').should('be.equal', 200);
  });

  it('Should not create a duplicated account', () => {
    const accountName = commerce.color();

    // Data mass criation
    cy.request({
      method: 'POST',
      headers: { Authorization: `JWT ${token}` },
      url: '/contas',
      body: {
        nome: accountName,
      },
      failOnStatusCode: false,
    });

    cy.request({
      method: 'POST',
      headers: { Authorization: `JWT ${token}` },
      url: '/contas',
      body: {
        nome: accountName,
        // nome: 'Conta mesmo nome'
      },
      failOnStatusCode: false,
    }).as('response');

    cy.get('@response').then(res => {
      // console.log('res account: ', res);
      expect(res.status).to.be.equal(400);
      expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!');
    });
  });

  // TODO - Tests to be developed
  // it('Should insert new transaction', () => { });
  // it('Should get balance', () => {});
  // it('Should remove a transaction', () => { });
});
