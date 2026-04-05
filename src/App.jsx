import './App.css'
import Navbar from './components/Navbar'
import Background from './components/Background'
import Hero from './components/Hero'
import Education from './components/Education'
import Experience from './components/Experience'
import Works from './components/Works'

const App = () => {
  return (
    <div>
      <Background />
      <Navbar />
      <Hero />
      <Education />
      <Experience />
      <Works />
    </div>

  )
}

export default App
