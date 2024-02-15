/// <reference types="cypress" />

const Utils = require('../utils');
const faker = require('faker');

const ActionSignup = require('../page/signup');
const ActionLogin = require('../page/login');
const ActionProduct = require('../page/product');

const pageProduct = require('../page/product/elements').ELEMENTS_PRODUCT;

let USER;
let USER_CREDENTIALS;
let PRODUCT;

// TODO - split in describes. One for Create, another one for List
describe('On product page', () => {
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
    cy.get(pageProduct.create.inputName).type(PRODUCT.nome);
    cy.get(pageProduct.create.inputPrice).type(PRODUCT.preco);
    cy.get(pageProduct.create.inputDescription).type(PRODUCT.descricao);
    cy.get(pageProduct.create.inputQuantity).type(PRODUCT.quantidade);
    // Image upload is barely working. Cypress command do so. Kept to have an use case.
    cy.get(pageProduct.create.inputImageUpload).selectFile('cypress/fixtures/miamiGuardHouse.png');
    cy.get(pageProduct.create.buttonSave).click();

    // Assert
    cy.get(pageProduct.list.listProducts).should('contain.text', PRODUCT.nome);

    // TODO - Clean up - delete created product
  });

  it('Should delete a product', () => {
    // Arrange
    ActionProduct.API.createProduct(USER_CREDENTIALS, PRODUCT);

    cy.visit('/admin/listarprodutos');
    cy.intercept('/produtos/*').as('deleteProduct');

    // Act
    cy.contains(pageProduct.list.listProducts, PRODUCT.nome).within(() => {
      cy.get(pageProduct.list.buttonDelete).click();
    });

    cy.wait('@deleteProduct');

    // Assert
    cy.get(pageProduct.list.listProducts).should('not.contain.text', PRODUCT.nome);
  });
});
