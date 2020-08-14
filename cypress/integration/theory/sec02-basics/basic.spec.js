/// <reference types="cypress" />

describe('Cypress basics', () => {
  it('Should visit a page and verify its title', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
    // cy.pause();

    // const title = cy.title()
    // console.log(title);

    cy.title().should('be.equal', 'Campo de Treinamento');
    cy.title().should('contain', 'mento');
    // .debug()

    cy.title()
      .should('be.equal', 'Campo de Treinamento')
      .and('contain', 'mpo de Tre');

    let syncTitle;

    // Imprimir o Log no Console
    cy.title().then(title => {
      console.log(title);

      cy.get('#formNome').type(title);
      syncTitle = title;
    });

    // Escrever o title em um campo de texto
    cy.get('[data-cy=dataSobrenome]').then($el => {
      $el.val(syncTitle);
    });

    cy.get('#elementosForm\\:sugestoes').then($el => {
      cy.wrap($el).type(syncTitle);
    });
  });

  it('Should find and interact with an element', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');

    cy.get('#buttonSimple').click().should('have.value', 'Obrigado!');
  });
});
