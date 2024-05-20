import React, { useState, Fragment, useLayoutEffect } from "react";
import BlogList from "../components/blogs/BlogList";
import LoadingSpinner from "../components/shared/uiElements/LoadingSpinner";
import ErrorModal from "../components/shared/uiElements/ErrorModal";
import { useFetch } from "../components/shared/hooks/request-hook";

function Blogs() {
  const { isLoading, error, request, clearError } = useFetch();
  const [blogs, setBlogs] = useState([]);

  useLayoutEffect(() => {
    const fetchBlogs = async () => {
      try {
        const result = await request("http://localhost:8080/api/blogs");
        setBlogs(result.data);
      } catch (err) {}
    };

    fetchBlogs();
  }, [request]);

  return (
    <Fragment>
      {isLoading && (
        <div className="text-center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && blogs && <BlogList items={blogs} />}
      <ErrorModal error={error} onClear={clearError} />
    </Fragment>
  );
}

export default Blogs;
