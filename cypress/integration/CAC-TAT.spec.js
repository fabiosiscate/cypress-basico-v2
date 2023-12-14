// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test


/// <reference types="Cypress" />
import '../support'


describe('Central de Atendimento ao Cliente TAT', function() { //suite de teste
    const THREE_SECONDS_IN_MS = 3000
    beforeEach( function(){
        cy.visit('../../src/index.html')
    })


    it('EX.1 verifica o título da aplicação', function() { // caso de teste
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('EX.2 preenche os campos obrigatórios e envia o formulário', function() { // caso de teste
        cy.clock()
        const longText = 'Tenho duvidas de como preencher formulario. Tenho duvidas de como preencher formulario. Tenho duvidas de como preencher formulario. Tenho duvidas de como preencher formulario. Tenho duvidas de como preencher formulario. Tenho duvidas de como preencher formulario. Tenho duvidas de como preencher formulario. '
        cy.get('#firstName').type('Fulano', {delay : 0})
        cy.get('#lastName').type('de Tal', {delay : 0})
        cy.get('#email').type('fulano@detal.com', {delay : 0})
        cy.get('#open-text-area').type(longText, {delay : 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
        
    })

    it('EX.3 exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() { // caso de teste
        cy.clock()
        cy.get('#firstName').type('Fulano', {delay : 0})
        cy.get('#lastName').type('de Tal', {delay : 0})
        cy.get('#email').type('fulanodetal.com', {delay : 0})
        cy.get('#open-text-area').type('Tenho duvidas de como preencher formulario.', {delay : 0})
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
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
        cy.clock()
        cy.get('#firstName').type('Fulano', {delay : 0})
        cy.get('#lastName').type('de Tal', {delay : 0})
        cy.get('#email').type('fulano@detal.com', {delay : 0})
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Tenho duvidas de como preencher formulario.', {delay : 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
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
        cy.clock()
        cy.get('button[type="submit"]').click()
        
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
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
        cy.clock()
        cy.get('#firstName').type('Fulano', {delay : 0})
        cy.get('#lastName').type('de Tal', {delay : 0})
        cy.get('#email').type('fulano@detal.com', {delay : 0})
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Tenho duvidas de como preencher formulario.', {delay : 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
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

    it('EX.5.3 seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() { // caso de teste
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
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
        
    })

    it('EX.6.3 testa a página da política de privacidade de forma independente', function() {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    })

    Cypress._.times(5, () => {
        it('EX.7.1 exibe mensagem por 3 segundos', function() {
            cy.clock() // congela o relógio do navegador

            // (...) // ação que dispara algo que exibe uma mensagem por três segundos
            cy.contains('button', 'Enviar').click()

            // (...) // verificação de que a mensagem está visível
            cy.get('.error').should('be.visible')
            
            // avança o relógio três segundos (em milissegundos). Avanço este tempo para não perdê-lo esperando.
            cy.tick(3000) 

            // (...) // verificação de que a mensagem não está mais visível
            cy.get('.error').should('not.be.visible')


            cy.clock()
            cy.get('#firstName').type('Fulano', {delay : 0})
            cy.get('#lastName').type('de Tal', {delay : 0})
            cy.get('#email').type('fulano@detal.com', {delay : 0})
            cy.get('#open-text-area').type('Tenho duvidas de como preencher formulario.', {delay : 0})
            cy.contains('button', 'Enviar').click()

            cy.get('.success').should('be.visible')
            cy.tick(3000)
            cy.get('.success').should('not.be.visible')
            
        })
    })

    it('EX.7.2 exibe e esconde as mensagens de sucesso e erro usando o .invoke',  function() {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    it('EX.7.3 preenche a area de texto usando o comando invoke', function() {
        const longText = Cypress._.repeat('0123456789', 20)
        
        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)

    });

    it('EX.7.4 faz uma requisicao HTTP', function() {
        
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html') //GET é padrão do request
            .should(function(response) {
                const { status, statusText, body } = response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
            })
        // //SOLUÇÃO FABIO
        // cy.request({
        //     method: 'GET',
        //     url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
        // }).then((response) => {
        //     expect(response.status).to.equal(200)
        //     expect(response.statusText).to.equal('OK')
        //     expect(response.body).contains('CAC TAT')
        // })
    });

    it('EX.8.1 ACHE O GATO', function()  {
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
        cy.get('#title')
            .invoke('text', 'CAT TAT')    
        cy.get('#subtitle')
            .invoke('text', 'TESTE ZD')
    });
    
})