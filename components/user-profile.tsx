"use client";

import Image from "next/image";
import { title } from "@/components/primitives";

const UserProfile = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-5">
      <Image src="/brijen.png" alt="Brijen Makwana" height={300} width={200} />

      <h1
        className={title({ color: "yellow" })}
        style={{
          textTransform: "capitalize",
          fontSize: "2.5rem",
        }}
      >
        brijen makwana
      </h1>

      <p>
        I'm a full-time mobile developer with a passion for building impactful
        projects. Specializing in React Native and React, I've successfully
        delivered multiple web apps and published applications on the Google
        Play Store.
      </p>
      <p>
        In addition to my development work, I'm an active contributor to the
        'ProgrammingKnowledge' YouTube channel, which boasts a community of over
        1.7 million subscribers. My role involves creating educational content
        and tutorials on various programming topics.
      </p>

      <p>
        I'm also a content mentor at GeeksForGeeks, where I share my knowledge
        through written articles and create educational video tutorials. My
        commitment to innovation and dedication to software development drive me
        to continue making a positive impact in the tech industry.
      </p>
    </section>
  );
};

export default UserProfile;
