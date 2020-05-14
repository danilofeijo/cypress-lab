/// <reference types="cypress" />

describe('Waitings...', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
  });

  beforeEach(() => {
    cy.reload();
  });

  it('Should wait for element being available', () => {
    cy.get('#novoCampo').should('not.exist')
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo').should('not.exist')
    cy.get('#novoCampo').should('exist')
    cy.get('#novoCampo').type('It Works')
  });

  it('Should retry ', () => {
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo')
      .should('not.exist')
    cy.get('#novoCampo')
      .should('exist')
      .type('It Works')
  });

  it('Using find', () => {
    cy.get('#buttonList').click()
    cy.get('#lista li')
      .find('span')
      .should('contain', 'Item 1')
    // cy.get('#lista li')
    //   .find('span')
    //   .should('contain', 'Item 2')
    cy.get('#lista li span')
      .should('contain', 'Item 2')

    cy.get('#buttonListDOM').click()
    cy.get('#lista li')
      .find('span')
      .should('contain', 'Item 1')
    // cy.get('#lista li')
    //   .find('span')
    //   .should('contain', 'Item 2')
    cy.get('#lista li span')
      .should('contain', 'Item 2')
  });

  it('Using Wait and Timeouts', () => {
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo', {timeout: 5000 }).should('exist')

    cy.get('#buttonListDOM').click()
    // cy.wait(3000);
    cy.get('#lista li span', { timeout: 30000})
      .should('contain', 'Item 2')

    cy.get('#buttonListDOM').click()
    cy.get('#lista li span', { timeout: 5000})
      .should('have.length', 1)
    cy.get('#lista li span', { timeout: 5000})
      .should('have.length', 2)
  });

  it('Click and retry', () => {
    cy.get('#buttonCount')
      .click()
      .click()
      .should('have.value', '111')
  });

  it('Should vs Then', () => {
    // cy.get('#buttonListDOM').click()
    // cy.get('#lista li span').then($el => {
      // .should('have.length', 1)
    //   console.log($el);
    //   expect($el).to.have.length(1);
    // })

    // cy.get('#buttonListDOM').then($el => {
    //   expect($el).to.have.length(1);
    //   return 2
    // }).and('eq', 2)
    //   .and('not.have.id', 'buttonListDOM')

    cy.get('#buttonListDOM').should($el => {
      expect($el).to.have.length(1);
      // cy.get('#buttonList')
    })
  });
});
