import {
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
} from "reactstrap";

const MyNavbar = () => {
  return (
    <Navbar color="dark" dark expand="md">
      <Container>
        <NavbarBrand href="/">Meal Planner</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/meals">Meal List</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/search">Search & Filter</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/add-meal">Add Meal</NavLink>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
