"use client";

import { title } from "@/components/primitives";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Input, Textarea } from "@nextui-org/input";

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

import FroalaEditorComponent from "react-froala-wysiwyg";
import { useState } from "react";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

export default function Write() {
  const [content, setContent] = useState("");
  return (
    <section className="flex flex-row justify-between flex-wrap">
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

        <CardBody className="gap-4">
          <Input type="text" label="Company " isRequired />
          <Input type="text" label="Position " isRequired />
          <Input type="number" label="No of Rounds " isRequired />

          <RadioGroup
            label="Passed the Interview?"
            color="primary"
            defaultValue="yes"
            orientation="horizontal"
            isRequired
          >
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </RadioGroup>

          <RadioGroup
            label="Mode of the Interview"
            color="primary"
            defaultValue="off-campus"
            orientation="horizontal"
            isRequired
          >
            <Radio value="on-campus">On-Campus</Radio>
            <Radio value="off-campus">Off-Campus</Radio>
          </RadioGroup>

          <Input
            type="date"
            label="Date of the Interview"
            labelPlacement="outside-left"
            isRequired
          />

          <Textarea
            label="Overview"
            maxLength={280}
            description="Enter a concise overview of your interview experience in less than 280 characters."
            isRequired
          />
        </CardBody>
      </Card>

      <section className="max-w-[700px]">
        <FroalaEditorComponent
          tag="textarea"
          model={content}
          onModelChange={(data: any) => setContent(data)}
        />
        <FroalaEditorView model={content} />
      </section>
    </section>
  );
}
