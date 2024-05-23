import React from "react";
import { Link } from "react-router-dom";
import Card from "../shared/uiElements/Card";

import { images } from "../../images/images";

function CategoryItem({ name }) {
  return (
    <li className="transition hover:-translate-y-1">
      <Card>
        <Link to={`/blogs/${name.toLowerCase()}`}>
          <div className="">
            <img src={images[name.toLowerCase()]} alt={name} />
          </div>
          <div className="text-xl pt-2 text-center">{name}</div>
        </Link>
      </Card>
    </li>
  );
}

export default CategoryItem;
