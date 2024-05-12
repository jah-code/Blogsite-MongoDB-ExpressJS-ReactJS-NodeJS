import React from "react";
import CategoryItem from "./CategoryItem";

function CategoryList() {
  const categories = [
    "Travel",
    "Food",
    "Personal",
    "Sports",
    "Health",
    "Lifestyle",
  ];

  return (
    <ul className="grid grid-cols-4 gap-6">
      {categories.map((category) => {
        return <CategoryItem key={category} name={category} />;
      })}
    </ul>
  );
}

export default CategoryList;
