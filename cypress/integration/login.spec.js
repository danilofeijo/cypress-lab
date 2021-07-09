/// <reference types="cypress" />

import { LoginUI } from '../page/login';

describe('Home page', () => {
  it('Should load home page', () => {
    const user = 'johndoe@cypresslab.com';
    const pass = 'Test;123';

    LoginUI.visitLogin();
    LoginUI.submitLogin(user, pass);

    cy.get('nav.navbar')
      .should('contain', 'a', 'conduit')
      .and('contain', 'a', 'Home')
      .and('contain', 'a', 'New Article')
      .and('contain', 'a', 'Settings')
      .and('contain', 'a', 'johndoecypresslab');
  });
});
