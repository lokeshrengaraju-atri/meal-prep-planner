import React from "react";
import {
  Nav,
  NavbarBrand,
  NavItem,
  NavLink,
  Navbar as ReactstrapNavbar,
} from "reactstrap";

const Navbar: React.FC = () => {
  return (
    <ReactstrapNavbar color="dark" dark expand="md" className="mb-4">
      <NavbarBrand href="/">Meal Prep Planner</NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/add-meal">Add Meal</NavLink>
        </NavItem>
      </Nav>
    </ReactstrapNavbar>
  );
};

export default Navbar;
