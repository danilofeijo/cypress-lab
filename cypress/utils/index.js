// Functions to help test development

const faker = require('faker');

module.exports = new (class Utils {
  setRandomName() {
    return faker.name.findName();
  }

  setRandomEmail(alias) {
    if (!alias) {
      alias = this.setRandomName();
    }

    return `${alias.toLowerCase().replace(/\s+/g, '')}@test.com`;
  }
})();
