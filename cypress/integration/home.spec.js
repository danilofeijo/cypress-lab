/// <reference types="cypress" />

import { ProfileAPI } from '../page/profile';
const profileElements = require('../page/profile/elements').ELEMENTS;

let username;

// TODO apply some pattern for describes AND tests naming
describe('When visit home page', () => {
  beforeEach(() => {
    const email = 'johndoe@cypresslab.com';
    const pass = 'Test;123';
    username = 'johndoecypresslab';

    cy.loginAPI(email, pass);
  });

  it('Should visit my profile content', () => {
    ProfileAPI.visitProfile(username);

    cy.get(profileElements.imageUser).should('exist');
    cy.get(profileElements.titleUsername).should('have.text', username);
  });
});
