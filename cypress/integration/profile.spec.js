/// <reference types="cypress" />

import { GlobalUI } from '../page/global';
import { LoginUI } from '../page/login';

let username;

describe('On my profile page', () => {
  beforeEach(() => {
    const email = Cypress.env('userName');
    const pass = Cypress.env('userPass');
    username = 'johndoecypresslab';

    LoginUI.visitLogin();
    LoginUI.submitLogin(email, pass);
    cy.get('div.sidebar').should('be.visible');

    GlobalUI.accessProfilePage(username);
  });

  // TODO - Develop test
  it('Should update profile', () => {});
});
