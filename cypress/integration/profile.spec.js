/// <reference types="cypress" />

import { ProfileAPI } from '../page/profile';

let username;

describe('When visit my profile page', () => {
  beforeEach(() => {
    const email = 'johndoe@cypresslab.com';
    const pass = 'Test;123';
    username = 'johndoecypresslab';

    cy.loginAPI(email, pass);
    ProfileAPI.visitProfile(username);
  });

  // TODO - Develop test
  it('Should update profile', () => {});
});
