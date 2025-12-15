import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
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

  //Test para estado de carga
  it('muestra el indicador de carga mientras se obtienen los datos', () => {
    useQuery.mockReturnValue({
      loading: true,
      error: null,
      data: null
    });

    render(
      <MemoryRouter initialEntries={['/evento/1']}>
        <Routes>
          <Route path="/evento/:id" element={<RecipePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  //Test para estado de error
  it('muestra un mensaje de error cuando falla la consulta', () => {
    useQuery.mockReturnValue({
      loading: false,
      error: { message: 'Error al cargar la receta' },
      data: null
    });

    render(
      <MemoryRouter initialEntries={['/evento/1']}>
        <Routes>
          <Route path="/evento/:id" element={<RecipePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Error: Error al cargar la receta/i)).toBeInTheDocument();
  });

  //Test para receta no encontrada
  it('muestra un mensaje cuando no se encuentra la receta', () => {
    useQuery.mockReturnValue({
      loading: false,
      error: null,
      data: null
    });

    render(
      <MemoryRouter initialEntries={['/evento/999']}>
        <Routes>
          <Route path="/evento/:id" element={<RecipePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Receta no encontrada/i)).toBeInTheDocument();
  });

  //Test para abrir el modal
  it('abre el modal al hacer clic en el botón Guardar Receta', async () => {
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
      expect(screen.getByText('Cazuela de Vacuno')).toBeInTheDocument();
    });

    const botonGuardar = screen.getByText(/Guardar Receta/i);
    fireEvent.click(botonGuardar);

    expect(screen.getByText(/¿Guardar en tus favoritos?/i)).toBeInTheDocument();
    expect(screen.getByText(/Estás a punto de guardar/i)).toBeInTheDocument();
  });

  //Test para cerrar el modal con cancelar
  it('cierra el modal al hacer clic en Cancelar', async () => {
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
      expect(screen.getByText('Cazuela de Vacuno')).toBeInTheDocument();
    });

    // Abrir modal
    const botonGuardar = screen.getByText(/Guardar Receta/i);
    fireEvent.click(botonGuardar);

    // Cerrar modal
    const botonCancelar = screen.getByText(/Cancelar/i);
    fireEvent.click(botonCancelar);

    await waitFor(() => {
      expect(screen.queryByText(/¿Guardar en tus favoritos?/i)).not.toBeInTheDocument();
    });
  });

    //Test para confirmar guardado
  it('muestra mensaje de éxito al confirmar guardado', async () => {
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
      expect(screen.getByText('Cazuela de Vacuno')).toBeInTheDocument();
    });

    // Abrir modal
    const botonGuardar = screen.getByRole('button', { name: /guardar receta/i });
    fireEvent.click(botonGuardar);

    await waitFor(() => {
      expect(screen.getByText(/¿Guardar en tus favoritos?/i)).toBeInTheDocument();
    });

    // Confirmar guardado
    const botonConfirmar = screen.getByRole('button', { name: /confirmar/i });
    fireEvent.click(botonConfirmar);

    // Verificar mensaje de éxito
    await waitFor(() => {
      expect(screen.getByText(/¡Receta Guardada!/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

    //Test para verificar todos los campos de la receta
  it('renderiza todos los detalles de la receta correctamente', async () => {
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
      expect(screen.getByText('Cazuela de Vacuno')).toBeInTheDocument();
    });

    // Verificar campos principales
    expect(screen.getByText('Platos Principales')).toBeInTheDocument();
    expect(screen.getByText('Un clásico plato chileno ideal para el invierno.')).toBeInTheDocument();
    expect(screen.getByText('90 min')).toBeInTheDocument();
    expect(screen.getByText('Media')).toBeInTheDocument();
    
    // Verificar ingredientes y método (texto parcial)
    expect(screen.getByText(/Posta negra/i)).toBeInTheDocument();
    expect(screen.getByText(/Cocer la carne/i)).toBeInTheDocument();
  });

  //Test para diferentes niveles de dificultad
  it('muestra el color correcto según la dificultad', async () => {
    const recetaFacil = { ...mockReceta, dificultad: 'Fácil' };
    
    useQuery.mockReturnValue({
      loading: false,
      error: null,
      data: { receta: recetaFacil }
    });

    const { unmount } = render(
      <MemoryRouter initialEntries={['/evento/1']}>
        <Routes>
          <Route path="/evento/:id" element={<RecipePage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Cazuela de Vacuno')).toBeInTheDocument();
    });

    const dificultad = screen.getByText('Fácil');
    expect(dificultad).toHaveClass('text-success');

    unmount();

    // Test con dificultad Difícil
    const recetaDificil = { ...mockReceta, dificultad: 'Difícil' };
    useQuery.mockReturnValue({
      loading: false,
      error: null,
      data: { receta: recetaDificil }
    });

    render(
      <MemoryRouter initialEntries={['/evento/1']}>
        <Routes>
          <Route path="/evento/:id" element={<RecipePage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const dificultadDificil = screen.getByText('Difícil');
      expect(dificultadDificil).toHaveClass('text-danger');
    });
  });
});
