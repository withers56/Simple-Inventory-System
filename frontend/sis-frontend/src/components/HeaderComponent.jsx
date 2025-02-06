/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom'

const HeaderComponent = () => {

  return (
    <div>
        <header>
            <nav className='navbar navbar-dark bg-dark '>
                <div className='container-fluid'>
                    <a className='navbar-brand' href="#">SIS</a>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>    
                    </button>
                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                            <li className='nav-item'>
                                <a className='nav-link active' aria-current='page' href="#">Home</a>
                            </li>
                        </ul>
                    </div>
                </div> 
            </nav>
        </header>
    </div>
  )
}

export default HeaderComponent