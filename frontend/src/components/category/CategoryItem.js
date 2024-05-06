import React from "react";
import "./CategoryItem.css";
import { Link } from "react-router-dom";
import Card from "../shared/uiElements/Card";

function CategoryItem(props) {
  const { id, name, image, count, category } = props;

  return (
    <li>
      <Card>
        <Link to={`/blogs/${category}`}>
          <div className="">
            <img src={image} alt={name} />
          </div>
          <div className="text-xl pt-2 text-center">{name}</div>
        </Link>
      </Card>
    </li>
  );
}

export default CategoryItem;
