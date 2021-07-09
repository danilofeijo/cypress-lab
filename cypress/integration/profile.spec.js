/// <reference types="cypress" />

describe('When visit my profile page', () => {
  beforeEach(() => {
    const email = 'johndoe@cypresslab.com';
    const pass = 'Test;123';

    cy.login(email, pass);
  });

  it('Should load my profile content', () => {
    expect(123).to.eql(123);
  });
});
