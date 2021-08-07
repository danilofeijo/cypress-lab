// Actions to interact with Global area

const pageElements = require('./elements').ELEMENTS;

class GlobalUI {
  accessProfilePage(profileName) {
    cy.get(pageElements.fnMenuOptionProfile(profileName)).click();
  }
}

export default {
  GlobalUI: new GlobalUI(),
};
