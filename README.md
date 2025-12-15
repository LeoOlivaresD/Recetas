# Recetario Maestro - Aplicación Frontend con Testing Completo

Una aplicación React moderna para explorar y guardar recetas chilenas. Este proyecto demuestra la implementación profesional de **REST API**, **GraphQL con Apollo Client**, **MSW (Mock Service Worker)** y un **stack completo de testing** con Jest, React Testing Library y Cypress.

![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-purple?logo=vite)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-purple?logo=bootstrap)
![Apollo](https://img.shields.io/badge/Apollo_Client-3.11.10-311C87?logo=apollographql)
![MSW](https://img.shields.io/badge/MSW-2.0.0-orange)
![Vitest](https://img.shields.io/badge/Vitest-4.0.14-green?logo=vitest)
![Cypress](https://img.shields.io/badge/Cypress-15.7.1-17202C?logo=cypress)
![Coverage](https://img.shields.io/badge/Coverage-76.92%25-brightgreen)

---

## Tabla de Contenidos

- [Demo en Vivo](#-demo-en-vivo)
- [Características Principales](#-características-principales)
- [Stack Tecnológico](#-stack-tecnológico)
- [Testing y Cobertura](#-testing-y-cobertura)
- [Instalación](#-instalación)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Pruebas Unitarias](#-pruebas-unitarias)
- [Pruebas E2E](#-pruebas-e2e)
- [Documentación Técnica](#-documentación-técnica)
- [Autor](#-autor)

---

## Demo en Vivo

**[Ver aplicación en GitHub Pages](https://LeoOlivaresD.github.io/Recetas/)**

---

## Características Principales

### **Integración de Múltiples Tecnologías**
- **REST API** - Lista de recetas con información básica (título, dificultad, categoría)
- **GraphQL + Apollo Client** - Detalles completos de cada receta (ingredientes, método, tiempo)
- **MSW (Mock Service Worker)** - Simula backend completo en desarrollo
- **Badges informativos** - Muestra qué tecnología está siendo utilizada

### **Diseño Profesional**
- Tema claro con gradientes modernos
- Totalmente responsivo (mobile, tablet, desktop)
- Animaciones suaves y transiciones CSS
- Efectos hover interactivos
- Bootstrap 5.3.8 para diseño consistente

### **Funcionalidades**
- Lista de recetas chilenas tradicionales
- Visualización de detalles completos
- Modal de guardado de recetas favoritas
- Cálculo y visualización de información nutricional
- Navegación fluida con React Router
- Manejo de estados de carga y errores

### **Recursos Locales**
- Imágenes alojadas en `public/images/`
- Funciona en desarrollo local y producción (GitHub Pages)

---

## Stack Tecnológico

```
Frontend Framework:
├── React 19.2.0                 - Librería UI
├── React Router 7.9.6           - Navegación SPA
├── Vite 7.2.4                   - Build tool ultrarrápido
├── Bootstrap 5.3.8              - Framework CSS
└── JavaScript ES6+              - Lenguaje de programación

APIs y Data Fetching:
├── Apollo Client 3.11.10        - Cliente GraphQL
├── GraphQL 16.12.0              - Lenguaje de consultas
├── MSW 2.0.0                    - Mock Service Worker
└── Fetch API                    - REST API nativo

Testing:
├── Vitest 4.0.14                - Test runner (compatible con Jest)
├── React Testing Library 16.3.0 - Testing de componentes React
├── Cypress 15.7.1               - Testing E2E
├── @vitest/coverage-v8 4.0.14   - Reporte de cobertura
├── Happy DOM 20.0.11            - Entorno DOM para tests
└── @testing-library/jest-dom    - Matchers personalizados

Development Tools:
├── ESLint 9.39.1                - Linter
├── gh-pages 6.3.0               - Deploy a GitHub Pages
└── start-server-and-test 2.1.3  - Servidor para E2E
```

---

## Testing y Cobertura

### **Cobertura de Código Actual**

```
═══════════════════════════════════════════════════════════
File                | Stmts   | Branch  | Funcs   | Lines  
═══════════════════════════════════════════════════════════
All files           | 73.52%  | 67.64%  | 72.22%  | 76.92%
 components         | 86.66%  | 81.25%  | 87.5%   | 89.65%
  RecipeCard.jsx    | 100%    | 90%     | 100%    | 100%   
  RecipeList.jsx    | 84%     | 66.66%  | 75%     | 87.5%  
 pages              | 63.15%  | 55.55%  | 60%     | 66.66%
  Home.jsx          | 100%    | 100%    | 100%    | 100%   
  RecipePage.jsx    | 58.82%  | 55.55%  | 55.55%  | 62.5%  
═══════════════════════════════════════════════════════════
```


### **Tipos de Pruebas Implementadas**

1. **Pruebas Unitarias (Vitest + RTL)**
   - `App.test.jsx` - Configuración inicial
   - `RecipeCard.test.jsx` - Componente de tarjeta
   - `RecipeList.test.jsx` - Lista con integración API
   - `Home.test.jsx` - Página principal
   - `RecipePage.test.jsx` - Página de detalles con GraphQL

2. **Pruebas E2E (Cypress)**
   - `01-home-page.cy.js` - Carga y visualización principal
   - `02-recipe-navigation.cy.js` - Navegación entre páginas
   - `03-save-recipe-modal.cy.js` - Interacción con modales
   - `04-recipe-filters.cy.js` - Filtros y exploración

3. **Mocking y Stubbing**
   - MSW para interceptar peticiones HTTP
   - Handlers REST y GraphQL
   - Datos mock consistentes

---

## Instalación

### Requisitos Previos
- Node.js 16.x o superior
- npm 8.x o superior

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/LeoOlivaresD/Recetas.git
cd Recetas

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:5173/Recetas/
```

### Comandos de Testing

```bash
# Ejecutar todas las pruebas unitarias
npm test

# Ejecutar pruebas con reporte de cobertura
npm run coverage

# Abrir Cypress en modo interactivo
npm run cypress:open

# Ejecutar Cypress en modo headless
npm run cypress:run

# Ejecutar E2E con servidor automático
npm run e2e
```

---

## Arquitectura del Proyecto

### Flujo de Datos - Desarrollo (con MSW)

```
┌─────────────────────────────────────────────────────────┐
│                    NAVEGADOR                             │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐           ┌──────────────┐           │
│  │   Home       │           │ RecipePage   │           │
│  │  (REST API)  │           │  (GraphQL)   │           │
│  └──────┬───────┘           └──────┬───────┘           │
│         │                          │                    │
│         │ fetch('/api/recetas')    │ Apollo Client     │
│         │                          │ POST /graphql     │
│         ▼                          ▼                    │
│  ┌─────────────────────────────────────────┐           │
│  │        MSW (Mock Service Worker)         │           │
│  │      Intercepta peticiones HTTP          │           │
│  └─────────────────┬───────────────────────┘           │
│                    │                                    │
│                    │ handlers.js                        │
│                    ▼                                    │
│  ┌─────────────────────────────────────────┐           │
│  │  REST Handler    │   GraphQL Handler    │           │
│  │  GET /recetas    │   GetRecetaById      │           │
│  └─────────────────────────────────────────┘           │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### REST vs GraphQL en Este Proyecto

#### **REST API - Lista de Recetas (Home)**

**¿Qué hace?**
- Obtiene la lista completa de recetas
- Endpoint: `GET /api/recetas`
- Retorna: Título, dificultad, categoría, descripción, precio

**Código:**
```javascript
const response = await fetch('/api/recetas');
const recetas = await response.json();
```

#### **GraphQL - Detalles de Receta (RecipePage)**

**¿Qué hace?**
- Obtiene detalles específicos de UNA receta
- Endpoint: `POST /graphql`
- Query personalizado con campos específicos
- Apollo Client maneja: caché, loading, errores

**Código:**
```javascript
const GET_RECETA = gql`
  query GetRecetaById($id: Int!) {
    receta(id: $id) {
      id
      titulo
      ingredientes
      metodo
      tiempo
    }
  }
`;

const { loading, error, data } = useQuery(GET_RECETA, {
  variables: { id: parseInt(id) }
});
```

---

## Estructura del Proyecto

```
Recetas/
├── public/
│   ├── images/                      # Imágenes de recetas
│   │   ├── cazuela.jpeg
│   │   ├── charquican.jpg
│   │   ├── lecheAsada.jpg
│   │   └── empanadas.avif
│   └── mockServiceWorker.js         # Service Worker MSW
│
├── src/
│   ├── components/
│   │   ├── AppRoutes.jsx           # Configuración de rutas
│   │   ├── RecipeCard.jsx          # Tarjeta de receta
│   │   ├── RecipeCard.test.jsx     # Tests unitarios
│   │   ├── RecipeList.jsx          # Lista (REST API)
│   │   ├── RecipeList.test.jsx     # Tests con MSW
│   │   └── Footer.jsx              # Footer de la app
│   │
│   ├── pages/
│   │   ├── Home.jsx                # Página principal
│   │   ├── Home.test.jsx           # Tests página home
│   │   ├── RecipePage.jsx          # Detalles (GraphQL)
│   │   └── RecipePage.test.jsx     # Tests con Apollo mock
│   │
│   ├── mocks/
│   │   ├── browser.js              # Setup MSW navegador
│   │   ├── server.js               # Setup MSW tests
│   │   └── handlers.js             # Handlers REST + GraphQL
│   │
│   ├── App.jsx                     # Componente raíz
│   ├── App.test.jsx                # Test inicial
│   ├── App.css                     # Estilos globales
│   ├── index.css                   # Estilos base
│   ├── main.jsx                    # Entry point (inicia MSW)
│   └── setupTests.js               # Configuración testing
│
├── cypress/
│   ├── e2e/
│   │   ├── 01-home-page.cy.js      # Tests E2E home
│   │   ├── 02-recipe-navigation.cy.js
│   │   ├── 03-save-recipe-modal.cy.js
│   │   └── 04-recipe-filters.cy.js
│   └── fixtures/
│       └── example.json
│
├── coverage/                        # Reportes de cobertura
├── cypress.config.js               # Config Cypress
├── vite.config.js                  # Config Vite + Vitest
├── package.json                    # Dependencias
└── README.md                       # Este archivo
```

---

## Pruebas Unitarias

### Configuración

**Archivo: `vite.config.js`**
```javascript
export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: './src/setupTests.js',
    coverage: {
      exclude: [
        'src/mocks/**',
        'src/main.jsx',
        '**/*.config.js',
        '**/dist/**'
      ]
    }
  }
})
```

### Ejemplos de Tests

**Test de Componente (RecipeCard.test.jsx):**
```javascript
it('renderiza correctamente la información de la receta', () => {
  render(
    <BrowserRouter>
      <RecipeCard evento={mockReceta} />
    </BrowserRouter>
  );

  expect(screen.getByText('Cazuela de Vacuno')).toBeInTheDocument();
  expect(screen.getByText('Media')).toBeInTheDocument();
});
```

**Test con MSW (RecipeList.test.jsx):**
```javascript
it('renderiza la lista desde la API', async () => {
  render(
    <BrowserRouter>
      <RecipeList />
    </BrowserRouter>
  );

  const titulo = await screen.findByText('Cazuela de Vacuno');
  expect(titulo).toBeInTheDocument();
});
```

**Test con Apollo Mock (RecipePage.test.jsx):**
```javascript
it('muestra detalles con GraphQL', async () => {
  useQuery.mockReturnValue({
    loading: false,
    data: { receta: mockReceta }
  });

  render(<RecipePage />);
  
  await waitFor(() => {
    expect(screen.getByText('Cazuela de Vacuno')).toBeInTheDocument();
  });
});
```

---

## Pruebas E2E

### Configuración Cypress

**Archivo: `cypress.config.js`**
```javascript
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173/Recetas/',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: false,
    screenshotOnRunFailure: true
  }
})
```

### Ejemplos de Tests E2E

**Test de Navegación:**
```javascript
describe('Navegación a Detalles', () => {
  it('navega a los detalles al hacer clic', () => {
    cy.visit('/');
    cy.contains('Ver Detalles').first().click();
    cy.url().should('include', '/receta/');
    cy.contains('Cazuela de Vacuno').should('be.visible');
  });
});
```

**Test de Modal:**
```javascript
describe('Modal de Guardar', () => {
  it('muestra mensaje de éxito al confirmar', () => {
    cy.visit('/');
    cy.contains('Ver Detalles').first().click();
    cy.contains('Guardar Receta').click();
    cy.contains('Confirmar').click();
    cy.contains('¡Receta Guardada!').should('be.visible');
  });
});
```

---

## Documentación Técnica

### MSW (Mock Service Worker)

**¿Por qué MSW?**
- Intercepta peticiones a nivel de Service Worker
- No modifica el código de producción
- Funciona en navegador Y en tests
- Simula delays y errores de red

**Handlers REST:**
```javascript
http.get('/api/recetas', async () => {
  await delay(500);
  return HttpResponse.json(recetas);
})
```

**Handlers GraphQL:**
```javascript
graphql.query('GetRecetaById', async ({ variables }) => {
  const receta = recetas.find(r => r.id === variables.id);
  return HttpResponse.json({ data: { receta } });
})
```

### Apollo Client

**Configuración:**
```javascript
const client = new ApolloClient({
  link: new HttpLink({ uri: "/graphql" }),
  cache: new InMemoryCache()
});
```

**Ventajas:**
- Caché automático de queries
- Manejo de estados (loading, error, data)
- Queries tipadas con GraphQL
- Optimistic UI updates

---

## Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia servidor de desarrollo (Vite)
npm run build            # Construye para producción
npm run preview          # Preview del build

# Testing
npm test                 # Ejecuta tests unitarios
npm run coverage         # Genera reporte de cobertura
npm run cypress:open     # Abre Cypress UI
npm run cypress:run      # Ejecuta Cypress headless
npm run e2e              # Tests E2E con servidor
npm run e2e:headless     # Tests E2E headless

# Deploy
npm run deploy           # Deploy a GitHub Pages

# Linting
npm run lint             # Verifica código con ESLint
```

---

## Deploy en GitHub Pages

El proyecto está configurado para GitHub Pages:

```javascript
// vite.config.js
export default defineConfig({
  base: '/Recetas/',
})
```

```javascript
// AppRoutes.jsx
<Router basename="/Recetas/">
```

```json
// package.json
{
  "homepage": "https://LeoOlivaresD.github.io/Recetas/",
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

---


## Autor

**Leonardo Olivares**

- GitHub: [@LeoOlivaresD](https://github.com/LeoOlivaresD)
- Proyecto: [Recetas - Frontend Testing](https://github.com/LeoOlivaresD/Recetas)

---
