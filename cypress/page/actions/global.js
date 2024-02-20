// Actions to interact with Global area

const pageGlobal = require('./elements').ELEMENTS_GLOBAL;

class GlobalUI {
  accessProfilePage(profileName) {
    cy.get(pageGlobal.fnMenuOptionProfile(profileName)).click();
  }
}

export default {
  GlobalUI: new GlobalUI(),
};
