import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';

// Datos de respaldo para producción (Recetas)
const recetasMock = [
  {
    id: 1,
    titulo: "Cazuela de Vacuno",
    dificultad: "Media",
    categoria: "Platos Principales",
    fecha: "2023-10-01",
    descripcion: "Un clásico plato chileno ideal para el invierno.",
    precio: 8000,
    imagen: "/Recetas/images/cazuela.jpeg"
  },
  {
    id: 2,
    titulo: "Charquicán",
    dificultad: "Fácil",
    categoria: "Platos Principales",
    fecha: "2023-10-02",
    descripcion: "Guiso tradicional a base de zapallo y papas.",
    precio: 5000,
    imagen: "/Recetas/images/charquican.jpg"
  },
  {
    id: 3,
    titulo: "Leche Asada",
    dificultad: "Fácil",
    categoria: "Postres",
    fecha: "2023-10-03",
    descripcion: "Postre de leche y huevos horneado con caramelo.",
    precio: 3000,
    imagen: "/Recetas/images/lecheAsada.jpg"
  },
  {
    id: 4,
    titulo: "Empanadas de Pino",
    dificultad: "Difícil",
    categoria: "Platos Principales",
    fecha: "2023-09-18",
    descripcion: "Masa rellena de pino de carne, cebolla, huevo y aceituna.",
    precio: 2000,
    imagen: "/Recetas/images/empanadas.avif"
  }
];

const isDevelopment = import.meta.env.DEV;

export default function RecipeList() {
  const [recetas, setRecetas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarRecetas = async () => {
      try {
        setCargando(true);
        
        if (isDevelopment) {
          // En desarrollo: usar MSW interceptando la ruta de recetas
          console.log('%c API: REST - Cargando recetas con MSW', 'color: #10b981; font-weight: bold; font-size: 12px');
          const response = await fetch('/api/recetas');
          if (!response.ok) {
            throw new Error('Error al cargar recetas');
          }
          const datos = await response.json();
          setRecetas(datos);
        } else {
          // En producción: usar datos mock directos
          console.log('%c API: REST - Modo producción (sin MSW)', 'color: #10b981; font-weight: bold; font-size: 12px');
          await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
          setRecetas(recetasMock);
        }
        
        console.log('%c API: REST - Datos cargados correctamente', 'color: #10b981; font-weight: bold; font-size: 12px');
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargarRecetas();
  }, []);

  if (cargando) return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="alert alert-danger" role="alert">
      Error: {error}
    </div>
  );

  return (
    <div>
      {/* Badge mostrando API usada */}
      <div className="mb-3" style={{ textAlign: 'center' }}>
        <span style={{
          background: 'rgba(16, 185, 129, 0.2)',
          border: '1px solid #10b981',
          color: '#10b981',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          📡 Datos cargados con: REST API {!isDevelopment && '(Producción)'}
        </span>
      </div>

      <div className="row g-4">
        {recetas.map(receta => (
          <div key={receta.id} className="col-lg-6 col-xl-4">
            <RecipeCard evento={receta} />
          </div>
        ))}
      </div>
    </div>
  );
}
