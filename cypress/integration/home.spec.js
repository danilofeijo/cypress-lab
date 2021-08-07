/// <reference types="cypress" />

import { GlobalUI } from '../page/global';
import { LoginUI } from '../page/login';

const profileElements = require('../page/profile/elements').ELEMENTS;

let username;

describe('On logged home pages', () => {
  beforeEach(() => {
    const email = Cypress.env('userName');
    const pass = Cypress.env('userPass');
    username = 'johndoecypresslab';

    LoginUI.visitLogin();
    LoginUI.submitLogin(email, pass);
  });

  it('Should visit my profile content', () => {
    GlobalUI.accessProfilePage(username);

    cy.get(profileElements.imageUser).should('exist');
    cy.get(profileElements.titleUsername).should('have.text', username);
  });
});
