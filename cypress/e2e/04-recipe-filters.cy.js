describe('Exploración de Diferentes Recetas', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Debería mostrar recetas de diferentes categorías', () => {
    // Verificar que hay recetas de "Platos Principales"
    cy.contains('Platos Principales').should('be.visible')
    
    // Verificar que hay recetas de "Postres"
    cy.contains('Postres').should('be.visible')
  })

  it('Debería mostrar diferentes niveles de dificultad', () => {
    cy.get('.card', { timeout: 10000 }).should('have.length.at.least', 4)
    
    // Verificar que existen diferentes dificultades
    cy.contains('Fácil').should('exist')
    cy.contains('Media').should('exist')
    cy.contains('Difícil').should('exist')
  })

  it('Debería poder navegar entre diferentes recetas', () => {
    // Ver detalles de la primera receta
    cy.get('.card').eq(0).contains('Ver Detalles').click()
    cy.url().should('include', '/receta/1')
    
    // Volver y ver otra receta
    cy.contains('Volver a Recetas').click()
    cy.get('.card').eq(1).contains('Ver Detalles').click()
    cy.url().should('include', '/receta/2')
  })

  it('Debería mostrar precios aproximados en las recetas', () => {
    cy.get('.card', { timeout: 10000 }).first().within(() => {
      cy.contains('Precio aprox').should('be.visible')
      cy.contains('$').should('be.visible')
    })
  })
})
