import { Fragment } from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Home from "./routes/Home";
import Contact from "./routes/Contact";
import NewBlog from "./routes/NewBlog";
import MyBlogs from "./routes/MyBlogs";
import Blogs from "./routes/Blogs";
import CategoryBlogs from "./routes/CategoryBlogs";
import SingleBlog from "./routes/SingleBlog";
import Auth from "./routes/Auth";
import UpdateBlog from "./components/myBlogs/UpdateBlog";
import MainNavigation from "./components/shared/navigation/MainNavigation";
import Card from "./components/shared/uiElements/Card";
import { AuthContext } from "./components/shared/context/auth-context";
import { useAuth } from "./components/shared/hooks/auth-hook";
import "./App.css";
import About from "./routes/About";

function App() {
  const { userId, token, login, logout } = useAuth();

  let routes;
  if (token) {
    routes = (
      <Fragment>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:category" element={<CategoryBlogs />} />
        <Route path="/blogs/:category/:id" element={<SingleBlog />} />
        <Route path="/my-blogs" element={<MyBlogs />} />
        <Route path="/add-new/my-blogs" element={<NewBlog />} />
        <Route path="/my-blogs/update/:id" element={<UpdateBlog />} />
        <Route path="/auth" element={<Navigate to={"/"} />} />
      </Fragment>
    );
  } else {
    routes = (
      <Fragment>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:category" element={<CategoryBlogs />} />
        <Route path="/blogs/:category/:id" element={<SingleBlog />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/my-blogs"
          element={
            <Card>
              <h3>You cannot access this page, please login.</h3>
            </Card>
          }
        />
      </Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <div className="m-8">
        <BrowserRouter>
          <MainNavigation />
          <main>
            <Routes>
              {routes}
              <Route
                path="*"
                element={
                  <Card>
                    <h3>This page cannot be found!</h3>
                  </Card>
                }
              />
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
