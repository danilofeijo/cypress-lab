/// <reference types="cypress" />

const Utils = require('../utils');

const ActionSignup = require('../page/actions/signup');
const ActionLogin = require('../page/actions/login');

const pageGlobal = require('../page/elements/global').ELEMENTS_GLOBAL;
const pageLogin = require('../page/elements/login').ELEMENTS_LOGIN;
const pageHome = require('../page/elements/home').ELEMENTS_HOME;

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

  it.skip('Should log in with Common user credentials', () => {
    // TODO - Develop test
    // Arrange
    // Act
    // Assert
  });

  it('Should log in with Admin user credentials', () => {
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
    cy.get(pageHome.headerWelcome).should('contain.text', USER.nome);
    cy.get(pageGlobal.buttonLogout).should('exist');
  });

  it('Should not log in with wrong credentials', () => {
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
