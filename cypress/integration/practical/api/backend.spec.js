/// <reference types="cypress" />
const { commerce, company, lorem } = require('faker');

describe('Tests at API level', () => {
  const user = 'danilo.silvafs@gmail.com';
  const passwd = 'Test;123';
  // let token;

  before(() => {
    cy.getToken(user, passwd);
    // .then(tkn => { token = tkn; });
  });

  beforeEach(() => {
    cy.resetData();
  });

  it('Should create an account', () => {
    const accountName = commerce.color();

    cy.request({
      method: 'POST',
      // headers: { Authorization: `JWT ${token}` },
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
      // headers: { Authorization: `JWT ${token}` },
      url: '/reset',
    }).as('response');

    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(200);
    });

    // Short option
    cy.resetData().then(res => {
      expect(res).to.be.equal(200);
    });
  });

  it('Should update an account', () => {
    const accountName = 'Conta para alterar';
    const updatedName = 'Updated account name';

    cy.getContaByName(accountName)
      .then(contaId => {
        cy.request({
          method: 'PUT',
          // headers: { Authorization: `JWT ${token}` },
          url: `/contas/${contaId}`,
          body: {
            nome: updatedName,
          },
        });
      })
      .as('response');

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
      // headers: { Authorization: `JWT ${token}` },
      url: '/contas',
      body: {
        nome: accountName,
      },
      failOnStatusCode: false,
    });

    cy.request({
      method: 'POST',
      // headers: { Authorization: `JWT ${token}` },
      url: '/contas',
      body: {
        nome: accountName,
        // nome: 'Conta mesmo nome'
      },
      failOnStatusCode: false,
    }).as('response');

    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(400);
      expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!');
    });
  });

  it('Should insert new transaction', () => {
    const accountName = 'Conta para movimentacoes';

    cy.getContaByName(accountName).then(contaId => {
      cy.request({
        method: 'POST',
        url: '/transacoes',
        // headers: { Authorization: `JWT ${token}` },
        body: {
          conta_id: contaId,
          data_pagamento: Cypress.moment()
            .add({ days: 1 })
            .format('DD/MM/YYYY'),
          data_transacao: Cypress.moment().format('DD/MM/YYYY'),
          descricao: lorem.sentence(4),
          envolvido: company.companyName(),
          status: true,
          tipo: 'REC',
          valor: '100',
        },
      }).as('response');

      cy.get('@response').then(res => {
        expect(res.status).to.be.equal(201);
        expect(res.body.id).exist;
      });
      // cy.get('@response').its('status').should('be.equal', 201);
      // cy.get('@response').its('status').should('exist');
    });
  });

  it('Should get balance', () => {
    const accountName = 'Conta para saldo';

    cy.request({
      method: 'GET',
      url: '/saldo',
      // headers: { Authorization: `JWT ${token}` },
    }).as('firstResponse');

    cy.get('@firstResponse').then(res => {
      expect(res.status).to.equal(200);
      res.body.forEach(item => {
        if (item.conta === accountName) {
          expect(item.saldo).to.equal('534.00');
        }
      });
    });

    cy.request({
      method: 'GET',
      url: '/transacoes',
      // headers: { Authorization: `JWT ${token}` },
      qs: { descricao: 'Movimentacao 1, calculo saldo' },
    }).then(res => {
      cy.request({
        method: 'PUT',
        url: `/transacoes/${res.body[0].id}`,
        // headers: { Authorization: `JWT ${token}` },
        body: {
          status: true,
          conta_id: res.body[0].conta_id,
          data_pagamento: Cypress.moment(res.body[0].data_pagamento)
            .add({ days: 1 })
            .format('DD/MM/YYYY'),
          data_transacao: Cypress.moment(res.body[0].data_transacao).format(
            'DD/MM/YYYY',
          ),
          descricao: res.body[0].descricao,
          envolvido: res.body[0].envolvido,
          valor: res.body[0].valor,
        },
      })
        .its('status')
        .should('be.equal', 200);
    });

    cy.request({
      method: 'GET',
      url: '/saldo',
      // headers: { Authorization: `JWT ${token}` },
    }).as('secondResponse');

    cy.get('@secondResponse').then(res => {
      expect(res.status).to.equal(200);
      res.body.forEach(item => {
        if (item.conta === accountName) {
          expect(item.saldo).to.equal('4034.00');
        }
      });
    });
  });

  it('Should remove a transaction', () => {
    cy.request({
      method: 'GET',
      url: '/transacoes',
      // headers: { Authorization: `JWT ${token}` },
      qs: { descricao: 'Movimentacao para exclusao' },
    }).then(res => {
      cy.request({
        method: 'DELETE',
        url: `/transacoes/${res.body[0].id}`,
        // headers: { Authorization: `JWT ${token}` },
      })
        .its('status')
        .should('be.equal', 204);
    });
  });
});
