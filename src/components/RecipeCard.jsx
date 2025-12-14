import { Link } from 'react-router-dom';

export default function EventCard({ evento: receta }) {
  // Nota: Recibimos la prop como 'evento' (desde el padre) 
  // pero la renombramos a 'receta' internamente para mayor claridad en este componente.

  return (
    <div className="card h-100 shadow-sm border-0 transition-transform overflow-hidden">
      {/* Imagen */}
      <div className="position-relative overflow-hidden" style={{ height: '200px', background: '#f0f0f0' }}>
        {receta.imagen ? (
          <img 
            src={receta.imagen} 
            alt={receta.titulo}
            className="w-100 h-100"
            style={{ 
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              display: 'block'
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextElementSibling) {
                e.target.nextElementSibling.style.display = 'flex';
              }
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
        ) : null}
        
        {/* Placeholder si la imagen no carga */}
        <div 
          className="w-100 h-100 d-flex align-items-center justify-content-center bg-gradient text-white fw-bold"
          style={{ display: receta.imagen ? 'none' : 'flex', fontSize: '2rem' }}
        >
          {receta.titulo.substring(0, 1)}
        </div>

        <div className="position-absolute top-0 end-0 p-2">
          <span className="badge bg-light text-dark">{receta.categoria}</span>
        </div>
      </div>

      {/* Header con título */}
      <div className="card-header bg-gradient text-white">
        <h5 className="card-title mb-0">{receta.titulo}</h5>
      </div>
      
      {/* Body */}
      <div className="card-body">
        <p className="card-text text-muted mb-3">{receta.descripcion}</p>
        
        <div className="event-info">
          <p className="mb-2">
            <strong>🔥 Dificultad:</strong> <span className={
              receta.dificultad === 'Fácil' ? 'text-success' : 
              receta.dificultad === 'Media' ? 'text-warning' : 'text-danger'
            }>{receta.dificultad}</span>
          </p>
          <p className="mb-0"><strong>💰 Precio aprox:</strong> ${receta.precio}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="card-footer bg-white border-top">
        {/* Mantenemos el link a /evento/ por ahora para no romper la navegación hasta el siguiente paso */}
        <Link to={`/evento/${receta.id}`} className="btn btn-primary btn-sm w-100">
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}