/// <reference types="cypress" />

import { GlobalUI } from '../page/global';
import { LoginUI } from '../page/login';
import { ProfileUI } from '../page/profile';

const faker = require('faker');
const profileElements = require('../page/profile/elements').ELEMENTS;

let username;

describe('On my profile page', () => {
  beforeEach(() => {
    const email = Cypress.env('userName');
    const pass = Cypress.env('userPass');
    username = 'johndoecypresslab';

    LoginUI.visitLogin();
    LoginUI.submitLogin(email, pass);
    cy.get('div.sidebar', { timeout: 20000 }).should('be.visible');

    GlobalUI.accessProfilePage(username);
  });

  it('Should update profile', () => {
    const profileBioText = faker.lorem.sentence();

    ProfileUI.updateProfile(profileBioText);

    cy.get(profileElements.labelProfileBio).should('have.text', profileBioText);
  });
});
