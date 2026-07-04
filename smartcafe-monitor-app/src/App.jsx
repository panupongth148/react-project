import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import AppRoutes from './routes/AppRoutes'

function App() {
  // This is also the perfect place to wrap your app in global Context Providers if needed
  return <AppRoutes />;
}

export default App
