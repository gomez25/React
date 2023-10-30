import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CartWidget from '../CartWidget/CartWidget'
import { useCart } from '../../context/CartContext';

export default function NavBar() {
  const { cartCount } = useCart(); 
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">E-Commerce Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href={`/catalog`}>Catalog</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link eventKey={2} href="/cart">
              <CartWidget count={cartCount}/>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}
