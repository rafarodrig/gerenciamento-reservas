import { Container } from 'react-bootstrap';
import NavLink from '@/Components/NavLinks/NavLink';
import NavBar from '@/Components/Navbars/NavBar';
import { CalendarCheck, ClipboardPlus, LayoutDashboard } from 'lucide-react';

export default function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header fixo no topo com Container interno */}
      <header className=" sticky-top z-3">
        <Container fluid="xxl" className="px-3">
          <NavBar expand="md" className="container-style my-2 p-2">
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
          </NavBar>
        </Container>
      </header>

      {/* Conteúdo principal */}
      <Container fluid="xxl" className="flex-grow-1 my-4 px-3">
        {children}
      </Container>

      {/* Rodapé */}
      <footer className="text-center py-4 bg-light mt-auto border-top">
        <small>&copy; {new Date().getFullYear()} Meu Sistema</small>
      </footer>
    </div>
  );
}