import React from "react";
import Card from "../shared/uiElements/Card";
import BlogItem from "../shared/blogs/BlogItem";

function BlogList({ items }) {
  if (!items.length) {
    return (
      <div className="place-list snap-center">
        <Card>
          <h2>There are no blogs found.</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul>
      {items.map((blog) => (
        <BlogItem
          key={blog.id}
          id={blog.id}
          image={blog.image}
          category={blog.category}
          author={blog.author}
          title={blog.title}
          description={blog.description}
        />
      ))}
    </ul>
  );
}

export default BlogList;
