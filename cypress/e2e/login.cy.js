/// <reference types="cypress" />

// TODO - change require to import
const Utils = require('../utils');

const ActionSignup = require('../page/actions/signup');
const ActionLogin = require('../page/actions/login');

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
      password: 'Test;123',
      administrador: 'true',
    };

    ActionLogin.UI.visitLogin();
  });

  describe('as Admin user', () => {
    beforeEach(() => {
      ActionSignup.API.createUser(USER);
    });

    it('Should log in with Admin user credentials', () => {
      // Act
      cy.get(elLogin.inputEmail).type(USER.email);
      cy.get(elLogin.inputPass).type(USER.password);
      cy.get(elLogin.buttonEnter).click();

      // Assert
      cy.get(elHome.headerWelcome).should('contain.text', USER.nome);
      cy.get(elHome.buttonLogout).should('exist');
    });

    it('Should not log in with wrong credentials', () => {
      // Act
      cy.get(elLogin.inputEmail).type(USER.email);
      cy.get(elLogin.inputPass).type('WRONG_PASS');
      cy.get(elLogin.buttonEnter).click();

      // Assert
      cy.get(elLogin.toastAlert).should('exist').and('contain.text', 'Email e/ou senha inválidos');
    });
  });

  describe('as Common user', () => {
    it('Should log in with Common user credentials', () => {
      // Arrange
      USER.administrador = 'false';

      ActionSignup.API.createUser(USER);

      // Act
      cy.get(elLogin.inputEmail).type(USER.email);
      cy.get(elLogin.inputPass).type(USER.password);
      cy.get(elLogin.buttonEnter).click();

      // Assert
      cy.get(elHome.headerWelcome).should('contain.text', 'Serverest Store');
      cy.get(elHome.buttonLogout).should('exist');
    });
  });
});
