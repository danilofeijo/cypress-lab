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

  // Set fake bank statement
  cy.route({
    method: 'GET',
    url: '/extrato/**',
    response: [
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
  }).as('GET-statement-200');
};

export default buildEnv;
