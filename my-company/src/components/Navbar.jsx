import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const navStyle = {
    display: 'flex',
    gap: '20px',
    backgroundColor: '#333',
    padding: '10px',
    color: 'white',
  }

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
  }

  return (
    <nav style={navStyle}>
      <Link style={linkStyle} to="/">Home</Link>
      <Link style={linkStyle} to="/about">About</Link>
      <Link style={linkStyle} to="/services">Services</Link>
      <Link style={linkStyle} to="/contact">Contact</Link>
    </nav>
  )
}
