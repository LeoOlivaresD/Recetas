import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'

// Configuracion Apollo Client
const client = new ApolloClient({
  link: new HttpLink({ uri: "/graphql" }),
  cache: new InMemoryCache()
});

async function enableMocking() {
  // Se habilita MSW en desarrollo
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    
    // Configuracion con la ruta base
    return worker.start({
      serviceWorker: {
        url: '/Recetas/mockServiceWorker.js'
      },
      onUnhandledRequest: 'bypass'
    })
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </StrictMode>
  )
})
