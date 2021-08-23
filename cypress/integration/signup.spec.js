/// <reference types="cypress" />

import { SignupUI } from '../page/signup';

const faker = require('faker');
const globalElements = require('../page/global/elements').ELEMENTS;

describe('On Sign up page', () => {
  beforeEach(() => {
    cy.visit('/cadastrarusuarios');
  });

  it('Should create a new user', () => {
    const userName = 'John Doe';
    const userEmail = 'johndoe@test.com';
    const userPass = 'Test;123';

    cy.get('[data-testid="nome"]').type(userName);
    cy.get('[data-testid="email"]').type(userEmail);
    cy.get('[data-testid="senha"]').type(userPass);
    cy.get('[data-testid="cadastrar"]').click();

    cy.get(globalElements.butonLogout).should('exist');
  });
});
