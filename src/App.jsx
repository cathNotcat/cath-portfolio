import './App.css'
import Navbar from './components/Navbar'
import Background from './components/Background'
import Hero from './components/Hero'
import Education from './components/Education'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'

const App = () => {
  return (
    <div>
      <Background />
      <Navbar />
      <Hero />
      <Education />
      <Experience />
      <Projects />
      <Contact />
    </div>

  )
}

export default App
