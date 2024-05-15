import { Card } from "antd";
import React from "react";
import BlogItem from "../shared/blogs/BlogItem";
import Button from "../shared/uiElements/Button";

function MyBlogList({ items, onDeleteBlogHandler }) {
  if (!items.length) {
    return (
      <div className="place-list snap-center">
        <Card>
          <h2>You haven't shared any blogs yet.</h2>
          <Button to="/add-new/my-blogs">Create One</Button>
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
          onDelete={onDeleteBlogHandler}
        />
      ))}
    </ul>
  );
}

export default MyBlogList;
