/// <reference types="cypress" />

import { SignupUI } from '../page/signup';
const globalElements = require('../page/global/elements').ELEMENTS;

let randomNum = Date.now().toString().slice(5, 10);

describe('On Sign up page', () => {
  beforeEach(() => {
    cy.visit('/cadastrarusuarios');

    randomNum = Date.now().toString().slice(5, 10);
  });

  it('Should create a new admin user', () => {
    // Arrange
    const USER = {
      NAME: `John Doe ${randomNum}`,
      EMAIL: `johndoe${randomNum}@test.com`,
      PASS: `Test;123`,
    };

    // Act
    SignupUI.submitAdminUserData(USER);

    // Assert
    cy.get(globalElements.buttonLogout).should('exist');
  });
});
