/// <reference types="cypress" />

import { SignupUI } from '../page/signup';
const globalElements = require('../page/global/elements').ELEMENTS;

describe.skip('On Sign up page', () => {
  beforeEach(() => {
    cy.visit('/cadastrarusuarios');
  });

  it('Should create a new user', () => {
    cy.get('[data-testid="nome"]').type('nome bla');
    cy.get('[data-testid="email"]').type('email bla');
    cy.get('[data-testid="senha"]').type('senha bla');
    cy.get('[data-testid="cadastrar"]').click();

    cy.get(globalElements.butonLogout).should('exist');
  });
});
