// Actions to interact with Login page

const pageElements = require('./elements').ELEMENTS;

class LoginUI {
  visitLogin() {
    cy.visit('/login');

    cy.get(pageElements.inputEmail).should('exist');
    cy.get(pageElements.inputPass).should('exist');
    cy.get(pageElements.buttonEnter).should('exist');
  }

  submitLogin(user, pass) {
    cy.get(pageElements.inputEmail).type(user);
    cy.get(pageElements.inputPass).type(pass);
    cy.get(pageElements.buttonEnter).click();
  }
}

class LoginAPI {}

const Login = {
  LoginUI: new LoginUI(),
  LoginAPI: new LoginAPI(),
};

export default Login;
