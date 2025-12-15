import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { server } from '../mocks/server';

// Mock de Apollo Client antes de importar el componente
vi.mock('@apollo/client/react', () => ({
  useQuery: vi.fn(),
  ApolloProvider: ({ children }) => children,
}));

// Importar después del mock
import RecipePage from './RecipePage';
import { useQuery } from '@apollo/client/react';

// Configuración de MSW
beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
});
afterAll(() => server.close());

// Datos mock de una receta
const mockReceta = {
  id: 1,
  titulo: "Cazuela de Vacuno",
  dificultad: "Media",
  categoria: "Platos Principales",
  descripcion: "Un clásico plato chileno ideal para el invierno.",
  ingredientes: "Posta negra, papas, zapallo, choclo, porotos verdes, arroz",
  metodo: "Cocer la carne con verduras, agregar papas y zapallo, finalmente el choclo y arroz.",
  tiempo: "90 min",
  precio: 8000,
  imagen: "images/cazuela.jpeg"
};

describe('RecipePage Component (Detalle de Receta)', () => {
  it('renderiza correctamente el componente RecipePage', async () => {
    // Configurar el mock de useQuery para este test
    useQuery.mockReturnValue({
      loading: false,
      error: null,
      data: { receta: mockReceta }
    });

    render(
      <MemoryRouter initialEntries={['/evento/1']}>
        <Routes>
          <Route path="/evento/:id" element={<RecipePage />} />
        </Routes>
      </MemoryRouter>
    );

    // Esperar y verificar que se renderice el título
    await waitFor(() => {
      expect(screen.getByText('Cazuela de Vacuno')).toBeInTheDocument();
    });
  });

  it('muestra el botón de guardar receta', async () => {
    useQuery.mockReturnValue({
      loading: false,
      error: null,
      data: { receta: mockReceta }
    });

    render(
      <MemoryRouter initialEntries={['/evento/1']}>
        <Routes>
          <Route path="/evento/:id" element={<RecipePage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Guardar Receta/i)).toBeInTheDocument();
    });
  });

  it('muestra el enlace para volver a la lista', async () => {
    useQuery.mockReturnValue({
      loading: false,
      error: null,
      data: { receta: mockReceta }
    });

    render(
      <MemoryRouter initialEntries={['/evento/1']}>
        <Routes>
          <Route path="/evento/:id" element={<RecipePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Volver a Recetas/i)).toBeInTheDocument();
  });
});