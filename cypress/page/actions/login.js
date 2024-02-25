// Actions to interact with Login page

const pageLogin = require('../elements/login').ELEMENTS_LOGIN;

class LoginUI {
  visitLogin() {
    cy.visit('/login');

    cy.get(pageLogin.inputEmail).should('exist');
    cy.get(pageLogin.inputPass).should('exist');
    cy.get(pageLogin.buttonEnter).should('exist');
  }
}

class LoginAPI {
  /**
   *
   * @param {string} email
   * @param {string} password
   */
  login(email, password) {
    const body = {
      email,
      password,
    };

    cy.request({
      method: 'POST',
      url: `${Cypress.env('baseUrlApi')}/login`,
      body,
    }).then(res => {
      expect(res.status).to.be.eql(200);
      expect(res.body).to.have.property('message', 'Login realizado com sucesso');

      window.localStorage.setItem('serverest/userToken', res.body.authorization);

      cy.log('[LOG] User logged in: ' + email);
    });
  }
}

module.exports = {
  UI: new LoginUI(),
  API: new LoginAPI(),
};
