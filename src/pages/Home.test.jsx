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
    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Verifica que el componente se renderizó
    expect(container.firstChild).toBeInTheDocument();

    // Verifica textos principales definidos en Home.jsx
    expect(screen.getByText(/Recetario Maestro/i)).toBeInTheDocument();
    expect(screen.getByText(/Explora, cocina y guarda tus sabores favoritos/i)).toBeInTheDocument();
    
    // Verifica que el header existe
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    
    // Verifica que el main existe
    const mainElement = container.querySelector('main');
    expect(mainElement).toBeInTheDocument();
    
    // Espera a que carguen los datos (probando integración con RecipeList)
    expect(await screen.findByText('Cazuela de Vacuno')).toBeInTheDocument();
  });

  it('renderiza el header con título y subtítulo', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Verifica el título principal
    const titulo = screen.getByText('Recetario Maestro');
    expect(titulo).toBeInTheDocument();
    expect(titulo.tagName).toBe('H1');

    // Verifica el subtítulo
    const subtitulo = screen.getByText('Explora, cocina y guarda tus sabores favoritos');
    expect(subtitulo).toBeInTheDocument();
  });

  it('renderiza el contenedor principal con la estructura correcta', () => {
    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Verifica que existe el div principal
    const mainDiv = container.firstChild;
    expect(mainDiv).toBeInTheDocument();
    expect(mainDiv.tagName).toBe('DIV');

    // Verifica que existe el header
    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();

    // Verifica que existe el main
    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();

    // Verifica que el container está dentro de main
    const containerDiv = main.querySelector('.container');
    expect(containerDiv).toBeInTheDocument();
  });
});
