import React from "react";

const NavItem = ({ href, children }) => (
  <li className="nav-item">
    <a className="nav-link" href={href}>
      {children}
    </a>
  </li>
);

const Navbar = () => (
  <div className="navbar-nav-scroll">
    <ul className="navbar-nav bd-navbar-nav flex-row">
      <NavItem href="/">Home</NavItem>
      <NavItem href="/docs/4.3/getting-started/introduction/">
        Documentation
      </NavItem>
      <NavItem href="/docs/4.3/examples/">Examples</NavItem>
      <NavItem href="https://themes.getbootstrap.com/">Themes</NavItem>
    </ul>
  </div>
);

export default Navbar;
