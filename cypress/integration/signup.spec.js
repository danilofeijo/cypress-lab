/// <reference types="cypress" />

const { SignupUI } = require('../page/signup');
const globalElements = require('../page/global/elements').ELEMENTS;
const faker = require('faker');

let randonName;
let randomAlias;

describe('On Sign up page', () => {
  beforeEach(() => {
    cy.visit('/cadastrarusuarios');

    randonName = faker.name.findName();
    randomAlias = randonName.toLowerCase().replace(/\s+/g, '');
  });

  it('Should create a new admin user', () => {
    // Arrange
    const USER = {
      NAME: randonName,
      EMAIL: `${randomAlias}@test.com`,
      PASS: `Test;123`,
    };

    // Act
    SignupUI.submitAdminUserData(USER);

    // Assert
    cy.get(globalElements.buttonLogout).should('exist');
  });
});
