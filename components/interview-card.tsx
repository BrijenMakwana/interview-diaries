"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { FC } from "react";
import moment from "moment";
import { useRouter } from "next/navigation";
import DeveloperPosition from "./developer-position";
import InterviewDifficulty from "./interview-difficulty";
import CompanyName from "./company-name";

interface IInterviewCard {
  id: string;
  company: string;
  position: string;
  difficulty: string;
  overview: string;
  publishedDate: string;
  author: string;
  isRoute: boolean;
  isHoverable: boolean;
  isPressable: boolean;
}

const InterviewCard: FC<IInterviewCard> = (props) => {
  const {
    id,
    company,
    position,
    difficulty,
    overview,
    publishedDate,
    author,
    isRoute = true,
    isHoverable = true,
    isPressable = true,
  } = props;

  const { push } = useRouter();

  const goToArticle = () => {
    push(`/blog/${id}`);
  };

  return (
    <Card
      className="max-w-[400px] w-[350px]"
      isPressable={isPressable}
      isHoverable={isHoverable}
      onClick={isRoute ? goToArticle : undefined}
    >
      <CardHeader className="flex-col items-start gap-2">
        <CompanyName company={company} />

        <DeveloperPosition position={position} />
      </CardHeader>

      <CardBody className="px-3 py-0 text-small text-default-400 gap-3">
        <p className="flex-1">{overview}</p>

        <InterviewDifficulty difficulty={difficulty} />
      </CardBody>
      <CardFooter className="flex-col items-end gap-2">
        <span className="self-end text-sm">@{author}</span>
        <span className="text-small capitalize text-default-400">
          published on {moment(publishedDate).format("ll")}
        </span>
      </CardFooter>
    </Card>
  );
};

export default InterviewCard;
