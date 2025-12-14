import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';
import { server } from '../mocks/server';
import { beforeAll, afterEach, afterAll, describe, it, expect } from 'vitest';

// Configuración de MSW
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Home Page', () => {
  it('renderiza correctamente el título y la estructura', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Verifica textos principales definidos en Home.jsx (Versión Recetas)
    expect(screen.getByText(/Recetario Maestro/i)).toBeInTheDocument();
    expect(screen.getByText(/Explora, cocina y guarda tus sabores favoritos/i)).toBeInTheDocument();
    
    // Espera a que carguen los datos (probando integración con EventList)
    expect(await screen.findByText('Cazuela de Vacuno')).toBeInTheDocument();
  });
});