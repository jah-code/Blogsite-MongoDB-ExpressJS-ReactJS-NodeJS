import { Fragment, useContext, useEffect } from "react";
import Input from "../components/shared/forms/Input";
import Button from "../components/shared/uiElements/Button";
import Select from "../components/shared/forms/Select";
import { useForm } from "../components/shared/hooks/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../components/shared/util/validators";
import "./NewBlog.css";
import { AuthContext } from "../components/shared/context/auth-context";
import { useFetch } from "../components/shared/hooks/request-hook";
import LoadingSpinner from "../components/shared/uiElements/LoadingSpinner";
import ErrorModal from "../components/shared/uiElements/ErrorModal";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../components/shared/forms/ImageUpload";

function NewBlog() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const options = ["Food", "Sports", "Travel"];
  const [formState, onInputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      category: {
        value: options[0],
        isValid: true,
      },
      image: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const { isLoading, error, request, clearError } = useFetch();

  const onSubmitAddHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("category", formState.inputs.category.value);
      formData.append(
        "address",
        formState.inputs.address ? formState.inputs.address.value : undefined
      );
      formData.append("image", formState.inputs.image.value);
      await request(
        `${process.env.REACT_APP_BACKEND_URL}/blogs/add-new`,
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      navigate("/my-blogs");
    } catch (err) {
      console.log("error", err.message);
    }
  };

  const { category } = formState.inputs;
  useEffect(() => {
    const onSwitchCategory = () => {
      if (category.value === "Travel") {
        setFormData(
          {
            ...formState.inputs,
            address: {
              value: "",
            },
          },
          false
        );
      } else {
        setFormData(
          {
            ...formState.inputs,
            address: undefined,
          },
          formState.inputs.title.isValid &&
            formState.inputs.description.isValid &&
            category.isValid
        );
      }
    };

    onSwitchCategory();
  }, [category, setFormData]);

  return (
    <Fragment>
      <form className="blog-form" onSubmit={onSubmitAddHandler}>
        {isLoading && (
          <div className="text-center">
            <LoadingSpinner />
          </div>
        )}
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
          rows="20"
          validators={[VALIDATOR_MINLENGTH(10)]}
          errorText="Please enter a valid description (at least 10 characters)."
          onInputHandler={onInputHandler}
        />
        <Select
          id="category"
          label="Category"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please select a category."
          onInputHandler={onInputHandler}
          options={options}
        />
        {formState.inputs.category.value === "Travel" && (
          <Input
            id="address"
            element="input"
            type="text"
            label="Address"
            errorText="Please enter a valid description (at least 5 characters)."
            onInputHandler={onInputHandler}
          />
        )}
        <ImageUpload center id={"image"} onInput={onInputHandler} />
        <div className="text-right">
          <Button type="submit" disabled={!formState.isValid}>
            Add Blog
          </Button>
        </div>
      </form>
      <ErrorModal error={error} onClear={clearError} />
    </Fragment>
  );
}

export default NewBlog;
