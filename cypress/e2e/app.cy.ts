// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

// Cypress E2E Test
import { nanoid } from 'nanoid'

describe('Navigation', () => {
  it('should navigate to the about page', () => {
    const myTodo = `My todo ${nanoid()}`

    cy.visit('http://localhost:3000/')

    cy.get('a[href*="/planetscale"]').first().click()

    cy.url().should('include', '/planetscale')

    cy.get('h2').contains('To do')

    cy.get('textarea').type(myTodo)

    cy.get('button').contains('Save').click()

    cy.contains('[data-testid="todo-card"]', myTodo)
      .first()
      .find('[data-testid="button-done"]')
      .click()

    cy.get('[data-testid="button-delete"]').first().click()
  })
})

// Prevent TypeScript from reading file as legacy script
export {}
