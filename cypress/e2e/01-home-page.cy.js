describe('Home Page - Lista de Recetas', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Debería cargar la página principal correctamente', () => {
    // Verificar que el título principal esté presente
    cy.contains('Recetario Maestro').should('be.visible')
    cy.contains('Explora, cocina y guarda tus sabores favoritos').should('be.visible')
  })

  it('Debería mostrar al menos 4 recetas en cards', () => {
    // Esperar a que carguen las recetas
    cy.get('.card', { timeout: 10000 }).should('have.length.at.least', 4)
    
    // Verificar que cada card tenga los elementos esperados
    cy.get('.card').first().within(() => {
      cy.get('.card-header').should('exist')
      cy.get('.card-body').should('exist')
      cy.get('.card-footer').should('exist')
      cy.contains('Ver Detalles').should('be.visible')
    })
  })

  it('Debería mostrar información de las recetas en las cards', () => {
    // Verificar que se muestren las recetas conocidas
    cy.contains('Cazuela de Vacuno').should('be.visible')
    cy.contains('Charquicán').should('be.visible')
    cy.contains('Leche Asada').should('be.visible')
    cy.contains('Empanadas de Pino').should('be.visible')
  })

  it('Debería mostrar el badge de API REST', () => {
    cy.contains('Datos cargados con: REST API').should('be.visible')
  })
})
