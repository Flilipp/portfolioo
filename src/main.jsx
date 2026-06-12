import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <ErrorBoundary
    fallback={
      <div style={{ background: '#111', color: '#C8A96E', minHeight: '100vh', display: 'grid', placeItems: 'center', fontFamily: 'monospace' }}>
        // RUNTIME_ERROR — odśwież stronę (F5)
      </div>
    }
  >
    <App />
  </ErrorBoundary>
)
