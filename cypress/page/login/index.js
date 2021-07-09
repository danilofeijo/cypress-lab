// Actions to interact with related page

// const pageElements = require('./elements').ELEMENTS;

class LoginUI {
  visitLogin() {
    cy.visit('/login');
  }

  submitLogin(user, pass) {
    cy.get('input[placeholder="Email"]').type(user);
    cy.get('input[placeholder="Password"]').type(pass);
    cy.get('button').contains('Sign in').click();
  }
}

class LoginAPI {}

const Login = {
  LoginUI: new LoginUI(),
  LoginAPI: new LoginAPI(),
};

export default Login;
