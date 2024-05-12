import React, { Fragment, useContext, useState } from "react";
import Card from "../uiElements/Card";
import Button from "../uiElements/Button";
import Modal from "../uiElements/Modal";
import Map from "../uiElements/Map";
import { AuthContext } from "../context/auth-context";

function ViewSingleBlog(props) {
  const auth = useContext(AuthContext);
  const { isLoggedIn } = auth;
  const { id, image, category, author, title, description, others } = props;

  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  console.log(("prop", props));

  return (
    <Fragment>
      <div className='className="mb-6"'>
        <Card className="text-center">
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
            {category === "travel" && (
              <Button onClick={openMapHandler}>View Map</Button>
            )}
            {isLoggedIn && (
              <Fragment>
                <Button>Edit</Button>
                <Button>Delete</Button>
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
    </Fragment>
  );
}

export default ViewSingleBlog;
