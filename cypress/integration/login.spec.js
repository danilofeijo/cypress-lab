/// <reference types="cypress" />

import { LoginUI } from '../page/login';
const globalElements = require('../page/global/elements').ELEMENTS;

describe('On login page', () => {
  beforeEach(() => {
    LoginUI.visitLogin();
  });

  it('Should login with valid credentials', () => {
    const email = Cypress.env('userName');
    const pass = Cypress.env('userPass');

    LoginUI.submitLogin(email, pass);

    cy.get(globalElements.headerBar)
      .should('contain', 'a', 'conduit')
      .and('contain', 'a', 'Home')
      .and('contain', 'a', 'New Article')
      .and('contain', 'a', 'Settings')
      .and('contain', 'a', 'johndoecypresslab');
  });
});
