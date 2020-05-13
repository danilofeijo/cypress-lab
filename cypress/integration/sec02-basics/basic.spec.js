/// <reference types="cypress" />

describe('Cypress basics', () => {
  it.only('Deve visitar a página e verificar o titulo', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
    cy.pause();

    cy.title().should('be.equal', 'Campo de Treinamento')
    cy.title().should('contain', 'mento').debug()

    cy.title()
      .should('be.equal', 'Campo de Treinamento')
      .and('contain', 'mpo de Tre')

    // TODO - Imprimir o Log no Console
    // TODO - Escrever o title em um campo de texto
  });

  it('Deve encontrar e interagir com um elemento', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');

    cy.get('#buttonSimple')
      .click()
      .should('have.value', 'Obrigado!');
  });
});
