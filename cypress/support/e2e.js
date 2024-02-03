beforeEach(() => {
  cy.log('LOG: Environment = ' + Cypress.env('envName'));
  cy.log('LOG: Running test scenario');
});
