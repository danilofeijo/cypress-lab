/// <reference types="cypress" />

const Utils = require('../utils');

const globalPageElements = require('../page/global/elements').ELEMENTS;
const SignupPageElements = require('../page/signup/elements').ELEMENTS;

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
    cy.get(SignupPageElements.inputName).type(USER.NAME);
    cy.get(SignupPageElements.inputEmail).type(USER.EMAIL);
    cy.get(SignupPageElements.inputPass).type(USER.PASS);
    cy.get(SignupPageElements.checkboxAdmin).click();
    cy.get(SignupPageElements.buttonSubmit).click();

    // Assert
    cy.get(globalPageElements.buttonLogout).should('exist');
  });
});
