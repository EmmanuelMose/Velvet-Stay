describe('localhost(backend)', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })
}),
describe('localhost(frontend)', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173')
  })
})

