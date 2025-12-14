import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EventList from './EventList';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';

// Configuración del ciclo de vida del servidor de pruebas
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('EventList Component', () => {
  it('muestra el indicador de carga inicialmente', () => {
    render(
      <BrowserRouter>
        <EventList />
      </BrowserRouter>
    );
    // Verificamos que aparezca el texto "Cargando..." (visually-hidden)
    expect(screen.getByText(/cargando/i)).toBeInTheDocument();
  });

  it('renderiza la lista de recetas correctamente desde la API', async () => {
    render(
      <BrowserRouter>
        <EventList />
      </BrowserRouter>
    );

    // Esperamos a que MSW responda y se muestren los datos
    // Buscamos el título de una de las recetas definidas en handlers.js
    const recetaTitulo = await screen.findByText('Cazuela de Vacuno');
    expect(recetaTitulo).toBeInTheDocument();

    // Verificamos que aparezcan otras recetas
    expect(await screen.findByText('Charquicán')).toBeInTheDocument();
    expect(await screen.findByText('Leche Asada')).toBeInTheDocument();
  });

  it('maneja errores del servidor correctamente', async () => {
    // Sobrescribimos el handler para forzar un error 500 solo en este test
    server.use(
      http.get('/api/recetas', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(
      <BrowserRouter>
        <EventList />
      </BrowserRouter>
    );

    // Esperamos a que aparezca el mensaje de error
    expect(await screen.findByText(/Error al cargar recetas/i)).toBeInTheDocument();
  });
});