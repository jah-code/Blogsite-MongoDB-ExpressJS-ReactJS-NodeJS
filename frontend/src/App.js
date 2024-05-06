import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./routes/Home";
import NewBlog from "./routes/NewBlog";
import Category from "./routes/Category";
import MainNavigation from "./components/shared/navigation/MainNavigation";
import MyBlogs from "./routes/MyBlogs";
import Blogs from "./routes/Blogs";
import CategoryBlogs from "./routes/CategoryBlogs";
import SingleBlog from "./routes/SingleBlog";

function App() {
  return (
    <div className="App">
      <div className="m-8">
        <BrowserRouter>
          <MainNavigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:category" element={<CategoryBlogs />} />
              <Route path="/blogs/:category/:id" element={<SingleBlog />} />
              <Route path="/my-blogs" element={<MyBlogs />} />
              <Route path="/my-blogs/add-new" element={<NewBlog />} />
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
