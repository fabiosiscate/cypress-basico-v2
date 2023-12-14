// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    const longText = 'Tenho duvidas de como preencher formulario. Tenho duvidas de como preencher formulario. Tenho duvidas de como preencher formulario. Tenho duvidas de como preencher formulario. Tenho duvidas de como preencher formulario. Tenho duvidas de como preencher formulario. Tenho duvidas de como preencher formulario. '
    cy.get('#firstName').type('Fulano', {delay : 0})
    cy.get('#lastName').type('de Tal', {delay : 0})
    cy.get('#email').type('fulano@detal.com', {delay : 0})
    cy.get('#open-text-area').type(longText, {delay : 0})
    cy.contains('button', 'Enviar').click()
    
})


