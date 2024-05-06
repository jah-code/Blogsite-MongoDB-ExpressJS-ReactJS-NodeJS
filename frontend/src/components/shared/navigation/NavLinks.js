import React from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";

function NavLinks() {
  return (
    <div>
      <ul className="nav-links">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/blogs">Blogs</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/my-blogs">My Blogs</NavLink>
        </li>
        <li>
          <NavLink to="/add-blog">Add Blog</NavLink>
        </li>
      </ul>
      {/* <button>Logout</button> */}
    </div>
  );
}

export default NavLinks;
