// Actions to interact with Profile page

const globalElements = require('../global/elements').ELEMENTS;

class ProfileUI {
  visitProfile(username) {
    cy.get(globalElements.fnMenuOptionProfile(username)).click();
  }
}

class ProfileAPI {}

const Profile = {
  ProfileUI: new ProfileUI(),
  ProfileAPI: new ProfileAPI(),
};

export default Profile;
