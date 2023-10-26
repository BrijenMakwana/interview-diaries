import { FC } from "react";
import { title } from "./primitives";

interface IPosition {
  position: string;
}

const DeveloperPosition: FC<IPosition> = (props) => {
  const { position } = props;

  return (
    <span
      className={title({ color: "yellow" })}
      style={{
        fontSize: "0.9rem",
        fontWeight: "bold",
        textTransform: "capitalize",
      }}
    >
      {position}
    </span>
  );
};

export default DeveloperPosition;
