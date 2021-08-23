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

class SignupAPI {}

export default {
  SignupUI: new SignupUI(),
  SignupAPI: new SignupAPI(),
};
