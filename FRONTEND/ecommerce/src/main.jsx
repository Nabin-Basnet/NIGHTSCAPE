import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import Navbar from './Components/Navbar.jsx'
import LoginForm from './pages/LoginPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Navbar/>
    <LoginForm/>
  </StrictMode>,
)
