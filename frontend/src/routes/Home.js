import { Fragment } from "react";
import CategoryList from "../components/category/CategoryList";
import Card from "../components/shared/uiElements/Card";
import Button from "../components/shared/uiElements/Button";

function Home() {
  return (
    <Fragment>
      <Card>
        <div className="text-center">
          <h1>Welcome</h1>
          <p>
            Please feel free to explore this website. The sign up and login
            authentication, add, edit and delete blog are always allowed.
          </p>
          <p>
            For more information about me, kindly click the About Me button
            below.
          </p>
          <div className="mt-4">
            <Button to="/about">About Me</Button>
            <Button
              to="https://github.com/jah-code/Blogsite-MongoDB-ExpressJS-ReactJS-NodeJS"
              target="_blank"
            >
              Github Link
            </Button>
          </div>
        </div>
      </Card>
      <br />
      <CategoryList />
    </Fragment>
  );
}

export default Home;
