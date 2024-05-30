/// <reference types="cypress" />

import Utils from '../utils';
import faker from 'faker';

import Signup from '../page/actions/signup';
import Login from '../page/actions/login';
import Product from '../page/actions/product';

import { elmProduct } from '../page/elements/product';

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

    Signup.createUser(ADMIN_USER);
  });

  beforeEach(() => {
    Login.login(ADMIN_USER.email, ADMIN_USER.password);

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
      cy.get(elmProduct.create.inputName).type(PRODUCT.nome);
      cy.get(elmProduct.create.inputPrice).type(PRODUCT.preco);
      cy.get(elmProduct.create.inputDescription).type(PRODUCT.descricao);
      cy.get(elmProduct.create.inputQuantity).type(PRODUCT.quantidade);
      // Image upload is barely working. Cypress command do so. Kept to have an use case.
      cy.get(elmProduct.create.inputImageUpload).selectFile('cypress/fixtures/miamiGuardHouse.png');
      cy.get(elmProduct.create.buttonSave).click();

      // Assert
      cy.get(elmProduct.list.listProducts).should('contain.text', PRODUCT.nome);

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

      Product.createProduct(adminCredentials, PRODUCT);

      cy.visit('/admin/listarprodutos');
      cy.intercept('/produtos/*').as('deleteProduct');

      // Act
      cy.contains(elmProduct.list.listProducts, PRODUCT.nome).within(() => {
        cy.get(elmProduct.list.buttonDelete).click();
      });
      cy.wait('@deleteProduct');

      // Assert
      cy.get(elmProduct.list.listProducts).should('not.contain.text', PRODUCT.nome);
    });
  });
});
