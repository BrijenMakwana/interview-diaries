"use client";

import { title } from "@/components/primitives";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Tabs, Tab } from "@nextui-org/tabs";

import { useState } from "react";

import { db, addDoc, collection } from "@/firebase/firebase";
import CustomMarkdown from "@/components/custom-markdown";
import { Link } from "@nextui-org/link";

import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";

export default function Write() {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [company, setCompany] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [rounds, setRounds] = useState<number>(1);
  const [selected, setSelected] = useState<boolean>(true);
  const [mode, setMode] = useState<string>("off-campus");
  const [difficulty, setDifficulty] = useState<string>("intermediate");
  const [interviewDate, setInterviewDate] = useState<string>("2023-08-09");
  const [overview, setOverview] = useState<string>("");

  const { isSignedIn, user, isLoaded } = useUser();

  const { push } = useRouter();

  const addBlogToFirestore = async () => {
    setIsLoading(true);

    const interviewExperienceObj = {
      company,
      position,
      rounds,
      difficulty,
      selected,
      mode,
      interviewDate,
      overview,
      content,
      publishedDate: new Date().toISOString(),
      author: user?.fullName,
      email: user?.emailAddresses[0].emailAddress,
      comments: [],
    };

    try {
      const docRef = await addDoc(
        collection(db, "interview-experiences"),
        interviewExperienceObj
      );

      toast.success("Post created!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
      });

      push(`/blog/${docRef.id}`);
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
            placeholder="Company you interviewed for"
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
            min={1}
          />

          <RadioGroup
            label="Selected?"
            color="primary"
            defaultValue="yes"
            orientation="horizontal"
            isRequired
            onChange={(e) => setSelected(e.target.value === "yes")}
            value={selected ? "yes" : "no"}
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

          <RadioGroup
            label="Diffiiculty"
            color="primary"
            defaultValue="intermediate"
            orientation="horizontal"
            isRequired
            onChange={(e) => setDifficulty(e.target.value)}
            value={difficulty}
          >
            <Radio value="beginner">Beginner</Radio>
            <Radio value="intermediate">Intermediate</Radio>
            <Radio value="advanced">Advanced</Radio>
            <Radio value="expert">Expert</Radio>
          </RadioGroup>

          <Input
            type="date"
            label="Date of the Interview"
            labelPlacement="outside-left"
            isRequired
            onChange={(e) => setInterviewDate(e.target.value)}
            value={interviewDate}
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
            isDisabled={
              !company ||
              !position ||
              rounds === 0 ||
              selected === null ||
              !mode ||
              !difficulty ||
              !interviewDate ||
              !overview ||
              !content
            }
          >
            Publish
          </Button>
        </CardFooter>
      </Card>

      <section className="max-w-[700px] w-full">
        <Tabs aria-label="Options" color="warning">
          <Tab key="markdown" title="Markdown" className="h-full">
            {/* <Link
              isExternal
              showAnchorIcon
              href="https://www.markdownguide.org/cheat-sheet/"
            >
              Markdown Cheetsheet
            </Link> */}
            <textarea
              placeholder="Start typeing..."
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="w-full h-full p-4 rounded-xl resize-none outline-none"
            />
          </Tab>
          <Tab key="preview" title="Preview">
            <CustomMarkdown content={content} />
          </Tab>
        </Tabs>
      </section>
    </section>
  );
}
