// Actions to interact with related page

const pageElements = require('./elements').ELEMENTS;

class LoginUI {
  visitLogin() {
    cy.visit('/login');
  }

  submitLogin(user, pass) {
    cy.get(pageElements.inputEmail).type(user);
    cy.get(pageElements.inputPass).type(pass);
    cy.get(pageElements.buttonThat).contains('Sign in').click();
  }
}

class LoginAPI {}

const Login = {
  LoginUI: new LoginUI(),
  LoginAPI: new LoginAPI(),
};

export default Login;
