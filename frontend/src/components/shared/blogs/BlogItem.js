import React, { useState, Fragment, useContext } from "react";
import Card from "../uiElements/Card";
import Button from "../uiElements/Button";
import "./BlogItem.css";
import { AuthContext } from "../context/auth-context";
import { useFetch } from "../hooks/request-hook";
import Modal from "../uiElements/Modal";
import ErrorModal from "../uiElements/ErrorModal";
import LoadingSpinner from "../uiElements/LoadingSpinner";

function BlogItem(props) {
  const auth = useContext(AuthContext);
  const { userId } = auth;
  const { id, image, category, author, title, description, onDelete } = props;
  const { isLoading, error, request, clearError } = useFetch();

  const [showDelConfirmation, setShowDelConfirmation] = useState(false);

  const openDelConfirmationHandler = () => setShowDelConfirmation(true);
  const closeDelConfirmationHandler = () => setShowDelConfirmation(false);

  const confirmDeleteHandler = async () => {
    setShowDelConfirmation(false);
    try {
      await request(`http://localhost:8080/api/blogs/${id}`, "DELETE", {
        "Content-Type": "application/json",
      });
      onDelete(id);
    } catch (err) {}
  };

  return (
    <Fragment>
      <li className="mb-6">
        <Card className="text-center">
          {isLoading && <LoadingSpinner asOverLay />}
          <div className="mx-20 img">
            <img
              src={`http://localhost:8080/${image}`}
              alt={title}
              className="object-cover h-80 size-full"
            />
          </div>
          <div className="mt-3">
            <div className="text-2xl">{title}</div>
            <i className="text-xs">
              Author: {author} * {category.toUpperCase()}
            </i>
            <div className="text-sm mt-3">{description}</div>
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
