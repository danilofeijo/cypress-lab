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
    });
  }
}

module.exports = {
  UI: new LoginUI(),
  API: new LoginAPI(),
};
