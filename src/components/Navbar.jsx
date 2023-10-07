import React from 'react'
import { useState, useEffect } from 'react'
import { Logo, Luna, Sol } from './Icons'
import './Navbar.css'

export const Navbar = () => {

  const [tema, setTema] = useState('claro')

  const handleChange = (e) => setTema(e.target.checked ? 'oscuro' : 'claro')

  useEffect(() => {
    document.body.setAttribute('data-tema', tema)
  }, [tema])

  return (
    <nav>
      <Logo />
      <div className="switch">
        <Sol />
        <label>
          <input type="checkbox" className='switch-check' onChange={handleChange} hidden />
          <span className='switch-slider'></span>
        </label>
        <Luna />
      </div>
    </nav>
  )
}
