/// <reference types="cypress" />

const Utils = require('../utils');

// TODO - Explore better ways to import different files with elements
import { elGlobal } from '../page/elements/global';
import { elSignup } from '../page/elements/signup';
import { elHome } from '../page/elements/home';

let randomName;
let randomEmail;

describe('On Sign up page', () => {
  beforeEach(() => {
    cy.visit('/cadastrarusuarios');

    randomName = Utils.setRandomName();
    randomEmail = Utils.setRandomEmail(randomName);
  });

  it('Should create a new admin user', () => {
    // Arrange
    const USER = {
      nome: randomName,
      email: randomEmail,
      pass: `Test;123`,
    };

    // Act
    cy.get(elSignup.inputName).type(USER.nome);
    cy.get(elSignup.inputEmail).type(USER.email);
    cy.get(elSignup.inputPass).type(USER.pass);
    cy.get(elSignup.checkboxAdmin).click();
    cy.get(elSignup.buttonSubmit).click();

    // Assert
    cy.get(elHome.headerWelcome).should('contain.text', USER.nome);
    cy.get(elGlobal.admin.menuCadastrarUsuarios).should('have.text', 'Cadastrar Usuários');
    cy.get(elGlobal.admin.menuListarUsuarios).should('have.text', 'Listar Usuários');
    cy.get(elGlobal.admin.menuCadastrarProdutos).should('have.text', 'Cadastrar Produtos');
    cy.get(elGlobal.admin.menuListarProdutos).should('have.text', 'Listar Produtos');
    cy.get(elGlobal.admin.menuRelatorios).should('have.text', 'Relatórios');
  });

  it.skip('Should create a new common user', () => {
    // TODO - Develop test
    // Arrange
    // Act
    // Assert
  });

  it.skip('Should not create user that already exists', () => {
    // TODO - Develop test
    // Arrange
    // Act
    // Assert
  });
});
