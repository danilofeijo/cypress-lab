/// <reference types="cypress" />

const Utils = require('../utils');

const ActionSignup = require('../page/signup');
const ActionLogin = require('../page/login');

const elementsGlobal = require('../page/global/elements').ELEMENTS;
const elementsLogin = require('../page/login/elements').ELEMENTS;

let USER;

describe('On login page', () => {
  beforeEach(() => {
    const randomName = Utils.setRandomName();
    const randomEmail = Utils.setRandomEmail(randomName);

    USER = {
      nome: randomName,
      email: randomEmail,
      password: `Test;123`,
      administrador: 'true',
    };

    ActionSignup.API.createUser(USER);
    ActionLogin.UI.visitLogin();
  });

  it('Should login with valid credentials', () => {
    // Arrange
    const LOGIN = {
      EMAIL: USER.email,
      PASS: USER.password,
    };

    // Act
    cy.get(elementsLogin.inputEmail).type(LOGIN.EMAIL);
    cy.get(elementsLogin.inputPass).type(LOGIN.PASS);
    cy.get(elementsLogin.buttonEnter).click();

    // Assert
    cy.get(elementsGlobal.buttonLogout).should('exist');
  });
});
