/// <reference types="cypress" />

// TODO - change require to import
const Utils = require('../utils');

const ActionSignup = require('../page/actions/signup');

import { elSignup } from '../page/elements/signup';
import { elHome } from '../page/elements/home';

let USER;

describe('On Sign up page', () => {
  beforeEach(() => {
    const nome = Utils.setRandomName();
    const email = Utils.setRandomEmail(nome);

    USER = {
      nome,
      email,
      pass: `Test;123`,
    };

    cy.visit('/cadastrarusuarios');
  });

  it('Should create a new admin user', () => {
    // Act
    cy.get(elSignup.inputName).type(USER.nome);
    cy.get(elSignup.inputEmail).type(USER.email);
    cy.get(elSignup.inputPass).type(USER.pass);
    cy.get(elSignup.checkboxAdmin).click();
    cy.get(elSignup.buttonSubmit).click();

    // Assert
    cy.get(elHome.headerWelcome).should('contain.text', USER.nome);
    cy.get(elHome.admin.menuCadastrarUsuarios).should('have.text', 'Cadastrar Usuários');
    cy.get(elHome.admin.menuListarUsuarios).should('have.text', 'Listar Usuários');
    cy.get(elHome.admin.menuCadastrarProdutos).should('have.text', 'Cadastrar Produtos');
    cy.get(elHome.admin.menuListarProdutos).should('have.text', 'Listar Produtos');
    cy.get(elHome.admin.menuRelatorios).should('have.text', 'Relatórios');
    cy.get(elHome.buttonLogout).should('exist');

    cy.get(elHome.common.menuListaCompras).should('not.exist');
    cy.get(elHome.common.menuCarrinho).should('not.exist');
  });

  it('Should create a new common user', () => {
    // Act
    cy.get(elSignup.inputName).type(USER.nome);
    cy.get(elSignup.inputEmail).type(USER.email);
    cy.get(elSignup.inputPass).type(USER.pass);
    cy.get(elSignup.buttonSubmit).click();

    // Assert
    cy.get(elHome.common.menuListaCompras).should('exist');
    cy.get(elHome.common.menuCarrinho).should('exist');
    cy.get(elHome.buttonLogout).should('exist');
    cy.get(elHome.headerWelcome).should('contain.text', 'Serverest Store');

    cy.get(elHome.admin.menuCadastrarUsuarios).should('not.exist');
    cy.get(elHome.admin.menuListarUsuarios).should('not.exist');
    cy.get(elHome.admin.menuCadastrarProdutos).should('not.exist');
    cy.get(elHome.admin.menuListarProdutos).should('not.exist');
    cy.get(elHome.admin.menuRelatorios).should('not.exist');
  });

  it('Should not create user that already exists', () => {
    // Arrange
    const DOUBLE_USER = {
      nome: Utils.setRandomName(),
      email: USER.email,
      password: USER.pass,
      administrador: 'true',
    };

    ActionSignup.API.createUser(DOUBLE_USER);

    // Act
    cy.get(elSignup.inputName).type(USER.nome);
    cy.get(elSignup.inputEmail).type(USER.email);
    cy.get(elSignup.inputPass).type(USER.pass);
    cy.get(elSignup.checkboxAdmin).click();
    cy.get(elSignup.buttonSubmit).click();

    // Assert
    cy.get(elHome.headerWelcome).should('not.exist');
    cy.get(elSignup.toastAlert).should('exist').and('contain.text', 'Este email já está sendo usado');
  });
});
