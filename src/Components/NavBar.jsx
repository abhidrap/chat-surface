import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";

const NavBar = () =>{
   const { logout } = useAuthStore();
   const navigate = useNavigate();
   const handleLogout = () =>{
    logout();
    navigate("/login");
   }
    return(
        <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to='/' >MyProject</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavDropdown title="Profile" id="profile-dropdown">
                <NavDropdown.Item as={Link} to="/profilepage" >View Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/settings" >Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default NavBar;