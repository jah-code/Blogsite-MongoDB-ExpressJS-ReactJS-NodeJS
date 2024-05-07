import React, { useCallback, useReducer } from "react";
import Input from "../components/shared/forms/Input";
import Button from "../components/shared/uiElements/Button";
import "./NewBlog.css";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../components/shared/util/validators";

function NewBlog() {
  const formReducer = (state, action) => {
    switch (action.type) {
      case "INPUT_CHANGE":
        let formIsValid = true;
        for (const inputId in state.inputs) {
          if (inputId === action.inputId) {
            formIsValid = formIsValid && action.isValid;
          } else {
            formIsValid = formIsValid && state.inputs[inputId].isValid;
          }
        }

        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.inputId]: { value: action.value, isValid: action.isValid },
          },
          isValid: formIsValid,
        };
      default:
        return state;
    }
  };

  const initialState = {
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  };

  const [formState, dispatch] = useReducer(formReducer, initialState);

  const onInputHandler = useCallback(
    (id, value, isValid) => {
      dispatch({
        type: "INPUT_CHANGE",
        value: value,
        isValid: isValid,
        inputId: id,
      });
    },
    [dispatch]
  );

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("add blog", formState.inputs);
  };

  return (
    <form className="blog-form" onSubmit={onSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInputHandler={onInputHandler}
      />
      <Input
        id="description"
        element="textarea"
        type="text"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(10)]}
        errorText="Please enter a valid description (at least 10 characters)."
        onInputHandler={onInputHandler}
      />
      <div className="text-right">
        <Button type="submit" disabled={!formState.isValid}>
          Add Blog
        </Button>
      </div>
    </form>
  );
}

export default NewBlog;
