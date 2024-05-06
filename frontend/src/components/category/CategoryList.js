import React from "react";
import "./CategoryList.css";
import CategoryItem from "./CategoryItem";
import Card from "../shared/uiElements/Card";

function CategoryList(props) {
  const { items } = props;

  if (!items.length) {
    return (
      <Card>
        <div className="snap-center">
          <h2>No category found.</h2>
        </div>
      </Card>
    );
  }

  return (
    <ul className="grid grid-cols-4 gap-6">
      {items.map((category) => {
        return (
          <CategoryItem
            key={category.id}
            id={category.id}
            image={category.image}
            name={category.name}
            category={category.category}
            count={category.count}
          />
        );
      })}
    </ul>
  );
}

export default CategoryList;
