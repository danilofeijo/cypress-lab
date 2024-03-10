/// <reference types="cypress" />

const Utils = require('../utils');

const ActionSignup = require('../page/actions/signup');
const ActionLogin = require('../page/actions/login');

import { elGlobal } from '../page/elements/global';
import { elLogin } from '../page/elements/login';
import { elHome } from '../page/elements/home';

let ADMIN_USER;

describe('On login page', () => {
  beforeEach(() => {
    const randomName = Utils.setRandomName();
    const randomEmail = Utils.setRandomEmail(randomName);

    ADMIN_USER = {
      nome: randomName,
      email: randomEmail,
      password: 'Test;123',
      administrador: 'true',
    };

    ActionSignup.API.createUser(ADMIN_USER);
    ActionLogin.UI.visitLogin();
  });

  it.skip('Should log in with Common user credentials', () => {
    // TODO - Develop test
    // Arrange
    // Act
    // Assert
  });

  it('Should log in with Admin user credentials', () => {
    // Act
    cy.get(elLogin.inputEmail).type(ADMIN_USER.email);
    cy.get(elLogin.inputPass).type(ADMIN_USER.password);
    cy.get(elLogin.buttonEnter).click();

    // Assert
    cy.get(elHome.headerWelcome).should('contain.text', ADMIN_USER.nome);
    cy.get(elGlobal.buttonLogout).should('exist');
  });

  it('Should not log in with wrong credentials', () => {
    // Act
    cy.get(elLogin.inputEmail).type(ADMIN_USER.email);
    cy.get(elLogin.inputPass).type('WRONG_PASS');
    cy.get(elLogin.buttonEnter).click();

    // Assert
    cy.get(elLogin.toastAlert).should('exist').and('contain.text', 'Email e/ou senha inválidos');
  });
});
