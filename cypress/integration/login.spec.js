/// <reference types="cypress" />

import { LoginUI } from '../page/login';
import { SignupAPI } from '../page/signup';
const globalElements = require('../page/global/elements').ELEMENTS;
const faker = require('faker');

let USER;

describe('On login page', () => {
  beforeEach(() => {
    const randonName = faker.name.findName();
    const randomAlias = randonName.toLowerCase().replace(/\s+/g, '');

    USER = {
      nome: randonName,
      email: `${randomAlias}@test.com`,
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
