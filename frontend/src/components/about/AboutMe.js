import React from "react";
import Card from "../shared/uiElements/Card";

function AboutMe() {
  return (
    <Card className="mb-8">
      <div className="grid grid-cols-2">
        <div className="text-center">
          <img
            src={require("../../images/lijah-photo.jpg")}
            alt="Lijah Garcia"
            className="h-80 m-auto"
          />
        </div>
        <div className="p-col">
          <h1 className="mb-4">About Me</h1>
          <p>
            Hi, my name is Lijah Garcia, 30 years old, from Tarlac, Philippines.
            I am a passionate and driven frontend developer. I love to travel
            and explore new things in life. I enjoy meeting different kinds of
            people, discovering their cultures and trying their local foods. I
            also love music and my favorite bands are Ben & Ben and Boyce
            Avenue. I'm a huge fan of social medias. I am very fascinated on how
            they started it and gave the ability to connect all the people using
            these applications. The impact of making the people more creative is
            also amazing. In my free time, I just stay in the house, social
            medias and more on playing with my niece.
          </p>
        </div>
      </div>
    </Card>
  );
}

export default AboutMe;
