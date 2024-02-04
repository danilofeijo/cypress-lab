/// <reference types="cypress" />

const Utils = require('../utils');

const elementsGlobal = require('../page/global/elements').ELEMENTS;
const elementsSignup = require('../page/signup/elements').ELEMENTS;

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
    cy.get(elementsSignup.inputName).type(USER.NAME);
    cy.get(elementsSignup.inputEmail).type(USER.EMAIL);
    cy.get(elementsSignup.inputPass).type(USER.PASS);
    cy.get(elementsSignup.checkboxAdmin).click();
    cy.get(elementsSignup.buttonSubmit).click();

    // Assert
    cy.get(elementsGlobal.buttonLogout).should('exist');
  });
});
