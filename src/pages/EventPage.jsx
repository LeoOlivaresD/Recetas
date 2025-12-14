import { useParams, Link } from 'react-router-dom';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { useState, useEffect } from 'react';

// Datos mock para producción (mismos que en handlers.js)
const recetasMock = [
  {
    id: 1,
    titulo: "Cazuela de Vacuno",
    dificultad: "Media",
    categoria: "Platos Principales",
    fecha: "2023-10-01",
    descripcion: "Un clásico plato chileno ideal para el invierno.",
    ingredientes: "Posta negra, papas, zapallo, choclo, porotos verdes, arroz",
    metodo: "Cocer la carne con verduras, agregar papas y zapallo, finalmente el choclo y arroz.",
    tiempo: "90 min",
    precio: 8000,
    imagen: "/Recetas/images/cazuela.jpej"
  },
  {
    id: 2,
    titulo: "Charquicán",
    dificultad: "Fácil",
    categoria: "Platos Principales",
    fecha: "2023-10-02",
    descripcion: "Guiso tradicional a base de zapallo y papas.",
    ingredientes: "Charqui o carne molida, papas, zapallo, acelga, cebolla",
    metodo: "Sofreír cebolla y carne, agregar papas y zapallo cocidos y molidos, finalizar con acelga.",
    tiempo: "45 min",
    precio: 5000,
    imagen: "/Recetas/images/charquican.jpeg"
  },
  {
    id: 3,
    titulo: "Leche Asada",
    dificultad: "Fácil",
    categoria: "Postres",
    fecha: "2023-10-03",
    descripcion: "Postre de leche y huevos horneado con caramelo.",
    ingredientes: "Leche, huevos, azúcar, vainilla",
    metodo: "Batir ingredientes, verter sobre molde caramelizado y hornear a baño maría.",
    tiempo: "60 min",
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
    ingredientes: "Harina, carne picada, cebolla, huevo duro, aceitunas, pasas",
    metodo: "Preparar el pino el día anterior. Hacér la masa, rellenar y hornear.",
    tiempo: "120 min",
    precio: 2000,
    imagen: "/Recetas/images/empanadas.avif"
  }
];

const isDevelopment = import.meta.env.DEV;

// Definir la query de GraphQL adaptada a Recetas
const GET_RECETA = gql`
  query GetRecetaById($id: Int!) {
    receta(id: $id) {
      id
      titulo
      categoria
      dificultad
      descripcion
      ingredientes
      metodo
      tiempo
      precio
      imagen
    }
  }
`;

