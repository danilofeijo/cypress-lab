// Actions to interact with Login page

const elementsLogin = require('./elements').ELEMENTS;

class LoginUI {
  visitLogin() {
    cy.visit('/login');

    cy.get(elementsLogin.inputEmail).should('exist');
    cy.get(elementsLogin.inputPass).should('exist');
    cy.get(elementsLogin.buttonEnter).should('exist');
  }
}

class LoginAPI {
  submitLogin(email, password) {
    const body = {
      email,
      password,
    };

    console.log('baseUrlApi => ', Cypress.env('baseUrlApi'));

    cy.request({
      method: 'POST',
      url: `${Cypress.env('baseUrlApi')}/login`,
      body,
    }).then(res => {
      expect(res.status).to.be.eql(200);
      expect(res.body).to.have.property('message', 'Login realizado com sucesso');

      window.localStorage.setItem('serverest/userToken', res.body.authorization);
    });
  }
}

module.exports = {
  UI: new LoginUI(),
  API: new LoginAPI(),
};
