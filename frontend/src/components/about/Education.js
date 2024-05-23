import React from "react";
import Card from "../shared/uiElements/Card";

function Education() {
  return (
    <Card className="mb-8">
      <div className="grid grid-cols-2">
        <div className="text-center">
          <img
            src={require("../../images/education.png")}
            alt="My Educations"
            className="h-64 m-auto"
          />
        </div>
        <div className="text-center">
          <h1 className="mb-4">Educations</h1>
          <div className="p-row">
            <label className="font-medium">Tertiary</label>
            &nbsp;
            <p>Bachelor of Science in Information Technology</p>
            <p className="date">Tarlac State University (2010-2014)</p>
          </div>
          <div className="p-row">
            <label className="font-medium">Secondary:</label>
            &nbsp;
            <p className="date">Aringin High School (2006-2010)</p>
          </div>
          <div className="p-row">
            <label className="font-medium">Elementary</label>
            &nbsp;
            <p className="date">Aringin Elementary School (2000-2006)</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Education;
