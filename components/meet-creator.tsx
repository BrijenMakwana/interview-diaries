import React from "react";
import FeaturedDev from "./featured-dev";
import SectionHeading from "./section-heading";

const MeetCreator = () => {
  return (
    <>
      <SectionHeading text="meet the" highlightedText="creator" />

      <section className="flex flex-row items-center justify-evenly w-full flex-wrap gap-10">
        <FeaturedDev />

        <div className="inline-block max-w-lg text-center justify-center">
          <p>
            I'm a Full-Time Mobile & Web Developer with expertise in
            React-Native, React, Typescript, and JavaScript. I'm also a YouTube
            Creator with 1.7M+ subscribers, a GeeksForGeeks Mentor, and a Book
            Author. Let's explore technology together! 🕸️💡📚
          </p>

          <p className="mt-5">
            I developed this blogging platform as a contribution to the
            Webdecoded hackathon.
          </p>
        </div>
      </section>
    </>
  );
};

export default MeetCreator;
