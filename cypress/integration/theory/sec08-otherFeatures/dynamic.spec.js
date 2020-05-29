/// <reference types="cypress" />

describe('Dynamic Tests...', () => {
  beforeEach(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
  });

  const foods = [
    'Carne',
    'Frango',
    'Pizza',
    'Vegetariano'
  ]

  foods.forEach(food => {
    it(`Fill form with food ${food}`, () => {

      cy.get('#formNome').type('John')
      cy.get('#formSobrenome').type('Doe')
      cy.get(`[name=formSexo][value=F`).click()
      cy.xpath(`//label[contains(.,'${food}')]/preceding-sibling::input`).click()
      cy.get('#formEscolaridade').select('Doutorado')
      cy.get('#formEsportes').select('Corrida')

      cy.get('#formCadastrar').click()
      cy.get('#resultado span:nth-child(1)').should('contain', 'Cadastrado!')
    });
  })

  it('Select all food options', () => {
    cy.get('#formNome').type('John')
    cy.get('#formSobrenome').type('Doe')
    cy.get(`[name=formSexo][value=F`).click()
    cy.get(`[name=formComidaFavorita]`).each($el => {
      // $el.click()
      if ($el.val() != 'vegetariano') {
        cy.wrap($el).click()
      }
    })
    cy.get('#formEscolaridade').select('Doutorado')
    cy.get('#formEsportes').select('Corrida')

    cy.get('#formCadastrar').click()
    cy.get('#resultado span:nth-child(1)').should('contain', 'Cadastrado!')
    
    // cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')
  });
});
