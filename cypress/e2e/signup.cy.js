/// <reference types="cypress" />

import Utils from '../utils';

import Signup from '../page/actions/signup';

import { elmSignup } from '../page/elements/signup';
import { elmHome } from '../page/elements/home';

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
    cy.get(elmSignup.inputName).type(USER.nome);
    cy.get(elmSignup.inputEmail).type(USER.email);
    cy.get(elmSignup.inputPass).type(USER.pass);
    cy.get(elmSignup.checkboxAdmin).click();
    cy.get(elmSignup.buttonSubmit).click();

    // Assert
    cy.get(elmHome.headerWelcome).should('contain.text', USER.nome);
    cy.get(elmHome.admin.menuCadastrarUsuarios).should('have.text', 'Cadastrar Usuários');
    cy.get(elmHome.admin.menuListarUsuarios).should('have.text', 'Listar Usuários');
    cy.get(elmHome.admin.menuCadastrarProdutos).should('have.text', 'Cadastrar Produtos');
    cy.get(elmHome.admin.menuListarProdutos).should('have.text', 'Listar Produtos');
    cy.get(elmHome.admin.menuRelatorios).should('have.text', 'Relatórios');
    cy.get(elmHome.buttonLogout).should('exist');

    cy.get(elmHome.common.menuListaCompras).should('not.exist');
    cy.get(elmHome.common.menuCarrinho).should('not.exist');
  });

  it('Should create a new common user', () => {
    // Act
    cy.get(elmSignup.inputName).type(USER.nome);
    cy.get(elmSignup.inputEmail).type(USER.email);
    cy.get(elmSignup.inputPass).type(USER.pass);
    cy.get(elmSignup.buttonSubmit).click();

    // Assert
    cy.get(elmHome.common.menuListaCompras).should('exist');
    cy.get(elmHome.common.menuCarrinho).should('exist');
    cy.get(elmHome.buttonLogout).should('exist');
    cy.get(elmHome.headerWelcome).should('contain.text', 'Serverest Store');

    cy.get(elmHome.admin.menuCadastrarUsuarios).should('not.exist');
    cy.get(elmHome.admin.menuListarUsuarios).should('not.exist');
    cy.get(elmHome.admin.menuCadastrarProdutos).should('not.exist');
    cy.get(elmHome.admin.menuListarProdutos).should('not.exist');
    cy.get(elmHome.admin.menuRelatorios).should('not.exist');
  });

  it('Should not create user that already exists', () => {
    // Arrange
    const DOUBLE_USER = {
      nome: Utils.setRandomName(),
      email: USER.email,
      password: USER.pass,
      administrador: 'true',
    };

    Signup.createUser(DOUBLE_USER);

    // Act
    cy.get(elmSignup.inputName).type(USER.nome);
    cy.get(elmSignup.inputEmail).type(USER.email);
    cy.get(elmSignup.inputPass).type(USER.pass);
    cy.get(elmSignup.checkboxAdmin).click();
    cy.get(elmSignup.buttonSubmit).click();

    // Assert
    cy.get(elmHome.headerWelcome).should('not.exist');
    cy.get(elmSignup.toastAlert).should('exist').and('contain.text', 'Este email já está sendo usado');
  });
});
