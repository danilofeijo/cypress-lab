// Actions to interact with Product page

// Will be needed when create the first UI action
// const elementsProductCreate = require('./elements').ELEMENTS;

class ProductAPI {
  /**
   *
   * @param {Object} userCredentials
   * @param {string} userCredentials.email
   * @param {string} userCredentials.password
   * @param {Object} productData
   * @param {string} productData.nome
   * @param {number} productData.preco
   * @param {string} productData.descricao
   * @param {string} productData.quantidade
   */
  createProduct(userCredentials, productData) {
    const baseUrlApi = `${Cypress.env('baseUrlApi')}`;

    cy.request({
      method: 'POST',
      url: baseUrlApi + '/login',
      body: userCredentials,
    }).then(res => {
      const authToken = res.body.authorization;

      cy.request({
        method: 'POST',
        url: baseUrlApi + '/produtos',
        headers: { Authorization: authToken },
        body: productData,
      }).then(resProduct => {
        cy.log(productData.nome);
        expect(resProduct.status).to.be.eql(201);
        expect(resProduct.body).to.have.property('message', 'Cadastro realizado com sucesso');
      });
    });
  }
}

module.exports = {
  API: new ProductAPI(),
};
