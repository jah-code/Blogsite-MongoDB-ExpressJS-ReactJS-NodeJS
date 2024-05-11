import React, { Fragment, useContext, useState } from "react";
import { useForm } from "../components/shared/hooks/form-hook";
import Input from "../components/shared/forms/Input";
import Button from "../components/shared/uiElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../components/shared/util/validators";
import "./Auth.css";
import { AuthContext } from "../components/shared/context/auth-context";
import LoadingSpinner from "../components/shared/uiElements/LoadingSpinner";
import ErrorModal from "../components/shared/uiElements/ErrorModal";

function Auth() {
  const authContext = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, onInputHandler, setFormData] = useForm(
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

  const onSwitchHandler = () => {
    if (isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const onSubmitLoginHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    if (isLoginMode) {
      try {
        const response = await fetch("http://localhost:8080/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message);
        }
        setIsLoading(false);
        authContext.login();
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
    } else {
      try {
        const response = await fetch("http://localhost:8080/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message);
        }
        setIsLoading(false);
        authContext.login();
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
    }

    setIsLoading(false);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Fragment>
      <div className="auth-form">
        {isLoading && <LoadingSpinner asOverlay />}
        {isLoginMode ? <h2>Login</h2> : <h2>Signup</h2>}
        <form onSubmit={onSubmitLoginHandler}>
          {!isLoginMode && (
            <Input
              id="name"
              element="input"
              type="text"
              label="Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your full name."
              onInputHandler={onInputHandler}
            />
          )}
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
            errorText="Please enter a your email address."
            onInputHandler={onInputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "Login" : "Signup"}
          </Button>
        </form>
        <Button inverse onClick={onSwitchHandler}>
          Switch to {isLoginMode ? "Login" : "Signup"}
        </Button>
      </div>
      <ErrorModal error={error} onClear={errorHandler} />
    </Fragment>
  );
}

export default Auth;
