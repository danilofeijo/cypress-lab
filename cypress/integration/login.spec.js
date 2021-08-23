/// <reference types="cypress" />

import { LoginUI } from '../page/login';
const globalElements = require('../page/global/elements').ELEMENTS;

describe('On login page', () => {
  beforeEach(() => {
    LoginUI.visitLogin();
  });

  it.skip('Should login with valid credentials', () => {
    const email = Cypress.env('userName');
    const pass = Cypress.env('userPass');

    LoginUI.submitLogin(email, pass);

    cy.get(globalElements.butonLogout).should('exist');
  });
});
