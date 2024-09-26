import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import AOS from 'aos'
import "aos/dist/aos.css";
// import { InsuranceProvider } from '@/Context/InsuranceContext';
import { BrowserRouter } from 'react-router-dom'


AOS.init({
  duration: 1000,
  offset: 100,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
          {/* <InsuranceProvider> */}
            < App />
          {/* </InsuranceProvider> */}
    </BrowserRouter>,
  </StrictMode>,
)
