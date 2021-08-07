// Actions to interact with Profile page

const globalElements = require('../global/elements').ELEMENTS;
const profileElements = require('../profile/elements').ELEMENTS;

class ProfileUI {
  visitProfile(username) {
    cy.get(globalElements.fnMenuOptionProfile(username)).click();
  }

  updateProfile(shortBioText) {
    cy.get(profileElements.buttonEditProfile).click();
    cy.get(profileElements.formEditProfile.fieldShortBio)
      .clear()
      .type(shortBioText);
    cy.get(profileElements.formEditProfile.buttonSave).click();
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
