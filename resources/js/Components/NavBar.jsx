import { Navbar, Nav, Container } from 'react-bootstrap';
import { CalendarCheck, ClipboardPlus, LayoutDashboard } from 'lucide-react';
import NavLink from '@/Components/NavLink';

const NavBar = () => {
  return (
    <div className="d-flex  justify-content-center ">
      <Navbar
        // fixed="top"
        bg="light"
        expand="lg"
        className="shadow-sm rounded-4 border px-4 py-2"
        style={{ maxWidth: '900px', width: '100%' }}
      >
        <Container fluid>
          <Navbar.Brand href="/" className="fw-bold text-primary">
            Sistema de Reservas
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="mx-auto gap-3 mt-2 mt-lg-0">
              <NavLink
                href={route('consultar-reservas')}
                active={route().current('consultar-reservas')}
                className="d-flex align-items-center gap-2"
              >
                <CalendarCheck size={18} />
                Consultar Reservas
              </NavLink>
              <NavLink
                href={route('cadastrar-reservas')}
                active={route().current('cadastrar-reservas')}
                className="d-flex align-items-center gap-2"
              >
                <ClipboardPlus size={18} />
                Cadastrar Reservas
              </NavLink>
              <NavLink
                href={route('gerenciar-salas')}
                active={route().current('gerenciar-salas')}
                className="d-flex align-items-center gap-2"
              >
                <LayoutDashboard size={18} />
                Gerenciar Salas
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
