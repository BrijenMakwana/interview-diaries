import React, { FC } from "react";
import { title } from "@/components/primitives";

interface ISectionHeading {
  text: string;
  highlightedText: string;
}

const SectionHeading: FC<ISectionHeading> = (props) => {
  const { text, highlightedText } = props;

  return (
    <h3
      className={title()}
      style={{
        textTransform: "capitalize",
      }}
    >
      {text}{" "}
      <span className={title({ color: "yellow" })}>{highlightedText}</span>
    </h3>
  );
};

export default SectionHeading;
