import React from "react";
import Input from "../components/shared/forms/Input";
import Button from "../components/shared/uiElements/Button";
import "./NewBlog.css";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../components/shared/util/validators";
import { useForm } from "../components/shared/hooks/form-hook";

function NewBlog() {
  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const onSubmitAddHandler = (e) => {
    e.preventDefault();
    console.log("add blog", formState.inputs);
  };

  return (
    <form className="blog-form" onSubmit={onSubmitAddHandler}>
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
