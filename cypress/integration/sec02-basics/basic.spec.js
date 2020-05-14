/// <reference types="cypress" />

describe('Cypress basics', () => {
  it('Deve visitar a página e verificar o titulo', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
    // cy.pause();

    // const title = cy.title()
    // console.log(title);

    cy.title().should('be.equal', 'Campo de Treinamento')
    cy.title().should('contain', 'mento')
      // .debug()

    cy.title()
      .should('be.equal', 'Campo de Treinamento')
      .and('contain', 'mpo de Tre')

    // DONE - Imprimir o Log no Console
    cy.title().then(title => {
      console.log(title);
    })

    // TODO - Escrever o title em um campo de texto
  });

  it('Deve encontrar e interagir com um elemento', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');

    cy.get('#buttonSimple')
      .click()
      .should('have.value', 'Obrigado!');
  });
});
