/// <reference types="cypress" />

const Utils = require('../utils');
const faker = require('faker');

const ActionSignup = require('../page/actions/signup');
const ActionLogin = require('../page/actions/login');
const ActionProduct = require('../page/actions/product');

import { elProduct } from '../page/elements/product';

let ADMIN_USER;
let PRODUCT;

describe('As Admin user', () => {
  before(() => {
    const randomName = Utils.setRandomName();
    const randomEmail = Utils.setRandomEmail(randomName);

    ADMIN_USER = {
      nome: randomName,
      email: randomEmail,
      password: `Test;123`,
      administrador: 'true',
    };

    ActionSignup.API.createUser(ADMIN_USER);
  });

  beforeEach(() => {
    ActionLogin.API.login(ADMIN_USER.email, ADMIN_USER.password);

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
      cy.get(elProduct.create.inputName).type(PRODUCT.nome);
      cy.get(elProduct.create.inputPrice).type(PRODUCT.preco);
      cy.get(elProduct.create.inputDescription).type(PRODUCT.descricao);
      cy.get(elProduct.create.inputQuantity).type(PRODUCT.quantidade);
      // Image upload is barely working. Cypress command do so. Kept to have an use case.
      cy.get(elProduct.create.inputImageUpload).selectFile('cypress/fixtures/miamiGuardHouse.png');
      cy.get(elProduct.create.buttonSave).click();

      // Assert
      cy.get(elProduct.list.listProducts).should('contain.text', PRODUCT.nome);

      // TODO - Clean up - delete created product
    });
  });

  describe('On list product page', () => {
    it('Should delete a product', () => {
      // Arrange
      const adminCredentials = {
        email: ADMIN_USER.email,
        password: ADMIN_USER.password,
      };

      ActionProduct.API.createProduct(adminCredentials, PRODUCT);

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
});
