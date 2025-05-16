import { Navbar, Nav, Container } from 'react-bootstrap';
import NavLink from '@/Components/NavLink';

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="me-auto mb-2 mb-lg-0">
            <NavLink href={route('consultar-reservas')} active={route().current('consultar-reservas')}>Consultar Reservas</NavLink>
            {/* <NavLink href={route('/cadastrar-reservas')} active={route().current('cadastrar-reservas')}>Consultar Reservas</NavLink>
            <NavLink href={route('/gerenciar-salas')} active={route().current('gerenciar-salas')}>Consultar Reservas</NavLink> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;