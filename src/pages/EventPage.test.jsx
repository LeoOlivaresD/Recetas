import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import EventPage from './EventPage';
import { server } from '../mocks/server';
import { graphql, HttpResponse } from 'msw';

// Configurar Apollo Client para pruebas
const createTestClient = () => {
  return new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:3000/graphql', fetch }),
    cache: new InMemoryCache({ addTypename: false }),
  });
};

// Configuración de MSW
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('EventPage Component (Detalle de Receta)', () => {
  it('muestra el estado de carga inicialmente', () => {
    render(
      <ApolloProvider client={createTestClient()}>
        <MemoryRouter initialEntries={['/evento/1']}>
          <Routes>
            <Route path="/evento/:id" element={<EventPage />} />
          </Routes>
        </MemoryRouter>
      </ApolloProvider>
    );
    // Verificamos el spinner o texto de carga
    expect(screen.getByText(/cargando/i)).toBeInTheDocument();
  });

  it('renderiza correctamente los detalles de la receta desde GraphQL', async () => {
    render(
      <ApolloProvider client={createTestClient()}>
        <MemoryRouter initialEntries={['/evento/1']}>
          <Routes>
            <Route path="/evento/:id" element={<EventPage />} />
          </Routes>
        </MemoryRouter>
      </ApolloProvider>
    );

    // Esperar a que aparezca el título (definido en handlers.js)
    expect(await screen.findByText('Cazuela de Vacuno')).toBeInTheDocument();
    
    // Verificar detalles específicos
    expect(screen.getByText('Media')).toBeInTheDocument();
    expect(screen.getByText(/90 min/)).toBeInTheDocument();
  });

  it('maneja el error cuando la receta no existe', async () => {
    // Forzamos error en MSW
    server.use(
      graphql.query('GetRecetaById', () => {
        return HttpResponse.json({ errors: [{ message: 'Receta no encontrada' }] });
      })
    );

    render(
      <ApolloProvider client={createTestClient()}>
        <MemoryRouter initialEntries={['/evento/999']}>
          <Routes>
            <Route path="/evento/:id" element={<EventPage />} />
          </Routes>
        </MemoryRouter>
      </ApolloProvider>
    );

    // Esperamos el mensaje de error
    expect(await screen.findByText(/Error:/i)).toBeInTheDocument();
  });
});