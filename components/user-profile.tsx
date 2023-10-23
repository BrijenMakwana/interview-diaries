"use client";

import { Image } from "@nextui-org/react";
import { title } from "@/components/primitives";

const UserProfile = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-5">
      <Image
        width={150}
        height={150}
        src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT6-zJduQ4aEOLlWGBJMEQ27lUxk162szD-wFL-RVcXrY6nuFlT"
        alt="NextUI hero Image"
        isZoomed
        isBlurred
      />

      <h1
        className={title({ color: "silver" })}
        style={{
          textTransform: "capitalize",
          fontSize: "2.5rem",
        }}
      >
        jenna ortega
      </h1>
    </section>
  );
};

export default UserProfile;
