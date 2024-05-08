import React, { Fragment } from "react";
import { useForm } from "../shared/hooks/form-hook";
import Input from "../shared/forms/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../shared/util/validators";
import Button from "../shared/uiElements/Button";

function Login() {
  const [formState, onInputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const onSubmitLoginHandler = (e) => {
    e.preventDefault();
    console.log("login", formState.inputs);
  };
  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form onSubmit={onSubmitLoginHandler}>
        <Input
          id="email"
          element="input"
          type="email"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter your email."
          onInputHandler={onInputHandler}
        />
        <Input
          id="password"
          element="input"
          type="text"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText="Please enter a valid email address."
          onInputHandler={onInputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
