/// <reference types="cypress" />

describe('Other features', () => {
  it('Get data from fixture file...', function () {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
    cy.fixture('userData')
      .as('user')
      .then(() => {
        cy.get('#formNome').type(this.user.name);
        cy.get('#formSobrenome').type(this.user.surName);
        cy.get(`[name=formSexo][value=${this.user.gender}]`).click();
        cy.get(`[name=formComidaFavorita][value=${this.user.food}]`).click();
        cy.get('#formEscolaridade').select(this.user.schooling);
        cy.get('#formEsportes').select(this.user.sports);
      });

    cy.get('#formCadastrar').click();
    cy.get('#resultado span:nth-child(1)').should('contain', 'Cadastrado!');
  });
});
