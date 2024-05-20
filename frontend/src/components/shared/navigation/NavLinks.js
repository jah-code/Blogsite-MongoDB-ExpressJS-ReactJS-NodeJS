import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./NavLinks.css";
import { AuthContext } from "../context/auth-context";
import Button from "../uiElements/Button";

function NavLinks() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const isLoggedIn = auth.isLoggedIn;

  const logoutHandler = () => {
    auth.logout();
    navigate("/");
  };

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
        {isLoggedIn && (
          <li>
            <NavLink to="/my-blogs">My Blogs</NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink to="/add-new/my-blogs">Add Blog</NavLink>
          </li>
        )}
        <li>
          {isLoggedIn ? (
            <Button onClick={logoutHandler}>Logout</Button>
          ) : (
            <Button to="/auth">{isLoggedIn ? "Logout" : "Login"}</Button>
          )}
        </li>
      </ul>
    </div>
  );
}

export default NavLinks;
