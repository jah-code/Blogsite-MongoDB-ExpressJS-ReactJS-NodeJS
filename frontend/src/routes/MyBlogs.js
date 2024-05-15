import { Fragment, useEffect, useState, useContext } from "react";
import MyBlogList from "../components/myBlogs/MyBlogList";
import { useFetch } from "../components/shared/hooks/request-hook";
import LoadingSpinner from "../components/shared/uiElements/LoadingSpinner";
import ErrorModal from "../components/shared/uiElements/ErrorModal";
import { AuthContext } from "../components/shared/context/auth-context";

function MyBlogs() {
  const { isLoading, error, request, clearError } = useFetch();
  const [myBlogs, setMyBlogs] = useState([]);

  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const result = await request(
          `http://localhost:8080/api/blogs/user/${auth.userId}`
        );
        setMyBlogs(result.data);
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
      {!isLoading && myBlogs && <MyBlogList items={myBlogs} />}
      {<ErrorModal error={error} onClear={clearError} />}
    </Fragment>
  );
}

export default MyBlogs;
