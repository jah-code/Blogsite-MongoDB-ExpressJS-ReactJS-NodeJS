import React, { useEffect, useReducer } from "react";
import "./Form.css";
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

function Select(props) {
  const initialState = {
    value: props.initialValue || "",
    isValid: false,
    isTouched: props.initialValid || false,
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

  const element = (
    <select
      onChange={onChangeHandler}
      onBlur={onTouchHandler}
      value={inputState.value}
    >
      {props.options.map((opt) => (
        <option value={opt} key={opt}>
          {opt}
        </option>
      ))}
    </select>
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

export default Select;
