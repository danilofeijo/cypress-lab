/// <reference types="cypress" />

describe('Working with alerts...', () => {
  it('Interacting with iFrames', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
    cy.get('#frame1').then(iFrame => {
      const body = iFrame.contents().find('body');

      cy.wrap(body).find('#tfield')
        .type('It Works?')
        .should('have.value', 'It Works?')

      // It doesn't work - Cypress limitation
      // cy.on('window:alert', msg => {
      //   expect(msg).to.be.equal('Xablau')
      // })
      // cy.wrap(body).find('#otherButton').click()
    })
  });

  it('Interacting direclty with iFrames', () => {
    cy.visit('https://wcaquino.me/cypress/frame.html');
    cy.get('#otherButton').click()

    cy.on('window:alert', msg => {
      expect(msg).to.be.equal('Click OK!')
    })
  });
});
