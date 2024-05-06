import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

function Button(props) {
  if (props.to) {
    return (
      <Link to={props.to} className={`${props.className} button`}>
        {props.children}
      </Link>
    );
  }
  return (
    <button className={`${props.className} button`} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;