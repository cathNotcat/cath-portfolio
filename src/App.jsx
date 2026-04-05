import './App.css'
import Navbar from './components/Navbar'
import Background from './components/Background'
import Hero from './components/Hero'
import Education from './components/Education'
import Experience from './components/Experience'

const App = () => {
  return (
    <div>
      <Background />
      <Navbar />
      <Hero />
      <Education />
      <Experience />
    </div>

  )
}

export default App
