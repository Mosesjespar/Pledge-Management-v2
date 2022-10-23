import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'

export default function NavBar() {
    const navigate = useNavigate()
    return (
        <Navbar bg="light" variant="light" sticky="top">

            <NavLink to='/main' className='nav-link active ms-5 p-3'><Navbar.Brand className='fs-3'>Welcome Back {localStorage.getItem('u_name')}</Navbar.Brand></NavLink>

            <Nav className="ms-auto me-5 text-align-center">
                <NavLink to="/main" className='nav-link active fs-5' replace={true}>Home</NavLink>
                <NavLink to="/contributors" className='nav-link active fs-5' replace={true}>Contributors</NavLink>
                <Button className='active me-5 mt-1 h-50 ' onClick={() => {
                    localStorage.clear()
                    localStorage.removeItem('jwt')
                    navigate('/', { replace: true })
                }
                } variant='primary'>Log Out</Button>
                {<span>&nbsp;</span>}

            </Nav>

        </Navbar>
    )
}
