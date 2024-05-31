// Actions to interact with Product page

module.exports = new (class ProductActions {
  /**
   *
   * @param {Object} userCredentials
   * @param {string} userCredentials.email
   * @param {string} userCredentials.password
   *
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
        expect(resProduct.status).to.be.eql(201);
        expect(resProduct.body).to.have.property('message', 'Cadastro realizado com sucesso');
        cy.log('[LOG] Product created: ' + productData.nome);
      });
    });
  }
})();
