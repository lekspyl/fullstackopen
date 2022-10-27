describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Oleksandr Pylypenko',
      username: 'lekspyl',
      password: 'testing123'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('lekspyl')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'wrong credentials')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .should('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Oleksandr Pylypenko logged in')
  })

  it('user can log in', function() {
    cy.contains('login').click()
    cy.get('#username').type('lekspyl')
    cy.get('#password').type('testing123')
    cy.get('#login-button').click()

    cy.contains('Oleksandr Pylypenko logged in')
  })

  describe('when logged in', function() {
    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.login({ username: 'lekspyl', password: 'testing123' })
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can be made important', function () {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })
  })

})
