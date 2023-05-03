import React from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

const Cabecalho = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#">Blocos</Nav.Link>
            <Nav.Link href="#">Partidos</Nav.Link>
            <Nav.Link href="#">Eventos</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Cabecalho;
