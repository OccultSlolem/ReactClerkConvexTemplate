/// <reference types="cypress" />

describe('Main', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
    cy.get('.header').should('be.visible');
  });

  it('should increment and decrement the global counter', () => {
    cy.get('#global-count').should('exist');
    cy.get('#global-inc').should('exist');
    cy.get('#global-dec').should('exist');
    cy.get('#global-count').should('exist');
    cy.get('#global-count').invoke('text').then((currentCount) => {
      cy.get('#global-inc').click();
      cy.get('#global-count').should('include.text', `${parseInt(currentCount) + 1}`);
      cy.wait(1000);
      cy.get('#global-dec').click();
      cy.get('#global-count').should('include.text', currentCount);
    });
  })
});
