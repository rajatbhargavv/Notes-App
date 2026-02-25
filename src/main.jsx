import React, { StrictMode, useContext, createContext } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const themeContext = React.createContext();

createRoot(document.getElementById('root')).render(
  // <themeContext.Provider>
    <StrictMode>
      <App />
    </StrictMode>
  // </themeContext.Provider>
)
