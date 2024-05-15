import React, { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../uiElements/Card";
import Button from "../uiElements/Button";
import Modal from "../uiElements/Modal";
import Map from "../uiElements/Map";
import { AuthContext } from "../context/auth-context";
import { useFetch } from "../hooks/request-hook";
import LoadingSpinner from "../uiElements/LoadingSpinner";
import ErrorModal from "../uiElements/ErrorModal";

function ViewSingleBlog(props) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const { userId } = auth;
  const { id, image, category, author, title, description, others } = props;
  const { isLoading, error, request, clearError } = useFetch();

  const [showMap, setShowMap] = useState(false);
  const [showDelConfirmation, setShowDelConfirmation] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const openDelConfirmationHandler = () => setShowDelConfirmation(true);
  const closeDelConfirmationHandler = () => setShowDelConfirmation(false);

  const confirmDeleteHandler = async () => {
    try {
      await request(`http://localhost:8080/api/blogs/${id}`, "DELETE", {
        "Content-Type": "application/json",
      });
      navigate("/my-blogs");
    } catch (err) {}
  };

  return (
    <Fragment>
      <div className='className="mb-6"'>
        <Card className="text-center">
          {isLoading && (
            <div className="text-center">
              <LoadingSpinner />
            </div>
          )}
          <div className="mx-10 img">
            <img
              src={image}
              alt={title}
              className="object-cover max-h-[450px] size-full"
            />
          </div>
          <div className="mt-3">
            <div className="text-2xl">{title}</div>
            <i className="text-xs">
              Author: {author} * {category}
            </i>
            <div className="text-sm mt-3">{description}</div>
          </div>
          <div className="mt-5">
            {others.coordinates && (
              <Button onClick={openMapHandler}>View Map</Button>
            )}
            {userId === author && (
              <Fragment>
                <Button to={`/my-blogs/update/${id}`}>Edit</Button>
                <Button onClick={openDelConfirmationHandler}>Delete</Button>
              </Fragment>
            )}
          </div>
        </Card>
      </div>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={others.address}
        contentClass="item__modal-content"
        footerClass="item__modal-actions"
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className="map-container w-full h-80">
          <Map center={others.coordinates} zoom={13} />
        </div>
      </Modal>
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

export default ViewSingleBlog;
