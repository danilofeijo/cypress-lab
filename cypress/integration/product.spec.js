/// <reference types="cypress" />

const SignupAction = require('../page/signup');
const LoginAction = require('../page/login');
const ProductAction = require('../page/product');
const Utils = require('../utils');
const faker = require('faker');

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
  });

  beforeEach(() => {
    SignupAction.API.createUser(USER);
    LoginAction.API.submitLogin(USER.email, USER.password);
  });

  it('Should create a new product', () => {
    cy.visit('/admin/cadastrarprodutos');

    const PRODUCT = {
      NAME: faker.commerce.productName(),
      PRICE: faker.commerce.price(99, 999, 0),
      DESCRIPTION: faker.commerce.productDescription(),
      QUANTITY: '1',
    };

    ProductAction.UI.submitNewProduct(PRODUCT);

    cy.get('table').contains(PRODUCT.NAME).should('have.text', PRODUCT.NAME);
  });
});
