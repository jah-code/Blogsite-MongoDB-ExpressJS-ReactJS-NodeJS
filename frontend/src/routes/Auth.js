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
import { useFetch } from "../components/shared/hooks/request-hook";
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const { isLoading, error, request, clearError } = useFetch();

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

    if (isLoginMode) {
      try {
        const result = await request(
          "http://localhost:8080/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        authContext.login(result.userId, result.token);
        navigate("/");
      } catch (err) {}
    } else {
      try {
        const result = await request(
          "http://localhost:8080/api/users/signup",
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        authContext.login(result.userId, result.token);
        navigate("/");
      } catch (err) {}
    }
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
      <ErrorModal error={error} onClear={clearError} />
    </Fragment>
  );
}

export default Auth;
