/// <reference types="cypress" />

const LoginAction = require('../page/login');
const SignupAction = require('../page/signup');
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

    SignupAction.API.createUser(USER);
    LoginAction.UI.visitLogin();
  });

  it('Should login with valid credentials', () => {
    // Arrange
    const LOGIN = {
      EMAIL: USER.email,
      PASS: USER.password,
    };

    // Act
    LoginAction.UI.submitLogin(LOGIN.EMAIL, LOGIN.PASS);

    // Assert
    cy.get(globalElements.buttonLogout).should('exist');
  });
});
