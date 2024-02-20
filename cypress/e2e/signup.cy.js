/// <reference types="cypress" />

const Utils = require('../utils');

// TODO - Explore better ways to import different files with elements
const pageGlobal = require('../page/global/elements').ELEMENTS_GLOBAL;
const pageSignup = require('../page/signup/elements').ELEMENTS_SIGNUP;
const pageHome = require('../page/home/elements').ELEMENTS_HOME;

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
    cy.get(pageSignup.inputName).type(USER.nome);
    cy.get(pageSignup.inputEmail).type(USER.email);
    cy.get(pageSignup.inputPass).type(USER.pass);
    cy.get(pageSignup.checkboxAdmin).click();
    cy.get(pageSignup.buttonSubmit).click();

    // Assert
    cy.get(pageHome.headerWelcome).should('contain.text', USER.nome);
    cy.get(pageGlobal.admin.menuCadastrarUsuarios).should('have.text', 'Cadastrar Usuários');
    cy.get(pageGlobal.admin.menuListarUsuarios).should('have.text', 'Listar Usuários');
    cy.get(pageGlobal.admin.menuCadastrarProdutos).should('have.text', 'Cadastrar Produtos');
    cy.get(pageGlobal.admin.menuListarProdutos).should('have.text', 'Listar Produtos');
    cy.get(pageGlobal.admin.menuRelatorios).should('have.text', 'Relatórios');
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
