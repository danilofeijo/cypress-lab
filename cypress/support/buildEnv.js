const accountName01 = 'fake Digital Wallet';
const accountName02 = 'fake Default Account';

const buildEnv = () => {
  cy.server();

  // Set fake login data
  cy.route({
    method: 'POST',
    url: '/signin',
    response: {
      id: 100,
      nome: 'Fake Feijó',
      token: 'fake-token-added-by-route',
    },
  }).as('POST-signin-200');

  // Set fake balance data
  cy.route({
    method: 'GET',
    url: '/saldo',
    status: 200,
    response: [
      {
        conta_id: 1001,
        conta: accountName01,
        saldo: '100.00',
      },
      {
        conta_id: 1002,
        conta: accountName02,
        saldo: '2000.00',
      },
    ],
  }).as('GET-saldo-200');

  // Set fake account data
  cy.route({
    method: 'GET',
    url: '/contas',
    response: [
      {
        id: 1001,
        nome: accountName01,
        visivel: true,
        usuario_id: 100,
      },
      {
        id: 1002,
        nome: accountName02,
        visivel: true,
        usuario_id: 100,
      },
    ],
  }).as('GET-contas-200');
};

export default buildEnv;
