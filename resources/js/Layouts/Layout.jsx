import { Container } from 'react-bootstrap';
import NavBar from '@/Components/NavBar';

export default function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <NavBar />
      </header>

      <Container fluid="xxl" className="flex-grow-1 my-3">
        {children}
      </Container>

      <footer className="text-center py-4 bg-light mt-auto">
        <small>&copy; {new Date().getFullYear()} Meu Sistema</small>
      </footer>
    </div>
  );
}
