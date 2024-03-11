/// <reference types="cypress" />

const Utils = require('../utils');

const ActionSignup = require('../page/actions/signup');
const ActionLogin = require('../page/actions/login');

import { elLogin } from '../page/elements/login';
import { elHome } from '../page/elements/home';

let ADMIN_USER;
let COMMON_USER;

describe('On login page', () => {
  beforeEach(() => {
    // TODO - Bring step to promote DRY
  });

  describe('as Common user', () => {
    beforeEach(() => {
      const randomName = Utils.setRandomName();
      const randomEmail = Utils.setRandomEmail(randomName);

      COMMON_USER = {
        nome: randomName,
        email: randomEmail,
        password: 'Test;123',
        administrador: 'false',
      };

      ActionSignup.API.createUser(COMMON_USER);
      ActionLogin.UI.visitLogin();
    });

    it('Should log in with Common user credentials', () => {
      // TODO - Develop test
      // Act
      cy.get(elLogin.inputEmail).type(COMMON_USER.email);
      cy.get(elLogin.inputPass).type(COMMON_USER.password);
      cy.get(elLogin.buttonEnter).click();

      // Assert
      cy.get(elHome.headerWelcome).should('contain.text', 'Serverest Store');
      cy.get(elHome.buttonLogout).should('exist');
    });
  });

  describe('as Admin user', () => {
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

    it('Should log in with Admin user credentials', () => {
      // Act
      cy.get(elLogin.inputEmail).type(ADMIN_USER.email);
      cy.get(elLogin.inputPass).type(ADMIN_USER.password);
      cy.get(elLogin.buttonEnter).click();

      // Assert
      cy.get(elHome.headerWelcome).should('contain.text', ADMIN_USER.nome);
      cy.get(elHome.buttonLogout).should('exist');
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
});
