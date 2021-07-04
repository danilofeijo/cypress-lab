/// <reference types="cypress" />

describe('Home page', () => {
  it('Should load home page', () => {
    cy.visit('/login');
    cy.get('input[placeholder="Email"]').type('johndoe@cypresslab.com');
    cy.get('input[placeholder="Password"]').type('Test;123');
    cy.get('button').contains('Sign in').click();

    cy.get('nav.navbar')
      .should('contain', 'a', 'conduit')
      .and('contain', 'a', 'Home')
      .and('contain', 'a', 'New Article')
      .and('contain', 'a', 'Settings')
      .and('contain', 'a', 'johndoecypresslab');
  });
});
