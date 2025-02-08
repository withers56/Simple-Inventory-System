/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const HeaderComponent = () => {

    const navigator = useNavigate();

  return (
    // <div>
    //     <header>
    //         <nav className='navbar navbar-dark bg-dark '>
    //             <div className='container-fluid'>
    //                 <a className='navbar-brand' href="#">SIS</a>
    //                 <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
    //                     <span className='navbar-toggler-icon'></span>    
    //                 </button>
    //                 <div className='collapse navbar-collapse' id='navbarSupportedContent'>
    //                     <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
    //                         <li className='nav-item'>
    //                             <a className='nav-link active' aria-current='page' href="#">Home</a>
    //                         </li>
    //                     </ul>
    //                 </div>
    //             </div> 
    //         </nav>
    //     </header>
    // </div>



    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">SIS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/add-item">Add item</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


  )
}

export default HeaderComponent