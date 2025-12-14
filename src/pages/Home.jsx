import EventList from '../components/RecipeList';

export default function Home() {
  return (
    <div style={{
      background: 'linear-gradient(180deg, #fff1eb 0%, #ace0f9 100%)', // Fondo claro y cálido
      minHeight: '100vh',
      paddingBottom: '40px'
    }}>
      <header className="text-white py-5 text-center" style={{
        background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', // Gradiente Naranja/Dorado
        boxShadow: '0 10px 30px rgba(253, 160, 133, 0.3)'
      }}>
        <div className="container">
          <h1 className="display-4 fw-bold mb-2" style={{ 
            letterSpacing: '2px',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Recetario Maestro
          </h1>
          <p className="lead opacity-90" style={{ fontSize: '1.3rem', fontWeight: '500' }}>
            Explora, cocina y guarda tus sabores favoritos
          </p>
        </div>
      </header>

      <main className="py-5">
        <div className="container">
          {/* Mantenemos el componente EventList, que ya modificamos para mostrar recetas */}
          <EventList />
        </div>
      </main>
    </div>
  );
}