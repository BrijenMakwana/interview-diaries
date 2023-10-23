"use client";

import CustomInput from "@/components/custom-input";
import { title } from "@/components/primitives";
import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  RadioGroup,
  Radio,
  Input,
} from "@nextui-org/react";

export default function Write() {
  return (
    <section>
      <Card className="max-w-[400px]">
        <CardHeader>
          <h1
            className={title({ color: "yellow" })}
            style={{
              textTransform: "capitalize",
              fontSize: "1.5rem",
            }}
          >
            interview information
          </h1>
        </CardHeader>

        <Divider />

        <CardBody className="gap-3">
          <CustomInput type="text" label="Company " />
          <CustomInput type="text" label="Position " />
          <CustomInput type="number" label="No of Rounds " />

          <RadioGroup
            label="Passed the Interview?"
            color="primary"
            defaultValue="yes"
            orientation="horizontal"
          >
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </RadioGroup>

          <Input
            type="date"
            label="Date of the Interview"
            labelPlacement="outside-left"
          />
        </CardBody>
      </Card>
    </section>
  );
}
