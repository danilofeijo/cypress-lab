/// <reference types="cypress" />

const Utils = require('../utils');
const faker = require('faker');

const ActionSignup = require('../page/signup');
const ActionLogin = require('../page/login');
const ActionProduct = require('../page/product');

const pageProduct = require('../page/product/elements').ELEMENTS_PRODUCT;

// TODO - Review uppercase usage
// Reference - https://github.com/airbnb/javascript/#naming--uppercase
let USER;
let PRODUCT;

describe('As Admin user', () => {
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
    ActionLogin.API.login(USER.email, USER.password);

    PRODUCT = {
      nome: faker.commerce.productName(),
      preco: faker.commerce.price(99, 999, 0),
      descricao: faker.commerce.productDescription(),
      quantidade: '1',
    };
  });

  describe('On create product page', () => {
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
  });

  describe('On list product page', () => {
    it('Should delete a product', () => {
      // Arrange
      const adminCredentials = {
        email: USER.email,
        password: USER.password,
      };

      ActionProduct.API.createProduct(adminCredentials, PRODUCT);

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
});
