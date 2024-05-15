import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryBlogList from "../components/blogs/CategoryBlogList";
import { useFetch } from "../components/shared/hooks/request-hook";
import LoadingSpinner from "../components/shared/uiElements/LoadingSpinner";
import ErrorModal from "../components/shared/uiElements/ErrorModal";

function CategoryBlogs() {
  const [blogs, setBlogs] = useState([]);
  const { isLoading, error, request, clearError } = useFetch();
  const category = useParams().category;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const result = await request("http://localhost:8080/api/blogs");
        setBlogs(result.data);
      } catch (err) {}
    };

    fetchBlogs();
  }, []);

  const blogsByCategory = blogs.filter((blog) => blog.category === category);

  return (
    <Fragment>
      {isLoading && (
        <div className="text-center">
          <LoadingSpinner />
        </div>
      )}
      <CategoryBlogList items={blogsByCategory} />;
      <ErrorModal error={error} onClear={clearError} />
    </Fragment>
  );
}

export default CategoryBlogs;
