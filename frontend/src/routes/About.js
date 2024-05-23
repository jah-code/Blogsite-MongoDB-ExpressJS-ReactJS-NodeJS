import React from "react";
import "./About.css";
import AboutMe from "../components/about/AboutMe";
import Experiences from "../components/about/Experiences";
import Education from "../components/about/Education";
import Skills from "../components/about/Skills";

function About() {
  return (
    <div>
      <AboutMe />
      <Experiences />
      <Education />
      <Skills />
    </div>
  );
}

export default About;
