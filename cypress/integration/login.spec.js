/// <reference types="cypress" />

const { LoginUI } = require('../page/login');
const { SignupAPI } = require('../page/signup');
const Utils = require('../utils');
const globalElements = require('../page/global/elements').ELEMENTS;

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

    SignupAPI.createUser(USER);
    LoginUI.visitLogin();
  });

  it('Should login with valid credentials', () => {
    // Arrange
    const LOGIN = {
      EMAIL: USER.email,
      PASS: USER.password,
    };

    // Act
    LoginUI.submitLogin(LOGIN.EMAIL, LOGIN.PASS);

    // Assert
    cy.get(globalElements.buttonLogout).should('exist');
  });
});
