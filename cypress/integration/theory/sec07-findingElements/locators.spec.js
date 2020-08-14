/// <reference types="cypress" />

describe('Elementos basicos', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
  });

  beforeEach(() => {
    cy.reload();
  });

  it('Using jQuery selector', () => {
    cy.get(':nth-child(2) > :nth-child(1) > :nth-child(3) > input');
    cy.get('#tabelaUsuarios > tbody > tr:eq(0) > td:nth-child(3) > input');
    cy.get(`[value='Clique aqui']:eq(0)`);
    cy.get(`[onclick*='Francisco']`);
    cy.get("[onclick*='Francisco']");

    cy.get(`#tabelaUsuarios td:contains('Doutorado'):eq(0) ~ td:eq(3) > input`);
    cy.get(`#tabelaUsuarios tr:contains('Doutorado'):eq(0) td:eq(6) input`);
  });

  it('Using xpath', () => {
    cy.xpath(`//input[contains(@onclick,'Francisco')]`);
    cy.xpath(
      `//table[@id='tabelaUsuarios']//td[contains(., 'Francisco')]/..//input[@type='text']`,
    );
    cy.xpath(
      `//td[contains(.,'Usuario A')]/following-sibling::td[contains(.,'Mestrado')]/..//input[@type='text']`,
    );
  });
});
