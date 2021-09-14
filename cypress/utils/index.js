// Functions to help test development

const faker = require('faker');

class Utils {
  setRandomName() {
    return faker.name.findName();
  }

  setRandomEmail(alias) {
    if (!alias) {
      alias = this.setRandomName();
    }

    return `${alias.toLowerCase().replace(/\s+/g, '')}@test.com`;
  }
}

module.exports = new Utils();
