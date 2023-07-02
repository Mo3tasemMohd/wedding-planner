import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

import logo2 from '../../media/home/logo2.png'
import navlogo2 from '../../media/home/navlogo2.png'
import '../../css/mynav.css'
export  function Mynav() {
  return (
<div className=' parent body text-align-center'>
  <Navbar className='nav' expand="md" sticky="top"   >

      <Navbar.Brand href="#home">
        <img className='logo2' src={logo2} alt="Logo"></img>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center ">
        <Nav className="navtext ms-auto">
          <Nav.Link className='home'   href="#home">Home</Nav.Link>
          <Nav.Link className='service' href="#features">Services</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <div className="d-flex justify-content-center align-items-center navlogo-container">
        <img className='navlogo2' src={navlogo2} alt="Nav Logo"></img>
      </div>

  </Navbar>
</div>
  )
}
