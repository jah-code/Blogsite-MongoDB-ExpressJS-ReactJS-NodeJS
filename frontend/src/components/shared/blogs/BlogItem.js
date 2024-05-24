import React, { useState, Fragment, useContext, useEffect } from "react";
import Card from "../uiElements/Card";
import Button from "../uiElements/Button";
import "./BlogItem.css";
import { AuthContext } from "../context/auth-context";
import { useFetch } from "../hooks/request-hook";
import Modal from "../uiElements/Modal";
import ErrorModal from "../uiElements/ErrorModal";
import LoadingSpinner from "../uiElements/LoadingSpinner";

function BlogItem(props) {
  const [authName, setAuthName] = useState();

  const auth = useContext(AuthContext);
  const { userId } = auth;
  const { id, image, category, author, title, description, onDelete } = props;
  const { isLoading, error, request, clearError } = useFetch();

  const [showDelConfirmation, setShowDelConfirmation] = useState(false);

  const openDelConfirmationHandler = () => setShowDelConfirmation(true);
  const closeDelConfirmationHandler = () => setShowDelConfirmation(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await request(
          `${process.env.REACT_APP_BACKEND_URL}/users/${author}`
        );
        setAuthName(result.userName);
      } catch (err) {}
    };

    fetchUser();
  }, [request, author]);

  const confirmDeleteHandler = async () => {
    setShowDelConfirmation(false);
    try {
      await request(
        `${process.env.REACT_APP_BACKEND_URL}/blogs/${id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      onDelete(id);
    } catch (err) {}
  };

  return (
    <Fragment>
      <li className="mb-6">
        <Card className="text-center">
          {isLoading && <LoadingSpinner asOverLay />}
          <div className="lg:mx-20 sm:mx-0 img">
            <img
              src={`${process.env.REACT_APP_ASSET_URL}/${image}`}
              alt={title}
              className="object-cover h-80 size-full"
            />
          </div>
          <div className="mt-3">
            <div className="text-2xl">{title}</div>
            <i className="text-xs">
              Author: {authName} * {category.toUpperCase()}
            </i>
            <div className="text-sm mt-3 line-2-el">{description}</div>
          </div>
          <div className="mt-5">
            <Button to={`/blogs/${category}/${id}`}>View Blog</Button>
            {userId === author && (
              <Fragment>
                <Button to={`/my-blogs/update/${id}`}>Edit</Button>
                <Button onClick={openDelConfirmationHandler}>Delete</Button>
              </Fragment>
            )}
          </div>
        </Card>
      </li>
      <Modal
        show={showDelConfirmation}
        onCancel={closeDelConfirmationHandler}
        header="Are you sure?"
        footerClass="item__modal-actions"
        footer={
          <Fragment>
            <Button onClick={confirmDeleteHandler}>Delete</Button>
            <Button onClick={closeDelConfirmationHandler}>Cancel</Button>
          </Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this blog? Please note that it will
          be permanently deleted.
        </p>
      </Modal>
      <ErrorModal error={error} onClear={clearError} />
    </Fragment>
  );
}

export default BlogItem;
