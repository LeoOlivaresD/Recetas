import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Home from './pages/Home';

describe('App Component - Test de Configuración', () => {
  it('debería renderizar la página Home correctamente', async () => {
    // Renderizamos Home directamente envuelto en MemoryRouter
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    // Esperamos a que cargue el contenido (ya que hay llamada asíncrona)
    const titulo = await screen.findByText(/Recetario Maestro/i);
    expect(titulo).toBeInTheDocument();
  });
});