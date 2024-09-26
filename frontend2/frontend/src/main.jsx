import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './Context/StoreContext'
import ContextProvider from './Context/GeminiContext.jsx'
import { InsuranceProvider } from './Context/InsuranceContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>
      <ContextProvider>
        <InsuranceProvider>
          <App />
        </InsuranceProvider>
      </ContextProvider>
    </StoreContextProvider>
  </BrowserRouter>,
)
