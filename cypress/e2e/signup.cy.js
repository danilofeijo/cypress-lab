/// <reference types="cypress" />

const Utils = require('../utils');

const pageGlobal = require('../page/global/elements').ELEMENTS_GLOBAL;
const pageSignup = require('../page/signup/elements').ELEMENTS_SIGNUP;

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
    cy.get(pageSignup.inputName).type(USER.NAME);
    cy.get(pageSignup.inputEmail).type(USER.EMAIL);
    cy.get(pageSignup.inputPass).type(USER.PASS);
    cy.get(pageSignup.checkboxAdmin).click();
    cy.get(pageSignup.buttonSubmit).click();

    // Assert
    cy.get(pageGlobal.buttonLogout).should('exist');
  });
});
