// Actions to interact with Profile page

const globalElements = require('../global/elements').ELEMENTS;

class ProfileUI {
  visitProfile(username) {
    cy.get(globalElements.fnMenuOptionProfile(username)).click();
  }
}

class ProfileAPI {
  visitProfile(username) {
    cy.visit(`/@${username}`);
  }
}

export default {
  ProfileUI: new ProfileUI(),
  ProfileAPI: new ProfileAPI(),
};
