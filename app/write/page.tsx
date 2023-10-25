"use client";

import { title } from "@/components/primitives";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

import FroalaEditorComponent from "react-froala-wysiwyg";
import { useState } from "react";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

import { db, addDoc, collection } from "@/firebase/firebase";

export default function Write() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [company, setCompany] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [rounds, setRounds] = useState<number>(0);
  const [passed, setPassed] = useState<boolean>(true);
  const [mode, setMode] = useState<string>("off-campus");
  const [date, setDate] = useState<string>("");
  const [overview, setOverview] = useState<string>("");

  const addBlogToFirestore = async () => {
    setIsLoading(true);

    const interviewExperienceObj = {
      company,
      position,
      rounds,
      passed,
      mode,
      date,
      overview,
      content,
    };

    try {
      const docRef = await addDoc(collection(db, "interview-experiences"), {
        interviewExperienceObj,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-row justify-between flex-wrap gap-4">
      <Card className="max-w-[400px] h-fit">
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
          <Input
            type="text"
            label="Company"
            placeholder="Company you interviiewed for"
            isRequired
            onChange={(e) => setCompany(e.target.value)}
            value={company}
          />
          <Input
            type="text"
            label="Position"
            placeholder="e.g. Software Engineer"
            isRequired
            onChange={(e) => setPosition(e.target.value)}
            value={position}
          />
          <Input
            type="number"
            label="No of Rounds"
            isRequired
            onChange={(e) => setRounds(parseInt(e.target.value))}
            value={rounds.toLocaleString()}
          />

          <RadioGroup
            label="Passed the Interview?"
            color="primary"
            defaultValue="yes"
            orientation="horizontal"
            isRequired
            onChange={(e) => setPassed(e.target.value === "yes")}
            value={passed ? "yes" : "no"}
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
            onChange={(e) => setMode(e.target.value)}
            value={mode}
          >
            <Radio value="on-campus">On-Campus</Radio>
            <Radio value="off-campus">Off-Campus</Radio>
          </RadioGroup>

          <Input
            type="date"
            label="Date of the Interview"
            labelPlacement="outside-left"
            isRequired
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />

          <Textarea
            label="Overview"
            placeholder="e.g. I interviewed for a startup and got a good score"
            maxLength={280}
            description="Enter a concise overview of your interview experience in less than 280 characters."
            isRequired
            onChange={(e) => setOverview(e.target.value)}
            value={overview}
          />
        </CardBody>

        <CardFooter>
          <Button
            color="primary"
            onClick={addBlogToFirestore}
            fullWidth
            isLoading={isLoading}
          >
            Publish
          </Button>
        </CardFooter>
      </Card>

      <section className="max-w-[700px]">
        <FroalaEditorComponent
          tag="textarea"
          model={content}
          onModelChange={(data: any) => setContent(data)}
        />
        {/* <FroalaEditorView model={content} /> */}
      </section>
    </section>
  );
}
