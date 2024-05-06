import React from "react";
import CategoryList from "../components/category/CategoryList";

function Category() {
  const CATEGORY = [
    {
      id: "c1",
      name: "Travel",
      category: "travel",
      image:
        "https://as2.ftcdn.net/v2/jpg/02/80/82/81/1000_F_280828158_ZZ2W8atYMHiSkLoDzxgDHNhdmXJ31jCR.jpg",
      count: 3,
    },
    {
      id: "c2",
      name: "Foods",
      category: "foods",
      image:
        "https://nypost.com/wp-content/uploads/sites/2/2024/02/ozempic-silence-food-noise-teach-77125518.jpg?resize=878,585&quality=75&strip=all",
      count: 2,
    },
  ];
  return <CategoryList items={CATEGORY} />;
}

export default Category;
