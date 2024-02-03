// Actions to interact with Product page

const pageElements = require('./elements').ELEMENTS;

class ProductUI {
  submitNewProduct(productData) {
    cy.get(pageElements.newProduct.inputName).type(productData.NAME);
    cy.get(pageElements.newProduct.inputPrice).type(productData.PRICE);
    cy.get(pageElements.newProduct.inputDescription).type(productData.DESCRIPTION);
    cy.get(pageElements.newProduct.inputQuantity).type(productData.QUANTITY);
    // Cypress image upload looks good. However...
    // Applications image upload doesn't seem to work.
    // So I kept image upload feature anyway.
    cy.get(pageElements.newProduct.inputImageUpload).selectFile('cypress/fixtures/miamiGuardHouse.png');
    cy.get(pageElements.newProduct.buttonSave).click();
  }
}

module.exports = {
  UI: new ProductUI(),
};
