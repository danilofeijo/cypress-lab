/// <reference types="cypress" />

import Utils from '../utils';

import Signup from '../page/actions/signup';

import { elmLogin } from '../page/elements/login';
import { elmHome } from '../page/elements/home';

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

    cy.visit('/login');
  });

  describe('as Admin user', () => {
    beforeEach(() => {
      Signup.createUser(USER);
    });

    it('Should log in with Admin user credentials', () => {
      // Act
      cy.get(elmLogin.inputEmail).type(USER.email);
      cy.get(elmLogin.inputPass).type(USER.password);
      cy.get(elmLogin.buttonEnter).click();

      // Assert
      cy.get(elmHome.headerWelcome).should('contain.text', USER.nome);
      cy.get(elmHome.buttonLogout).should('exist');
    });

    it('Should not log in with wrong credentials', () => {
      // Act
      cy.get(elmLogin.inputEmail).type(USER.email);
      cy.get(elmLogin.inputPass).type('WRONG_PASS');
      cy.get(elmLogin.buttonEnter).click();

      // Assert
      cy.get(elmLogin.toastAlert).should('exist').and('contain.text', 'Email e/ou senha inválidos');
    });
  });

  describe('as Common user', () => {
    it('Should log in with Common user credentials', () => {
      // Arrange
      USER.administrador = 'false';

      Signup.createUser(USER);

      // Act
      cy.get(elmLogin.inputEmail).type(USER.email);
      cy.get(elmLogin.inputPass).type(USER.password);
      cy.get(elmLogin.buttonEnter).click();

      // Assert
      cy.get(elmHome.headerWelcome).should('contain.text', 'Serverest Store');
      cy.get(elmHome.buttonLogout).should('exist');
    });
  });
});
