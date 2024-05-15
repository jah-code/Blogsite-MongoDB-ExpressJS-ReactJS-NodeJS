import { Fragment, useCallback, useState } from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Home from "./routes/Home";
import NewBlog from "./routes/NewBlog";
import MainNavigation from "./components/shared/navigation/MainNavigation";
import MyBlogs from "./routes/MyBlogs";
import Blogs from "./routes/Blogs";
import CategoryBlogs from "./routes/CategoryBlogs";
import SingleBlog from "./routes/SingleBlog";
import Auth from "./routes/Auth";
import { AuthContext } from "./components/shared/context/auth-context";
import "./App.css";
import UpdateBlog from "./components/myBlogs/UpdateBlog";

function App() {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  let routes;
  if (token) {
    routes = (
      <Fragment>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:category" element={<CategoryBlogs />} />
        <Route path="/blogs/:category/:id" element={<SingleBlog />} />
        <Route path="/my-blogs" element={<MyBlogs />} />
        <Route path="/add-new/my-blogs" element={<NewBlog />} />
        <Route path="/my-blogs/update/:id" element={<UpdateBlog />} />
        <Route path="/auth" element={<Navigate to="/" />} />
      </Fragment>
    );
  } else {
    routes = (
      <Fragment>
        <Route path="/" element={<Home />} exact />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:category" element={<CategoryBlogs />} />
        <Route path="/blogs/:category/:id" element={<SingleBlog />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
        userId: userId,
      }}
    >
      <div className="m-8">
        <BrowserRouter>
          <MainNavigation />
          <main>
            <Routes>{routes}</Routes>
          </main>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
