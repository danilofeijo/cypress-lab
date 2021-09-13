// Actions to interact with Signup page

const pageElements = require('./elements').ELEMENTS;

class SignupUI {
  submitAdminUserData(userData) {
    cy.get(pageElements.inputName).type(userData.NAME);
    cy.get(pageElements.inputEmail).type(userData.EMAIL);
    cy.get(pageElements.inputPass).type(userData.PASS);
    cy.get(pageElements.checkboxAdmin).click();
    cy.get(pageElements.buttonSubmit).click();
  }
}

class SignupAPI {
  createUser(userData) {
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/usuarios',
      body: userData,
    }).then(res => {
      expect(res.status).to.be.eql(201);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.be.eql('Cadastro realizado com sucesso');
    });
  }
}

module.exports = {
  SignupUI: new SignupUI(),
  SignupAPI: new SignupAPI(),
};
