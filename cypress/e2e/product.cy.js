/// <reference types="cypress" />

const Utils = require('../utils');
const faker = require('faker');

const ActionSignup = require('../page/signup');
const ActionLogin = require('../page/login');
const ActionProduct = require('../page/product');

const elProduct = require('../page/product/elements').ELEMENTS_PRODUCT;

let USER;
let USER_CREDENTIALS;
let PRODUCT;

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
    USER_CREDENTIALS = {
      email: USER.email,
      password: USER.password,
    };

    ActionLogin.API.submitLogin(USER_CREDENTIALS.email, USER_CREDENTIALS.password);

    PRODUCT = {
      nome: faker.commerce.productName(),
      preco: faker.commerce.price(99, 999, 0),
      descricao: faker.commerce.productDescription(),
      quantidade: '1',
    };
  });

  it('Should create a new product', () => {
    // Arrange
    cy.visit('/admin/cadastrarprodutos');

    // Act
    cy.get(elProduct.create.inputName).type(PRODUCT.nome);
    cy.get(elProduct.create.inputPrice).type(PRODUCT.preco);
    cy.get(elProduct.create.inputDescription).type(PRODUCT.descricao);
    cy.get(elProduct.create.inputQuantity).type(PRODUCT.quantidade);
    // Image upload is barely working. Cypress command do so. Kept to have an use case.
    cy.get(elProduct.create.inputImageUpload).selectFile('cypress/fixtures/miamiGuardHouse.png');
    cy.get(elProduct.create.buttonSave).click();

    // Assert
    cy.get(elProduct.list.listProducts).should('contain.text', PRODUCT.nome);
  });

  it('Should delete a product', () => {
    // Arrange
    ActionProduct.API.createProduct(USER_CREDENTIALS, PRODUCT);

    cy.visit('/admin/listarprodutos');
    cy.intercept('/produtos/*').as('deleteProduct');

    // Act
    cy.contains(elProduct.list.listProducts, PRODUCT.nome).within(() => {
      cy.get(elProduct.list.buttonDelete).click();
    });

    cy.wait('@deleteProduct');

    // Assert
    cy.get(elProduct.list.listProducts).should('not.contain.text', PRODUCT.nome);
  });
});
