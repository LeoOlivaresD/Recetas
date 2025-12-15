describe('Navegación a Detalles de Receta', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.wait(2000)  // Esperar a que cargue MSW
  })

  it('Debería navegar a los detalles de una receta al hacer clic en "Ver Detalles"', () => {
    // Esperar a que carguen las recetas
    cy.contains('Cazuela de Vacuno', { timeout: 10000 }).should('be.visible')
    
    // Hacer clic en el primer botón "Ver Detalles"
    cy.get('.card').first().contains('Ver Detalles').click()
    
    // Verificar que estamos en la página de detalles
    cy.url().should('include', '/receta/')
    cy.contains('Cazuela de Vacuno', { timeout: 10000 }).should('be.visible')
  })

  it('Debería mostrar todos los detalles de la receta', () => {
    // Navegar a una receta específica
    cy.get('.card', { timeout: 10000 }).first().contains('Ver Detalles').click()
    
    // Verificar todos los elementos de detalle
    cy.contains('Tiempo de Cocción', { timeout: 10000 }).should('be.visible')
    cy.contains('Dificultad').should('be.visible')
    cy.contains('Ingredientes').should('be.visible')
    cy.contains('Preparación').should('be.visible')
    cy.contains('Guardar Receta').should('be.visible')
  })

  it('Debería poder volver a la lista de recetas', () => {
    // Navegar a detalles
    cy.get('.card', { timeout: 10000 }).first().contains('Ver Detalles').click()
    cy.wait(1000)
    
    // Hacer clic en volver
    cy.contains('Volver a Recetas').click()
    
    // Verificar que estamos de vuelta en home
    cy.url().should('eq', Cypress.config().baseUrl)  // ✅ Sin el '/' extra
    cy.contains('Recetario Maestro', { timeout: 10000 }).should('be.visible')
  })
})