export default function EventPage() {
  const { id } = useParams();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [guardadoExitoso, setGuardadoExitoso] = useState(false);

  // Estado para producción
  const [cargandoProd, setCargandoProd] = useState(!isDevelopment);
  const [recetaProd, setRecetaProd] = useState(null);
  const [errorProd, setErrorProd] = useState(null);

  // Usar Apollo Client solo en desarrollo
  const { loading: cargandoApollo, error: errorApollo, data: dataApollo } = isDevelopment 
    ? useQuery(GET_RECETA, { variables: { id: parseInt(id) } })
    : { loading: false, error: null, data: null };

  // Cargar datos en producción
  useEffect(() => {
    if (!isDevelopment) {
      const cargarReceta = async () => {
        setCargandoProd(true);
        await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
        
        const recetaEncontrada = recetasMock.find(r => r.id === parseInt(id));
        if (recetaEncontrada) {
          setRecetaProd(recetaEncontrada);
          setErrorProd(null);
        } else {
          setErrorProd({ message: 'Receta no encontrada' });
        }
        setCargandoProd(false);
      };
      
      cargarReceta();
    }
  }, [id]);

  // Determinar valores finales según el modo
  const cargando = isDevelopment ? cargandoApollo : cargandoProd;
  const error = isDevelopment ? errorApollo : errorProd;
  const receta = isDevelopment ? dataApollo?.receta : recetaProd;

  const handleGuardar = () => {
    setGuardadoExitoso(true);
    setTimeout(() => {
      setMostrarModal(false);
      setGuardadoExitoso(false);
    }, 2000);
  };

  if (cargando) return (
    <div className="d-flex justify-content-center align-items-center min-vh-100" style={{
      background: 'linear-gradient(180deg, #fff1eb 0%, #ace0f9 100%)' // Fondo más claro para recetas
    }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-vh-100 py-5" style={{
      background: 'linear-gradient(180deg, #fff1eb 0%, #ace0f9 100%)'
    }}>
      <div className="container">
        <div className="alert alert-danger" role="alert">
          Error: {error.message}
        </div>
      </div>
    </div>
  );
  
  if (!receta) return (
    <div className="min-vh-100 py-5" style={{
      background: 'linear-gradient(180deg, #fff1eb 0%, #ace0f9 100%)'
    }}>
      <div className="container">
        <div className="alert alert-warning" role="alert">
          Receta no encontrada
        </div>
      </div>
    </div>
  );

  return (
    <div style={{
      background: 'linear-gradient(180deg, #fff1eb 0%, #ace0f9 100%)',
      minHeight: '100vh',
      paddingTop: '40px',
      paddingBottom: '40px'
    }}>
      <div className="container">
        <Link to="/" className="btn btn-outline-dark mb-4" style={{
          transition: 'all 0.3s ease'
        }}>
          ← Volver a Recetas
        </Link>

        {/* Badge mostrando API usada */}
        <div className="mb-3" style={{ textAlign: 'center' }}>
          <span style={{
            background: 'rgba(245, 158, 11, 0.2)',
            border: '1px solid #f59e0b',
            color: '#b45309',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            🚀 Receta cargada con: GraphQL + Apollo Client {!isDevelopment && '(Producción)'}
          </span>
        </div>

        <div className="card shadow-lg border-0" style={{
          background: '#ffffff',
          borderRadius: '1.5rem',
          overflow: 'hidden'
        }}>
          <div className="card-header py-5" style={{
            background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
            color: 'white',
            borderRadius: '1.5rem 1.5rem 0 0'
          }}>
            <div className="d-flex justify-content-between align-items-start gap-3">
              <div>
                <h1 className="card-title mb-0" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                  {receta.titulo}
                </h1>
              </div>
              <span className="badge bg-white text-dark">{receta.categoria}</span>
            </div>
          </div>

          <div className="card-body p-5" style={{ color: '#333' }}>
            <p className="fs-5 mb-4 text-muted">
              {receta.descripcion}
            </p>

            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <div className="p-3 rounded border-start border-warning border-4" style={{
                  background: '#fff9f0'
                }}>
                  <strong className="d-block mb-2 text-dark">
                    ⏱️ Tiempo de Cocción
                  </strong>
                  <p className="mb-0 text-muted">
                    {receta.tiempo}
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 rounded border-start border-warning border-4" style={{
                  background: '#fff9f0'
                }}>
                  <strong className="d-block mb-2 text-dark">
                    🔥 Dificultad
                  </strong>
                  <p className={`mb-0 fw-bold ${
                    receta.dificultad === 'Fácil' ? 'text-success' : 
                    receta.dificultad === 'Media' ? 'text-warning' : 'text-danger'
                  }`}>
                    {receta.dificultad}
                  </p>
                </div>
              </div>
              <div className="col-12">
                <div className="p-3 rounded border-start border-info border-4" style={{
                  background: '#f0f9ff'
                }}>
                  <strong className="d-block mb-2 text-dark">
                    🥘 Ingredientes
                  </strong>
                  <p className="mb-0 text-muted">
                    {receta.ingredientes}
                  </p>
                </div>
              </div>
              <div className="col-12">
                <div className="p-3 rounded border-start border-success border-4" style={{
                  background: '#f0fff4'
                }}>
                  <strong className="d-block mb-2 text-dark">
                    👨‍🍳 Preparación
                  </strong>
                  <p className="mb-0 text-muted">
                    {receta.metodo}
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setMostrarModal(true)}
              className="btn btn-warning btn-lg w-100 text-white" 
              style={{
                background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
                border: 'none',
                marginTop: '2rem',
                fontWeight: '700',
                letterSpacing: '0.5px'
              }}
            >
              ❤️ Guardar Receta
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {mostrarModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
          }}>
            {!guardadoExitoso ? (
              <>
                <h3 className="text-center mb-4 text-dark">
                  ¿Guardar en tus favoritos?
                </h3>

                <p className="text-center text-muted mb-4">
                  Estás a punto de guardar <strong>{receta.titulo}</strong> en tu libro de recetas personal.
                </p>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => setMostrarModal(false)}
                    className="btn btn-outline-secondary flex-fill fw-bold"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleGuardar}
                    className="btn btn-warning text-white flex-fill fw-bold"
                    style={{
                      background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
                      border: 'none'
                    }}
                  >
                    Confirmar
                  </button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                  ✅
                </div>
                <h3 className="text-success mb-3">
                  ¡Receta Guardada!
                </h3>
                <p className="text-muted small">
                  Ahora podrás encontrarla en tu perfil.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}