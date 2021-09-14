/// <reference types="cypress" />

const { SignupUI } = require('../page/signup');
const Utils = require('../utils');
const globalElements = require('../page/global/elements').ELEMENTS;

let randomName;
let randomEmail;

describe('On Sign up page', () => {
  beforeEach(() => {
    cy.visit('/cadastrarusuarios');

    randomName = Utils.setRandomName();
    randomEmail = Utils.setRandomEmail(randomName);
  });

  it('Should create a new admin user', () => {
    // Arrange
    const USER = {
      NAME: randomName,
      EMAIL: randomEmail,
      PASS: `Test;123`,
    };

    // Act
    SignupUI.submitAdminUserData(USER);

    // Assert
    cy.get(globalElements.buttonLogout).should('exist');
  });
});
