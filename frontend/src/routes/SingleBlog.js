import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ViewSingleBlog from "../components/shared/blogs/ViewSingleBlog";
import { useFetch } from "../components/shared/hooks/request-hook";
import LoadingSpinner from "../components/shared/uiElements/LoadingSpinner";
import ErrorModal from "../components/shared/uiElements/ErrorModal";

function SingleBlog() {
  const [blog, setBlog] = useState();
  const blogId = useParams().id;
  const { isLoading, error, request, clearError } = useFetch();

  useEffect(() => {
    const fetchBlog = async () => {
      const result = await request(
        `${process.env.REACT_APP_BACKEND_URL}/blogs/${blogId}`
      );
      setBlog(result.data);
    };

    fetchBlog();
  }, [request, blogId]);

  return (
    <Fragment>
      {isLoading && (
        <div className="text-center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && blog && (
        <ViewSingleBlog
          id={blog.id}
          image={blog.image}
          category={blog.category}
          author={blog.author}
          title={blog.title}
          description={blog.description}
          others={blog}
        />
      )}
      <ErrorModal error={error} onClear={clearError} />
    </Fragment>
  );
}

export default SingleBlog;
