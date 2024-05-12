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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Fragment>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:category" element={<CategoryBlogs />} />
        <Route path="/blogs/:category/:id" element={<SingleBlog />} />
        <Route path="/my-blogs" element={<MyBlogs />} />
        <Route path="/add-new/my-blogs" element={<NewBlog />} />
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
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
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
