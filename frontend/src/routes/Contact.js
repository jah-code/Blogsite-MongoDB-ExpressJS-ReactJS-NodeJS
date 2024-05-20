import { Link } from "react-router-dom";
import Card from "../components/shared/uiElements/Card";

function Contact() {
  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-4 p-4 pb-6">
        <h1>Contact Information</h1>
        <hr />
        <div>
          <label className="font-medium">Contact Number:</label>&nbsp;
          <span>+639 998 418 1840</span>
        </div>
        <div>
          <label className="font-medium">Email Address:</label>&nbsp;
          <Link to="mailto:garcialijah@gmail.com">garcialijah@gmail.com</Link>
        </div>
        <div>
          <label className="font-medium">Linkedin:</label>&nbsp;
          <Link to="https://www.linkedin.com/in/lijah-garcia/" target="_blank">
            https://www.linkedin.com/in/lijah-garcia/
          </Link>
        </div>
        <div>
          <label className="font-medium">Github Account:</label>&nbsp;
          <Link to={"https://github.com/jah-code"} target="_blank">
            https://github.com/jah-code
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default Contact;
