import React from "react";
import "./SideDrawer.css";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

function SideDrawer(props) {
  const sidebar = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(sidebar, document.getElementById("drawer-hook"));
}

export default SideDrawer;
