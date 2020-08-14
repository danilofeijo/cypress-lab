/// <reference types="cypress" />

describe('Dynamic Tests...', () => {
  beforeEach(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
  });

  it('Back to the past', () => {
    cy.get('#buttonNow').click();
    cy.get('#resultado span').should('contain', '27/05/2020');

    // cy.clock()
    // cy.get('#buttonNow').click()
    // cy.get('#resultado span').should('contain', '31/12/1969')

    const myDate = new Date(2012, 3, 10, 23, 45);
    cy.clock(myDate.getTime());
    cy.get('#buttonNow').click();
    cy.get('#resultado span').should('contain', '10/04/2012');
  });

  it('Back to the future', () => {
    cy.get('#buttonTimePassed').click();
    cy.get('#resultado span').should('contain', '15906');
    cy.get('#resultado span').invoke('text').should('be.gt', 1590613372845);

    cy.clock();
    cy.get('#buttonTimePassed').click();
    cy.get('#resultado span').invoke('text').should('be.lte', 0);

    cy.tick(5000);
    cy.get('#buttonTimePassed').click();
    cy.get('#resultado span').invoke('text').should('be.lte', 5000);

    cy.tick(10000);
    cy.get('#buttonTimePassed').click();
    cy.get('#resultado span').invoke('text').should('be.lte', 15000);
  });
});
