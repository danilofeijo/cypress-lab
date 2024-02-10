/// <reference types="cypress" />

const Utils = require('../utils');
const faker = require('faker');

const ActionSignup = require('../page/signup');
const ActionLogin = require('../page/login');

const elementsProductCreate = require('../page/product/elements').ELEMENTS;

let USER;

describe('On new product page', () => {
  before(() => {
    const randomName = Utils.setRandomName();
    const randomEmail = Utils.setRandomEmail(randomName);

    USER = {
      nome: randomName,
      email: randomEmail,
      password: `Test;123`,
      administrador: 'true',
    };

    ActionSignup.API.createUser(USER);
  });

  beforeEach(() => {
    ActionLogin.API.submitLogin(USER.email, USER.password);
    cy.log('LOG: User email = ' + USER.email);
    cy.log('LOG: User pass = ' + USER.password);
  });

  it('Should create a new product', () => {
    // Arrange
    cy.visit('/admin/cadastrarprodutos');

    const PRODUCT = {
      NAME: faker.commerce.productName(),
      PRICE: faker.commerce.price(99, 999, 0),
      DESCRIPTION: faker.commerce.productDescription(),
      QUANTITY: '1',
    };

    // Act
    cy.get(elementsProductCreate.newProduct.inputName).type(PRODUCT.NAME);
    cy.get(elementsProductCreate.newProduct.inputPrice).type(PRODUCT.PRICE);
    cy.get(elementsProductCreate.newProduct.inputDescription).type(PRODUCT.DESCRIPTION);
    cy.get(elementsProductCreate.newProduct.inputQuantity).type(PRODUCT.QUANTITY);
    // The Applications image upload doesn't look good.
    // But I kept Cypress image upload. So we have an use case at least.
    cy.get(elementsProductCreate.newProduct.inputImageUpload).selectFile('cypress/fixtures/miamiGuardHouse.png');
    cy.get(elementsProductCreate.newProduct.buttonSave).click();

    // Assert
    cy.get('table').contains(PRODUCT.NAME).should('have.text', PRODUCT.NAME);
  });

  it('Should edit a created product', () => {
    // TODO - Develop test scenario
    /**
     *  Steps Reference
     *
     *  - Set product data
     *  - Create product through - API
     *  - Log in through - API (done at beforeEach)
     *  - Visit product page - WEB
     */
    // Arrange
    // Act
    // Assert
  });
});
