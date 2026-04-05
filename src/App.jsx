import './App.css'
import Navbar from './components/Navbar'
import Background from './components/Background'
import Hero from './components/Hero'
import Education from './components/Education'
import Experience from './components/Experience'
import Works from './components/Works'
import Contact from './components/Contact'

const App = () => {
  return (
    <div>
      <Background />
      <Navbar />
      <Hero />
      <Education />
      <Experience />
      <Works />
      <Contact />
    </div>

  )
}

export default App
