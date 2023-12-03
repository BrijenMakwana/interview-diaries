"use client";

import { title } from "@/components/primitives";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { FaCaretDown } from "react-icons/fa";

import { Divider } from "@nextui-org/divider";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Input, Textarea } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";

import { FC, useState, Dispatch, SetStateAction } from "react";

import { db, addDoc, collection } from "@/firebase/firebase";

import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { countWords } from "@/utils/utils";

import dynamic from "next/dynamic";
import PreviewArticle from "@/components/preview-article";

const Editor = dynamic(() => import("../../components/editor"), { ssr: false });

interface ISchedulePublishBtn {
  onPress: () => void;
  scheduleDate: string;
  setScheduleDate: Dispatch<SetStateAction<string>>;
}

const SchedulePublishBtn: FC<ISchedulePublishBtn> = (props) => {
  const { onPress, scheduleDate, setScheduleDate } = props;

  const minDateToPublish = new Date(
    new Date().setDate(new Date().getDate() + 1)
  )
    .toISOString()
    .split("T")[0];

  const maxDateToPublish = new Date(
    new Date(minDateToPublish).setDate(new Date(minDateToPublish).getDate() + 6)
  )
    .toISOString()
    .split("T")[0];

  return (
    <Popover placement="top">
      <PopoverTrigger>
        <Button isIconOnly color="primary">
          <FaCaretDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 m-0">
        <div className="p-5 flex flex-col items-center justify-center gap-5">
          <Input
            type="date"
            label="Date to Publish"
            labelPlacement="outside-left"
            isRequired
            onChange={(e) => setScheduleDate(e.target.value)}
            value={scheduleDate}
            min={minDateToPublish}
            max={maxDateToPublish}
          />

          <Button
            color="primary"
            onPress={onPress}
            variant="light"
            isDisabled={!scheduleDate}
          >
            Schedule Publish
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default function Write() {
  const [article, setArticle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [company, setCompany] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [rounds, setRounds] = useState<number>(1);
  const [selected, setSelected] = useState<boolean>(true);
  const [mode, setMode] = useState<string>("off-campus");
  const [difficulty, setDifficulty] = useState<string>("intermediate");
  const [interviewDate, setInterviewDate] = useState<string>("2023-08-09");
  const [overview, setOverview] = useState<string>("");
  const [scheduleDate, setScheduleDate] = useState<string>("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { isSignedIn, user, isLoaded } = useUser();

  const { push } = useRouter();

  const previewArticle = () => {
    const totalWords = countWords(article);

    if (totalWords < 160) {
      toast.error("Article must be at least 160 words!");
      return;
    }

    onOpen();
  };

  const scheduleArticle = () => {
    addBlogToFirestore(false);
  };

  const addBlogToFirestore = async (isPublic: boolean) => {
    const totalWords = countWords(article);

    if (totalWords < 160) {
      toast.error("Article must be at least 160 words!");
      return;
    }

    setIsLoading(true);

    const interviewExperienceObj = {
      company,
      position,
      rounds,
      difficulty,
      selected,
      mode,
      interviewDate,
      scheduleDate,
      overview,
      isPublic,
      content: article,
      publishedDate: isPublic ? new Date().toISOString() : scheduleDate,
      author: user?.fullName,
      email: user?.emailAddresses[0].emailAddress,
      comments: [],
    };

    try {
      const docRef = await addDoc(
        collection(db, "interview-experiences"),
        interviewExperienceObj
      );

      toast.success(isPublic ? "Post created!" : "Post is Scheduled");

      confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
      });

      if (isPublic) {
        push(`/blog/${docRef.id}`);
        return;
      }

      push("/dashboard");
    } catch (e) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="flex flex-row justify-center flex-wrap gap-4 md:justify-between">
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

          <CardFooter className="gap-2">
            <Button
              color="primary"
              className="flex-1"
              onClick={previewArticle}
              fullWidth
              variant="bordered"
              isDisabled={
                !company ||
                !position ||
                rounds === 0 ||
                selected === null ||
                !mode ||
                !difficulty ||
                !interviewDate ||
                !overview ||
                !article
              }
            >
              Preview
            </Button>

            <ButtonGroup
              className="flex-1"
              isDisabled={
                !company ||
                !position ||
                rounds === 0 ||
                selected === null ||
                !mode ||
                !difficulty ||
                !interviewDate ||
                !overview ||
                !article
              }
            >
              <Button
                color="primary"
                onClick={() => addBlogToFirestore(true)}
                fullWidth
                isLoading={isLoading}
              >
                Publish
              </Button>

              <SchedulePublishBtn
                onPress={scheduleArticle}
                scheduleDate={scheduleDate}
                setScheduleDate={setScheduleDate}
              />
            </ButtonGroup>
          </CardFooter>
        </Card>

        <section className="max-w-[700px] w-full z-10">
          <Editor setArticle={setArticle} />
        </section>
      </section>

      <PreviewArticle
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        company={company}
        selected={selected}
        mode={mode}
        rounds={rounds}
        interviewDate={interviewDate}
        content={article}
      />
    </>
  );
}
