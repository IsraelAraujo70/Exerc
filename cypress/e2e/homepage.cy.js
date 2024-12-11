///<reference types="cypress" />
describe('homepage', () => {
  beforeEach(()=>{
    const url = 'https://agenda-contatos-react.vercel.app'
    cy.visit(url)
  })
  it('Testa o carregamento da página', () => {
    cy.get('h1').should('contain.text', 'Agenda de  contatos')
  })
  it('Testa se os campos de adicionar contato estão funcionando e se os botões de edição e exclusão estão funcionando', () => {
    // Pega os campos de adicionar contato
    cy.get('[type="text"]').type('Nome teste')
    cy.get('[type="email"]').type('teste@teste.com')
    cy.get('[type="tel"]').type('999999999')

    //Pega o tamanho do array de contatos
    cy.get('.sc-iAEyYk').children().then(($children) => {
      const numeroDeContatos = $children.length
      const numeroDeContatosAntigo = numeroDeContatos

      //Adiciona um contato
      cy.get('.adicionar').click()

      //Verifica o tamanho do array de contatos após a adição
      cy.get('.sc-iAEyYk').children().should('have.length', numeroDeContatosAntigo + 1)

      //Verifica se o contato foi adicionado corretamente
      cy.get('.sc-iAEyYk').children().eq(numeroDeContatos).find(':nth-child(1)').should('contain.text', 'Nome teste')

      //Procura o botão de edição daquele contato e clica nele
      cy.get('.sc-iAEyYk').children().eq(numeroDeContatos).within(() => {
        cy.get('button.edit').click()
      })

      //Verifica se o botão de Salvar foi exibido
      cy.get('.alterar').should('be.visible')

      //Altera o nome do contatro
      cy.get('[type="text"]').clear()
      cy.get('[type="text"]').type('Nome alterado')
      cy.get('.alterar').click()

      //Verifica se o nome do contato foi alterado
      cy.get('.sc-iAEyYk').children().eq(numeroDeContatos).find(':nth-child(1)').should('contain.text', 'Nome alterado')

      //Exclui o contato
      cy.get('.sc-iAEyYk').children().eq(numeroDeContatos).within(() => {
        cy.get('button.delete').click()
      })

      //Verifica se o contato foi excluído
      cy.get('.sc-iAEyYk').children().should('have.length', numeroDeContatosAntigo)
    })
  })
})
