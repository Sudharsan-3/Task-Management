import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthContextProvider from './components/Context/AuthContext.tsx'
import {UserDataProvider} from "./components/Context/UsersDataContext.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <UserDataProvider>
        <App />
        </UserDataProvider>
    </AuthContextProvider>
  </StrictMode>,
)
