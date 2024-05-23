import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

function Button(props) {
  if (props.to) {
    return (
      <Link
        to={props.to}
        className={`${props.className} button transition hover:-translate-y-1`}
        target="props.target || null"
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`${props.className} button transition hover:-translate-y-1`}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
    >
      {props.children}
    </button>
  );
}

export default Button;
