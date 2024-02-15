/// <reference types="cypress" />

const Utils = require('../utils');

const ActionSignup = require('../page/signup');
const ActionLogin = require('../page/login');

const pageGlobal = require('../page/global/elements').ELEMENTS_GLOBAL;
const pageLogin = require('../page/login/elements').ELEMENTS_LOGIN;

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

  it('Should log in with valid credentials', () => {
    // Arrange
    const LOGIN = {
      EMAIL: USER.email,
      PASS: USER.password,
    };

    // Act
    cy.get(pageLogin.inputEmail).type(LOGIN.EMAIL);
    cy.get(pageLogin.inputPass).type(LOGIN.PASS);
    cy.get(pageLogin.buttonEnter).click();

    // Assert
    cy.get('h1').should('contain.text', USER.nome);
    cy.get(pageGlobal.buttonLogout).should('exist');
  });

  it('Should not log in with invalid credentials', () => {
    // Arrange
    const LOGIN = {
      EMAIL: USER.email,
      WRONG_PASS: 'wrongPass',
    };

    // Act
    cy.get(pageLogin.inputEmail).type(LOGIN.EMAIL);
    cy.get(pageLogin.inputPass).type(LOGIN.WRONG_PASS);
    cy.get(pageLogin.buttonEnter).click();

    // Assert
    cy.get(pageLogin.toastAlert).should('exist').and('contain.text', 'Email e/ou senha inválidos');
  });
});
