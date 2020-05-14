/// <reference types="cypress" />

describe('Helpers...', () => {
  beforeEach(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
  });

  it('Wrap', () => {
    const obj = {
      name: 'John Doe',
      age: 15,
    }

    expect(obj).to.have.property('name');
    cy.wrap(obj).should('have.property', 'name');

    cy.get('#formNome').then($el => {
      // $el.val('It works through jQuery')
      cy.wrap($el).type('It works through Cypress+Wrap')
    })

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(10)
      }, 500)
    })

    cy.get('#buttonSimple').then(() => console.log('Button 01 found'))
    // promise.then(num => console.log(num))
    cy.wrap(promise).then(ret => console.log(ret))
    cy.get('#buttonList').then(() => console.log('Button 02 found'))

    cy.wrap(1).then(num => {
      return 2
    }).should('be.equal', 2)
  });

  it('Its', () => {
    const obj = {
      name: 'John',
      age: 20
    }

    cy.wrap(obj).should('have.property', 'name', 'John')
    cy.wrap(obj).its('name').should('be.equal', 'John')

    const obj2 = {
      name: 'John',
      age: 20,
      address: {
        street: 'Lorem Av'
      }
    }

    cy.wrap(obj2).its('address').should('have.property',  'street')
    cy.wrap(obj2).its('address').its('street').should('contain', 'Lorem')
    cy.wrap(obj2).its('address.street').should('contain', 'Lorem')
    
    cy.title().its('length').should('be.equal', 20)
  });

  it.only('Invoke', () => {
    const getValue = () => 1;
    const sumNumber = (a, b) => a + b;

    cy.wrap({ fn: getValue}).invoke('fn').should('be.equal', 1)
    cy.wrap({ fn: sumNumber }).invoke('fn', 2, 5).should('be.equal', 7)

    cy.get('#formNome').invoke('val', 'Text via invoke')
    cy.window().invoke('alert', 'Alert Message')
    cy.get('#resultado').invoke('html', '<input type="button" value="Hacked button">')

  });
});
