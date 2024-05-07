import React, { useEffect, useReducer } from "react";
import "./Input.css";
import { validate } from "../util/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

function Input(props) {
  const initialState = {
    value: props.value || "",
    isValid: false,
    isTouched: props.valid || false,
  };
  const [inputState, dispatch] = useReducer(inputReducer, initialState);

  const { id, onInputHandler } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInputHandler(id, value, isValid);
  }, [id, onInputHandler, value, isValid]);

  const onChangeHandler = (e) => {
    dispatch({
      type: "CHANGE",
      val: e.target.value,
      validators: props.validators,
    });
  };

  const onTouchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={onChangeHandler}
        value={inputState.value}
        onBlur={onTouchHandler}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={onChangeHandler}
        value={inputState.value}
        onBlur={onTouchHandler}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
}

export default Input;
