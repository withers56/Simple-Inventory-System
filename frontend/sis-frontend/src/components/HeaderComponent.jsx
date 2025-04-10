/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { isAdmin, logout } from '../auth/auth';

const HeaderComponent = () => {

    const navigator = useNavigate();

  return (

    
   
    <Navbar expand="lg" bg='dark' data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">SIS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>

            {isAdmin() && 
            
            <NavDropdown title="Admin" id="basic-nav-dropdown">
              <NavDropdown.Item href="/items">Items</NavDropdown.Item>
              <NavDropdown.Item href="/categories">Categories</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>      
            }
     
            <Nav.Link href="/login" onClick={logout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


  )
}

export default HeaderComponent