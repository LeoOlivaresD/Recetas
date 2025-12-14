import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';

describe('App Component - Test de Configuración', () => {
  it('debería renderizar la página Home correctamente', () => {
    // Renderizamos App directamente, ya que AppRoutes contiene el Router
    render(<App />);

    // Verificamos que cargue el título de tu aplicación
    expect(screen.getByText(/Recetario Maestro/i)).toBeInTheDocument();
  });
});