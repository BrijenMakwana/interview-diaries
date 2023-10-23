import React, { FC } from "react";
import { Input } from "@nextui-org/react";

interface ICustomInput {
  type: "text" | "number";
  label: string;
}

const CustomInput: FC<ICustomInput> = (props) => {
  const { type, label } = props;

  return <Input type={type} label={label} />;
};

export default CustomInput;
