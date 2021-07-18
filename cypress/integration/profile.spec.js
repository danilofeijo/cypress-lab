/// <reference types="cypress" />

import { ProfileAPI } from '../page/profile';
const profileElements = require('../page/profile/elements').ELEMENTS;

let username;

describe('When visit my profile page', () => {
  beforeEach(() => {
    const email = 'johndoe@cypresslab.com';
    const pass = 'Test;123';
    username = 'johndoecypresslab';

    cy.loginAPI(email, pass);
    ProfileAPI.visitProfile(username);
  });

  it('Should load my profile content', () => {
    cy.get(profileElements.imageUser).should('exist');
    cy.get(profileElements.titleUsername).should('have.text', username);
  });
});
