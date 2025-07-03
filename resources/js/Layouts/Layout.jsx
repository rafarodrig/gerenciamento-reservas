import { Container } from 'react-bootstrap';
import NavBar from '@/Components/NavBar';

export default function Layout({ children }) {
  return (
    <>
      <header>
        <NavBar />
      </header>
      {/*  (sm, md, lg, xl, xxl) */}
      <main className="py-4">
        <Container fluid="xxl">
          {children}
        </Container>
      </main>

      <footer className="text-center py-4 bg-light mt-auto">
        <small>&copy; {new Date().getFullYear()} Meu Sistema</small>
      </footer>
    </>
  );
}