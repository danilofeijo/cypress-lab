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
  }).as('POST-signin');

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
};

export default buildEnv;
