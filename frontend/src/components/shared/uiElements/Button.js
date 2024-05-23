import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

function Button(props) {
  if (props.to) {
    return (
      <Link
        to={props.to}
        className={`${props.className} button`}
        target="props.target || null"
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`${props.className} button`}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
    >
      {props.children}
    </button>
  );
}

export default Button;
