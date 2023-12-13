// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test


/// <reference types="Cypress" />
import '../support'


describe('Central de Atendimento ao Cliente TAT', function() { //suite de teste
    beforeEach( function(){
        cy.visit('../../src/index.html')
    })


    it('EX.1 verifica o título da aplicação', function() { // caso de teste
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('EX.2 preenche os campos obrigatórios e envia o formulário', function() { // caso de teste
        const longText = 'Tenho duvidas de como preencher formulario. Tenho duvidas de como preencher formulario. Tenho duvidas de como preencher formulario. Tenho duvidas de como preencher formulario. Tenho duvidas de como preencher formulario. Tenho duvidas de como preencher formulario. Tenho duvidas de como preencher formulario. '
        cy.get('#firstName').type('Fulano', {delay : 0})
        cy.get('#lastName').type('de Tal', {delay : 0})
        cy.get('#email').type('fulano@detal.com', {delay : 0})
        cy.get('#open-text-area').type(longText, {delay : 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        
    })

    it('EX.3 exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() { // caso de teste
        cy.get('#firstName').type('Fulano', {delay : 0})
        cy.get('#lastName').type('de Tal', {delay : 0})
        cy.get('#email').type('fulanodetal.com', {delay : 0})
        cy.get('#open-text-area').type('Tenho duvidas de como preencher formulario.', {delay : 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })            

    it('EX.4 campo telefone continua vazio quando preenchido valor não numé numérico', function() { // caso de teste
        cy.get('#firstName').type('Fulano', {delay : 0})
        cy.get('#lastName').type('de Tal', {delay : 0})
        cy.get('#open-text-area').type('Tenho duvidas de como preencher formulario.', {delay : 0})
        cy.get('#email').type('fulano@detal.com', {delay : 0})
        cy.contains('button', 'Enviar').click()
    
        cy.get('#phone')
            .type('abcdfeg')
            .should('have.value','')
            .should('not.have.text')
    })

    it('EX.5 exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() { // caso de teste
        cy.get('#firstName').type('Fulano', {delay : 0})
        cy.get('#lastName').type('de Tal', {delay : 0})
        cy.get('#email').type('fulano@detal.com', {delay : 0})
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Tenho duvidas de como preencher formulario.', {delay : 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('EX.6 preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Fulano', {delay : 0})
            .should('have.value', 'Fulano')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('de Tal', {delay : 0})
            .should('have.value', 'de Tal')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('fulano@detal.com', {delay : 0})
            .should('have.value', 'fulano@detal.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('987654321', {delay : 0})
            .should('have.value', '987654321')
            .clear()
            .should('have.value', '')
    
    })

    it('EX.7 exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('EX.2.1 seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('EX.2.2 seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('EX.2.3 seleciona um produto Blog) por seu índice', function(){
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('EX.3.1 marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('be.checked')
            .should('have.value','feedback')
    })

    it('EX.3.2 marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')

        })
    })

    it('EX.4.1 marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
            .as('checkboxes')
            .check()

        cy.get('input[type="checkbox"]')            
            .each(function($checkbox) {
                cy.wrap($checkbox).check()
                cy.wrap($checkbox).should('be.checked')
            })
            .last().uncheck().should('not.be.checked')

        //OU

        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')

    })

    it('EX.4.2 exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() { // caso de teste
        cy.get('#firstName').type('Fulano', {delay : 0})
        cy.get('#lastName').type('de Tal', {delay : 0})
        cy.get('#email').type('fulano@detal.com', {delay : 0})
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Tenho duvidas de como preencher formulario.', {delay : 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('EX.5.1 seleciona um arquivo da pasta fixtures', function() { // caso de teste
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                // console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })    

    it('EX.5.2 seleciona um arquivo simulando um drag-and-drop', function() { // caso de teste
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input){
                // console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('EX.5.3 sseleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() { // caso de teste
        //criando um alias para o arquivo
        cy.fixture('example.json').as('exampleFile')
        
        cy.get('input[type="file"]')
            .selectFile('@exampleFile')
            .should(function($input){
                // console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('EX.6.1 verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
        
    })

    it('EX.6.2 acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('CAC TAT - Política de privacidadeEEEEEEEEEEEEE').should('be.visible')
        
    })

    it('EX.6.3 testa a página da política de privacidade de forma independente', function() {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    })


})