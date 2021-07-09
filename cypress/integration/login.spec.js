/// <reference types="cypress" />

import { LoginUI } from '../page/login';
const globalElements = require('../page/global/elements').ELEMENTS;

describe('When visit login page', () => {
  beforeEach(() => {
    LoginUI.visitLogin();
  });

  it('Should loggin with valid credentials', () => {
    const email = 'johndoe@cypresslab.com';
    const pass = 'Test;123';

    LoginUI.submitLogin(email, pass);

    cy.get(globalElements.headerBar)
      .should('contain', 'a', 'conduit')
      .and('contain', 'a', 'Home')
      .and('contain', 'a', 'New Article')
      .and('contain', 'a', 'Settings')
      .and('contain', 'a', 'johndoecypresslab');
  });
});
