import React, { useState, useRef, useEffect } from 'react'
import { navbarData } from '../data/navbar'
import { FiMenu, FiX } from 'react-icons/fi'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('hero')
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
  }, [])

  return (
    <div className="fixed w-full z-10 flex justify-center pt-6 px-4">

      {/* Desktop */}
      <div className="hidden md:flex relative backdrop-blur-xl bg-white/10 border border-white/20 px-6 py-2 rounded-full shadow-lg gap-6">
        {/* Sliding background */}
        <span
          className="absolute top-1 bottom-1 rounded-full bg-white/20 transition-all duration-300 ease-in-out"
          style={{ left: pillStyle.left, width: pillStyle.width }}
        />
        {navbarData.menus.map((menu, i) => (
          <button
            key={i}
            ref={el => btnRefs.current[i] = el}
            onClick={() => handleNav(menu.id, i)}
            className={`relative px-4 py-1 rounded-full text-sm transition ${
              activeId === menu.id ? 'text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            {menu.label}
          </button>
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden w-full">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-lg overflow-hidden">
          <div className="flex justify-between items-center px-5 py-3">
            <span className="text-white text-sm font-semibold">Menu</span>
            <button onClick={() => setOpen(!open)} className="text-white">
              {open ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
          <div className={`grid transition-all duration-300 ${
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}>
            <div className="overflow-hidden">
              <div className="flex flex-col px-4 pb-3 gap-1">
                {navbarData.menus.map((menu, i) => (
                  <button
                    key={i}
                    onClick={() => handleNav(menu.id, i)}
                    className={`text-left text-sm px-4 py-2 rounded-xl transition ${
                      activeId === menu.id ? 'bg-white/20 text-white' : 'text-gray-300 hover:text-white hover:bg-white/10'
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

    </div>
  )
}

export default Navbar