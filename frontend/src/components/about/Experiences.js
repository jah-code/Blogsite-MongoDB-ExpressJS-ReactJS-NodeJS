import React from "react";
import Card from "../shared/uiElements/Card";

function Experiences() {
  return (
    <Card className="mb-8">
      <div className="grid grid-cols-2">
        <div className="exp-col">
          <h1 className="mb-4">Experiences</h1>
          <div className="p-row">
            <label className="font-medium">
              Frontend Engineer (ReactJS) - remote
            </label>
            &nbsp;
            <p>Managed Solutions Pty Ltd (Australia)</p>
            <p className="date">June 2022 - October 2023</p>
          </div>
          <div className="p-row">
            <label className="font-medium">Frontend Engineer</label>
            &nbsp;
            <p>B2B Commerce Sdn Bhd (Malaysia)</p>
            <p className="date">November 2017 - May 2022</p>
          </div>
          <div className="p-row">
            <label className="font-medium">
              Software Engineer (Lead Web Developer)
            </label>
            &nbsp;
            <p>Androbotics Clark Inc. (Philippines)</p>
            <p className="date">August 2016 to September 2017</p>
          </div>
          <div className="p-row">
            <label className="font-medium">Graphic Artist</label>
            &nbsp;
            <p>American Technologies Inc. – Pixografx (Philippines)</p>
            <p className="date">June 2014 to May 2016</p>
          </div>
        </div>
        <div className="text-center">
          <img
            src={require("../../images/experience.png")}
            alt="Lijah Garcia"
            className="h-80 m-auto"
          />
        </div>
      </div>
    </Card>
  );
}

export default Experiences;
