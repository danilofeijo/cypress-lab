/// <reference types="cypress" />

describe('Elementos basicos', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
  });

  beforeEach(() => {
    cy.reload();
  });

  it('Text', () => {
    cy.get('body').should('contain', 'Cuidado');
    cy.get('span').should('contain', 'Cuidado');
    cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...');
  });

  it('Links', () => {
    cy.get('a:nth-child(1)').click();
    cy.get('#resultado').should('have.text', 'Voltou!');

    cy.reload();
    cy.get('#resultado').should('not.have.text', 'Voltou!');
    cy.contains('Voltar').click();
    cy.get('#resultado').should('have.text', 'Voltou!');
  });

  it('Text field', () => {
    cy.get('#formNome').type('Jhon');
    cy.get('#formNome').should('have.value', 'Jhon');

    cy.get('#elementosForm\\:sugestoes')
      .type('Lorem ipsum dolor sit')
      .should('have.value', 'Lorem ipsum dolor sit');

    cy.get('#tabelaUsuarios > tbody > tr:nth-child(1) > td:nth-child(6) > input[type=text]')
      .type('???');

    cy.get('[data-cy=dataSobrenome]')
      .type('Teste 12345{backspace}{backspace}')
      .should('have.value', 'Teste 123');

    cy.get('#elementosForm\\:sugestoes')
      .clear()
      .type('Erro{selectall}Acerto!', { delay: 100 })
      .should('have.value', 'Acerto!');
  });

  it('Radio button', () => {
    cy.get('#formSexoFem')
      .click()
      .should('be.checked')

    cy.get('#formSexoMasc')
      .should('not.be.checked')

    cy.get('[name=formSexo]')
      .should('have.length', 2)
  });

  it('Checkbox', () => {
    cy.get('#formComidaVegetariana')
      .click()
      .should('be.checked')

    cy.get('[name=formComidaFavorita]').click({multiple: true})
    cy.get('#formComidaVegetariana')
    .should('be.not.checked')

    cy.get('#formComidaPizza')
      .should('be.checked')

    // DONE - Validar opções do combo
    cy.get('[data-test=dataEscolaridade] option')
      .should('have.length', 8)

    cy.get('[data-test=dataEscolaridade] option').then($arr => {
      const values = []

      $arr.each(function() {
        values.push(this.innerHTML)
      })

      expect(values).to.include.members(['Superior', 'Mestrado']);
    })
  });

  it('Combobox', () => {
    cy.get('[data-test=dataEscolaridade]')
      .select('2o grau completo')
      .and('have.value', '2graucomp')
  });

  it('Combo multiplo', () => {
    cy.get('[data-testid=dataEsportes]')
      .select(['natacao', 'Corrida', 'nada'])
    
    // DONE - Validar opções selecionadas do combo multiplo
    // cy.get('[data-testid=dataEsportes]').should('have.value', ['natacao', 'Corrida', 'nada'])
    cy.get('[data-testid=dataEsportes]').then($el => {
      expect($el.val()).to.be.deep.equal(['natacao', 'Corrida', 'nada'])
      expect($el.val()).to.have.length(3)
    })

    cy.get('[data-testid=dataEsportes]')
      .invoke('val')
      .should('eql', ['natacao', 'Corrida', 'nada'])
  });
});
