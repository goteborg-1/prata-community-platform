import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {GoogleOAuthProvider} from "@react-oauth/google"
import { BrowserRouter } from 'react-router'
import { ThemeProvider } from './context/ThemeContext.tsx'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='190516201423-jk46485nrchrf1j0dq6tv16ht4bnkjq6.apps.googleusercontent.com'>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
)
