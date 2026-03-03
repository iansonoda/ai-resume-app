import React from 'react'
import { Link } from 'react-router'

const navbar = () => {
  return (
    <nav className="navbar">
        <Link to="/">
        <p className='text-gradient text-2xl font-bold'>Resumind</p>
        </Link>

        <Link to="/upload">
        <p className='primary-button w-fit'>Upload Resume</p>
        </Link>
    </nav>
  )
}

export default navbar