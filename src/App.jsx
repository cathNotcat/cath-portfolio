import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Background from './components/Background'
import Hero from './components/Hero'
import Education from './components/Education'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'

const App = () => {
  const [theme, setTheme] = useState(() => (
    window.localStorage.getItem('portfolio-theme') || 'dark'
  ))

  useEffect(() => {
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(currentTheme => currentTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div id="app" data-theme={theme}>
      <Background />
      <div className="relative z-10">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <Hero />
        <Education />
        <Experience />
        <Projects />
        <Contact />
      </div>
    </div>

  )
}

export default App
