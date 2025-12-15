describe('Modal de Guardar Receta', () => {
  beforeEach(() => {
    cy.visit('/')
    // Navegar a una receta
    cy.get('.card', { timeout: 10000 }).first().contains('Ver Detalles').click()
  })

  it('Debería abrir el modal al hacer clic en "Guardar Receta"', () => {
    // Hacer clic en el botón de guardar
    cy.contains('Guardar Receta').click()
    
    // Verificar que el modal se abre
    cy.contains('¿Guardar en tus favoritos?').should('be.visible')
    cy.contains('Estás a punto de guardar').should('be.visible')
    cy.contains('Cancelar').should('be.visible')
    cy.contains('Confirmar').should('be.visible')
  })

  it('Debería cerrar el modal al hacer clic en "Cancelar"', () => {
    // Abrir el modal
    cy.contains('Guardar Receta').click()
    cy.contains('¿Guardar en tus favoritos?').should('be.visible')
    
    // Cancelar
    cy.contains('Cancelar').click()
    
    // Verificar que el modal se cerró
    cy.contains('¿Guardar en tus favoritos?').should('not.exist')
  })

  it('Debería mostrar mensaje de éxito al confirmar guardado', () => {
    // Abrir el modal
    cy.contains('Guardar Receta').click()
    
    // Confirmar
    cy.contains('Confirmar').click()
    
    // Verificar mensaje de éxito
    cy.contains('¡Receta Guardada!', { timeout: 5000 }).should('be.visible')
    cy.contains('Ahora podrás encontrarla en tu perfil').should('be.visible')
  })
})
