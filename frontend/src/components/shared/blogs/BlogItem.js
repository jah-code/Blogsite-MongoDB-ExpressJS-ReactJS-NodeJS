import React, { Fragment, useContext } from "react";
import Card from "../uiElements/Card";
import Button from "../uiElements/Button";
import "./BlogItem.css";
import { AuthContext } from "../context/auth-context";

function BlogItem(props) {
  const auth = useContext(AuthContext);
  const { isLoggedIn } = auth;
  const { id, image, category, author, title, description } = props;
  return (
    <li className="mb-6">
      <Card className="text-center">
        <div className="mx-20 img">
          <img
            src={image}
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
          {isLoggedIn && (
            <Fragment>
              <Button to={`/update/my-blog/${id}`}>Edit</Button>
              <Button>Delete</Button>
            </Fragment>
          )}
        </div>
      </Card>
    </li>
  );
}

export default BlogItem;
