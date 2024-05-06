import React from "react";
import { useParams } from "react-router-dom";
import CategoryBlogList from "../components/blogs/CategoryBlogList";

const DUMMY_BLOGS = [
  {
    id: "mb1",
    author: "Lijah Garcia",
    authorId: "auth1",
    title: "My blog 1",
    description: "One of the best travel bla bla",
    imageUrl:
      "https://as1.ftcdn.net/v2/jpg/02/45/68/40/1000_F_245684006_e55tOria5okQtKmiLLbY30NgEHTIB0Og.jpg",
    category: "travel",
  },
  {
    id: "mb2",
    author: "Lijah Garcia",
    authorId: "auth1",
    title: "My blog 2",
    description: "One of the best travel bla bla 2",
    imageUrl:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "foods",
  },
  {
    id: "mb3",
    author: "Lae Faith",
    authorId: "auth2",
    title: "My blog 3",
    description: "One of the best travel bla bla 3",
    imageUrl:
      "https://as2.ftcdn.net/v2/jpg/01/96/99/03/1000_F_196990370_mIPZ4fBBdYjcJV5nk09unnaegf9WKxVx.jpg",
    category: "travel",
  },
];

function CategoryBlogs() {
  const category = useParams().category;

  const blogs = DUMMY_BLOGS.filter((blog) => blog.category === category);
  return <CategoryBlogList items={blogs} />;
}

export default CategoryBlogs;
