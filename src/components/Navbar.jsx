import React, { useState, useRef, useEffect } from 'react'
import { navbarData } from '../data/navbar'
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi'

const ThemeToggle = ({ theme, onToggleTheme }) => (
  <button
    type="button"
    onClick={onToggleTheme}
    className="theme-toggle fixed top-6 right-4 md:right-6 z-20 inline-flex items-center justify-center w-10 h-10 rounded-full shadow-lg backdrop-blur-xl transition"
    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
  >
    {theme === 'dark' ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
  </button>
)

const Navbar = ({ theme, onToggleTheme }) => {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('about')
  const [pillStyle, setPillStyle] = useState({})
  const btnRefs = useRef([])
  const handleNav = (id, i) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setActiveId(id)
    setOpen(false)
    const btn = btnRefs.current[i]
    if (btn) setPillStyle({ left: btn.offsetLeft, width: btn.offsetWidth })
  }

  useEffect(() => {
    const i = navbarData.menus.findIndex(m => m.id === activeId)
    const btn = btnRefs.current[i]
    if (btn) setPillStyle({ left: btn.offsetLeft, width: btn.offsetWidth })
  }, [activeId])

  useEffect(() => {
    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.35
      const activeMenu = [...navbarData.menus].reverse().find(menu => {
        const section = document.getElementById(menu.id)
        return section && section.getBoundingClientRect().top <= marker
      }) || navbarData.menus[0]

      setActiveId(current => current === activeMenu.id ? current : activeMenu.id)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [])

  return (
    <div className="fixed w-full z-10 flex justify-center pt-6 px-4">

      {/* Desktop */}
      <div className="hidden md:flex items-center relative backdrop-blur-xl theme-nav border px-4 py-2 rounded-full shadow-lg gap-2">
        {/* Sliding background */}
        <span
          className="absolute top-1 bottom-1 rounded-full theme-nav-highlight transition-all duration-300 ease-in-out"
          style={{ left: pillStyle.left, width: pillStyle.width }}
        />
        {navbarData.menus.map((menu, i) => (
          <button
            key={i}
            ref={el => btnRefs.current[i] = el}
            onClick={() => handleNav(menu.id, i)}
            className={`relative px-4 py-1 rounded-full text-sm transition ${activeId === menu.id ? 'theme-text' : 'theme-nav-inactive'
              }`}
          >
            {menu.label}
          </button>
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden w-[calc(100%-7rem)] max-w-sm">
        <div className="backdrop-blur-xl theme-nav border rounded-2xl shadow-lg overflow-hidden">
          <div className="flex justify-between items-center px-5 py-3">
            <span className="theme-text text-sm font-semibold">Menu</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="theme-text"
                aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={open}
              >
                {open ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}>
            <div className="overflow-hidden">
              <div className="flex flex-col px-4 pb-3 gap-1">
                {navbarData.menus.map((menu, i) => (
                  <button
                    key={i}
                    onClick={() => handleNav(menu.id, i)}
                    className={`text-left text-sm px-4 py-2 rounded-xl transition ${activeId === menu.id ? 'theme-nav-highlight theme-text' : 'theme-nav-inactive theme-surface-hover'
                      }`}
                  >
                    {menu.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />
    </div>
  )
}

export default Navbar