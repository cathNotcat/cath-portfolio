import React from 'react'
import { navbarData } from '../data/navbar'

const Navbar = () => {
  return (
    <div className="flex justify-center pt-6 fixed w-full z-10">
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 px-6 py-2 rounded-full shadow-lg flex gap-6">
        {navbarData.menus.map((menu, i) => (
        <button
            key={i}
            className={`px-4 py-1 rounded-full text-sm transition ${
            i === 0
                ? "bg-white/20 text-white"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            }`}
        >
            {menu.label}
        </button>
        ))}
    </div>
    </div>
  )
}

export default Navbar