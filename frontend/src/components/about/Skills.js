import React from "react";
import Card from "../shared/uiElements/Card";

function Skills() {
  return (
    <Card className="mb-8">
      <div className="grid lg:grid-cols-2 md:grid-cols-1">
        <div className="text-center">
          <h1 className="mb-4">Technical Skills</h1>
          <div>
            HTML, CSS, SASS/LESS, Javascript, React JS, React Hooks, Jquery,
            Nodejs, ExpressJS, Redux, Redux Saga, Jest, Typescript, ES6,
            Bootstrap, MaterialUI, Antd, DVA, MongoDB, Github, Butbucket, Agile,
            Kanban, Wordpress, Photoshop
          </div>
          <br />
          <h1 className="mb-4">Personal Skills</h1>
          <div>
            Creativity, Problem Solving/Reasoning, Good Decision Making, Time
            Management, Leadership, Teamwork
          </div>
        </div>
        <div className="text-center">
          <img
            src="/assets/images/tools.png"
            alt="Lijah Garcia"
            className="h-64 m-auto hover:scale-110 transition"
          />
        </div>
      </div>
    </Card>
  );
}

export default Skills;
