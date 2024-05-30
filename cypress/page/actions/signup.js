// Actions to interact with Signup page

module.exports = new (class SignupActions {
  /**
   *
   * @param {Object} userData
   * @param {string} userData.nome
   * @param {string} userData.email
   * @param {string} userData.password
   * @param {string} userData.administrador - "true" or "false"
   */
  createUser(userData) {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('baseUrlApi')}/usuarios`,
      body: userData,
    }).then(res => {
      expect(res.status).to.be.eql(201);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.be.eql('Cadastro realizado com sucesso');

      cy.log('[LOG] User created: ' + userData.email);
    });
  }
})();
