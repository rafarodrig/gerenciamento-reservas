import { Navbar, Nav } from 'react-bootstrap';


export default function NavBar({
  className = "",
  children,
  ...props
}) {
  return (

    <Navbar className={`${className}`} {...props} >
      <Navbar.Toggle aria-controls="navbarSupportedContent" />
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav className="gap-2 mt-lg-0">
          {children}
        </Nav>
      </Navbar.Collapse>
    </Navbar>

  );
};

