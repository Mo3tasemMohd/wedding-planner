import React, { useContext, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BASE_URL } from "../../config/dataService";

import logo2 from "../../media/home/logo2.png";
import navlogo2 from "../../media/home/navlogo2.png";
import "../../CSS/mynav.css";
import axios from "axios";
import AuthContext from "../../context/UserContext";
import { NavLink } from "react-router-dom";

export function Mynav() {
  const user = useContext(AuthContext);
  let logoutUser = () => {
        localStorage.removeItem("token");
       
      };
  return (
    <div className=" body text-align-center">
      <Navbar
        className="nav "
        expand="md"
        style={{
          position: "fixed",
          zIndex: 1,
          backgroundColor: "rgba(252, 224, 230, 0.4)",
          width: "100%",
        }}
      >
        <Navbar.Brand href="home">
          <img
            style={{ width: "150px", height: "80px" }}
            className="logo2"
            src={logo2}
            alt="Logo"
          ></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-center "
        >
          <Nav className="navtext ms-auto">
            <NavLink style={{ textDecoration: 'none',color:'inherit' ,padding:'4px'}} className="home" href="home" to='home'>
              Home
            </NavLink>
            <NavLink style={{ textDecoration: 'none',color:'inherit' ,padding:'4px'}} className="service" to="/services">
              Services
            </NavLink>
            {user ? (
              <NavLink style={{ textDecoration: 'none',color:'inherit' ,padding:'4px'}} onClick={()=>logoutUser()} className="service" to="login">
                Logout
              </NavLink>
            ) : (
              <NavLink style={{ textDecoration: 'none',color:'inherit' ,padding:'4px'}}  className="service" to="home">
                Login
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
        <div className="d-flex justify-content-center align-items-center navlogo-container">
          <img className="navlogo2" src={navlogo2} alt="Nav Logo"></img>
        </div>
      </Navbar>
    </div>
  );
}
