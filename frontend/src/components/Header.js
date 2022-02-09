import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { isLoggedIn, getUser } from '../utils/index'

function Header() {
  const logoutHandler = () => {
    localStorage.clear();
    window.location.reload();
  }

  return <header>
<Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
  <Container>
    <LinkContainer to='/'>
      <Navbar.Brand>SOL</Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
         {isLoggedIn() ? (
                <NavDropdown title={getUser().email} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  </header>;
}

export default Header;



