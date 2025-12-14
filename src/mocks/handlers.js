import { http, HttpResponse, delay, graphql } from 'msw';

// Datos mock de Recetas
// Cumple con: Título, dificultad, categoría (REST) y detalles (GraphQL)
const recetas = [
  {
    id: 1,
    titulo: "Cazuela de Vacuno",
    dificultad: "Media",
    categoria: "Platos Principales",
    fecha: "2023-10-01", // Mantenemos fecha para compatibilidad temporal si es necesario
    descripcion: "Un clásico plato chileno ideal para el invierno.",
    ingredientes: "Posta negra, papas, zapallo, choclo, porotos verdes, arroz",
    metodo: "Cocer la carne con verduras, agregar papas y zapallo, finalmente el choclo y arroz.",
    tiempo: "90 min",
    precio: 8000, // Mantenemos precio para compatibilidad temporal
    imagen: "https://images.unsplash.com/photo-1590235967280-c0490b791176?q=80&w=600&auto=format&fit=crop"
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
    imagen: "https://images.unsplash.com/photo-1599307773295-a22a364be933?q=80&w=600&auto=format&fit=crop"
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
    imagen: "https://images.unsplash.com/photo-1598379057639-646cc274092f?q=80&w=600&auto=format&fit=crop"
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
    imagen: "https://images.unsplash.com/photo-1623963229712-4293c042296d?q=80&w=600&auto=format&fit=crop"
  }
];

// Handlers REST
const restHandlers = [
  // Instrucción: Usar API REST mock para listar recetas (título, dificultad, categoría)
  http.get('/api/recetas', async () => {
    await delay(500);
    console.log('%cMSW: Interceptó GET /api/recetas (REST)', 'color: #10b981; font-weight: bold; font-size: 12px');
    return HttpResponse.json(recetas);
  }),

  // Handler auxiliar por si necesitamos buscar una por REST
  http.get('/api/receta/:id', async ({ params }) => {
    await delay(500);
    const receta = recetas.find(r => r.id === parseInt(params.id));
    
    if (receta) {
      return HttpResponse.json(receta);
    }
    return new HttpResponse(null, { status: 404 });
  })
];

// Handlers GraphQL
const graphqlHandlers = [
  // Instrucción: Utilizar API GraphQL mock para obtener detalles (ingredientes, método, tiempo)
  graphql.query('GetRecetaById', async ({ variables }) => {
    await delay(500);
    const receta = recetas.find(r => r.id === variables.id);
    console.log('%cMSW: Interceptó Query GetRecetaById (GraphQL)', 'color: #f59e0b; font-weight: bold; font-size: 12px');
    
    if (receta) {
      return HttpResponse.json({ data: { receta } });
    }
    return HttpResponse.json({ 
      errors: [{ message: 'Receta no encontrada' }] 
    });
  })
];

export const handlers = [...restHandlers, ...graphqlHandlers];