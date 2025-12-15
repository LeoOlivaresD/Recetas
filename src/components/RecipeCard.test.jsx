import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import { describe, it, expect } from 'vitest';

// Datos mock de una receta para las pruebas
const mockReceta = {
  id: 1,
  titulo: "Cazuela de Vacuno",
  dificultad: "Media",
  categoria: "Platos Principales",
  fecha: "2023-10-01",
  descripcion: "Un clásico plato chileno.",
  precio: 8000,
  imagen: "cazuela.jpg"
};

describe('RecipeCard Component', () => {
  it('renderiza correctamente la información de la receta', () => {
    render(
      <BrowserRouter>
        <RecipeCard evento={mockReceta} />
      </BrowserRouter>
    );

    // Verificar Título
    expect(screen.getByText('Cazuela de Vacuno')).toBeInTheDocument();
    
    // Verificar Descripción
    expect(screen.getByText('Un clásico plato chileno.')).toBeInTheDocument();

    // Verificar Dificultad
    expect(screen.getByText('Media')).toBeInTheDocument();
    
    // Verificar Categoría
    expect(screen.getByText('Platos Principales')).toBeInTheDocument();

    // Verificar Precio
    expect(screen.getByText(/\$8000/)).toBeInTheDocument();
    
    // Verificar que el enlace apunta a la ruta correcta
    const link = screen.getByRole('link', { name: /ver detalles/i });
    expect(link).toHaveAttribute('href', '/receta/1');
  });

  it('renderiza el placeholder cuando no hay imagen', () => {
    const recetaSinImagen = { ...mockReceta, imagen: null };
    render(
      <BrowserRouter>
        <RecipeCard evento={recetaSinImagen} />
      </BrowserRouter>
    );
    
    // Debería mostrar la inicial del título como placeholder
    expect(screen.getByText('C')).toBeInTheDocument();
  });
  
  it('aplica la clase de color correcta según la dificultad', () => {
    // Caso Dificultad Fácil
    const { unmount } = render(
      <BrowserRouter>
        <RecipeCard evento={{ ...mockReceta, dificultad: 'Fácil' }} />
      </BrowserRouter>
    );
    expect(screen.getByText('Fácil')).toHaveClass('text-success');
    unmount();

    // Caso Dificultad Difícil
    render(
      <BrowserRouter>
        <RecipeCard evento={{ ...mockReceta, dificultad: 'Difícil' }} />
      </BrowserRouter>
    );
    expect(screen.getByText('Difícil')).toHaveClass('text-danger');
  });

  //Cubre event handlers de la imagen
  it('maneja el evento onError de la imagen correctamente', () => {
    render(
      <BrowserRouter>
        <RecipeCard evento={mockReceta} />
      </BrowserRouter>
    );

    const imagen = screen.getByAltText('Cazuela de Vacuno');
    
    // Simular error de carga de imagen
    fireEvent.error(imagen);
    
    // Verificar que la imagen se oculta
    expect(imagen.style.display).toBe('none');
  });

  it('maneja los eventos hover de la imagen correctamente', () => {
    render(
      <BrowserRouter>
        <RecipeCard evento={mockReceta} />
      </BrowserRouter>
    );

    const imagen = screen.getByAltText('Cazuela de Vacuno');
    
    // Verificar estado inicial
    expect(imagen.style.transform).toBe('');
    
    // Simular mouse enter
    fireEvent.mouseEnter(imagen);
    expect(imagen.style.transform).toBe('scale(1.1)');
    
    // Simular mouse leave
    fireEvent.mouseLeave(imagen);
    expect(imagen.style.transform).toBe('scale(1)');
  });
});
