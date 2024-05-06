import { Card } from "antd";
import React from "react";
import BlogItem from "../shared/blogs/BlogItem";

function MyBlogList({ items }) {
  if (!items.length) {
    return (
      <div className="place-list snap-center">
        <Card>
          <h2>You haven't shared any blogs yet.</h2>
          <button>Create One</button>
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
          image={blog.imageUrl}
          category={blog.category}
          author={blog.author}
          title={blog.title}
          description={blog.description}
        />
      ))}
    </ul>
  );
}

export default MyBlogList;
