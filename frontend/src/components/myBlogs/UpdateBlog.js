import { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../shared/forms/Input";
import Button from "../shared/uiElements/Button";
import "./UpdateBlog.css";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../shared/util/validators";
import { useForm } from "../shared/hooks/form-hook";
import { useFetch } from "../shared/hooks/request-hook";
import LoadingSpinner from "../shared/uiElements/LoadingSpinner";
import Card from "../shared/uiElements/Card";
import ErrorModal from "../shared/uiElements/ErrorModal";

function UpdateBlog() {
  const navigate = useNavigate();
  const blogId = useParams().id;
  const [selectedBlog, setSelectedBlog] = useState();

  const { isLoading, error, request, clearError } = useFetch();
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
    },
    false
  );

  const onSubmitUpdateHandler = async (e) => {
    e.preventDefault();
    try {
      await request(
        `http://localhost:8080/api/blogs/${blogId}`,
        "PATCH",
        {
          "Content-Type": "application/json",
        },
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        })
      );
      navigate(`/blogs/${selectedBlog.category}/${blogId}`);
    } catch (err) {}
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const result = await request(
          `http://localhost:8080/api/blogs/${blogId}`
        );
        setSelectedBlog(result.data);
        setFormData(
          {
            title: {
              value: result.data.title,
              isValid: true,
            },
            description: {
              value: result.data.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };

    fetchBlogs();
  }, [request, blogId, setFormData]);

  if (isLoading) {
    return (
      <div className="text-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!selectedBlog && !error) {
    return (
      <div className="text-center">
        <Card>
          <h2>There's no blog found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <Fragment>
      {!isLoading && selectedBlog && (
        <form className="blog-form" onSubmit={onSubmitUpdateHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInputHandler={onInputHandler}
            initialValue={selectedBlog.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            type="text"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(10)]}
            errorText="Please enter a valid description (at least 10 characters)."
            onInputHandler={onInputHandler}
            initialValue={selectedBlog.description}
            initialValid={true}
          />
          <div className="text-right">
            <Button type="submit" disabled={!formState.isValid}>
              Edit Blog
            </Button>
          </div>
        </form>
      )}
      <ErrorModal error={error} onClear={clearError} />
    </Fragment>
  );
}

export default UpdateBlog;
