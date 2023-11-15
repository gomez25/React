import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import { useCart } from '../../context/CartContext';

export default function NavBar() {
  const { cartCount } = useCart();

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        {/* Usa Link si estás utilizando React Router */}
        <Navbar.Brand as={Link} to="/catalog">
          E-Commerce Store
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/catalog">
              Catalog
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/cart">
              <CartWidget count={cartCount} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}