/// <reference types="cypress" />

const Utils = require('../utils');

const ActionSignup = require('../page/actions/signup');
const ActionLogin = require('../page/actions/login');

import { elGlobal } from '../page/elements/global';
import { elLogin } from '../page/elements/login';
import { elHome } from '../page/elements/home';

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
    cy.get(elLogin.inputEmail).type(LOGIN.EMAIL);
    cy.get(elLogin.inputPass).type(LOGIN.PASS);
    cy.get(elLogin.buttonEnter).click();

    // Assert
    cy.get(elHome.headerWelcome).should('contain.text', USER.nome);
    cy.get(elGlobal.buttonLogout).should('exist');
  });

  it('Should not log in with wrong credentials', () => {
    // Arrange
    const LOGIN = {
      EMAIL: USER.email,
      WRONG_PASS: 'wrongPass',
    };

    // Act
    cy.get(elLogin.inputEmail).type(LOGIN.EMAIL);
    cy.get(elLogin.inputPass).type(LOGIN.WRONG_PASS);
    cy.get(elLogin.buttonEnter).click();

    // Assert
    cy.get(elLogin.toastAlert).should('exist').and('contain.text', 'Email e/ou senha inválidos');
  });
});
