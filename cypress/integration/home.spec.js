/// <reference types="cypress" />

import { ProfileAPI } from '../page/profile';
const profileElements = require('../page/profile/elements').ELEMENTS;

let username;

describe('On logged home page', () => {
  beforeEach(() => {
    const email = Cypress.env('userName');
    const pass = Cypress.env('userPass');
    username = 'johndoecypresslab';

    cy.loginAPI(email, pass);
  });

  it('Should visit my profile content', () => {
    ProfileAPI.visitProfile(username);

    cy.get(profileElements.imageUser).should('exist');
    cy.get(profileElements.titleUsername).should('have.text', username);
  });
});
