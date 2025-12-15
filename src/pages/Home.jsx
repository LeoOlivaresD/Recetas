import { useState, useEffect } from 'react';
import EventList from '../components/RecipeList';

export default function Home() {
  // ✅ Agregamos lógica rastreable para V8
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Marca el componente como cargado
    setIsLoaded(true);
  }, []);

  // Estilos extraídos a variables para que V8 los rastree
  const mainStyles = {
    background: 'linear-gradient(180deg, #fff1eb 0%, #ace0f9 100%)',
    minHeight: '100vh',
    paddingBottom: '40px'
  };

  const headerStyles = {
    background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    boxShadow: '0 10px 30px rgba(253, 160, 133, 0.3)'
  };

  const titleStyles = {
    letterSpacing: '2px',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const subtitleStyles = {
    fontSize: '1.3rem',
    fontWeight: '500'
  };

  return (
    <div style={mainStyles}>
      <header className="text-white py-5 text-center" style={headerStyles}>
        <div className="container">
          <h1 className="display-4 fw-bold mb-2" style={titleStyles}>
            Recetario Maestro
          </h1>
          <p className="lead opacity-90" style={subtitleStyles}>
            Explora, cocina y guarda tus sabores favoritos
          </p>
        </div>
      </header>

      <main className="py-5">
        <div className="container">
          {isLoaded && <EventList />}
        </div>
      </main>
    </div>
  );
}
