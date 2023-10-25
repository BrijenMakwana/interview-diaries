"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { User } from "@nextui-org/user";
import { title } from "@/components/primitives";
import { FC } from "react";
import moment from "moment";
import Link from "next/link";

interface IInterviewCard {
  id: string;
  company: string;
  position: string;
  difficulty: string;
  overview: string;
  publishedDate: Date;
}

const InterviewCard: FC<IInterviewCard> = (props) => {
  const { id, company, position, difficulty, overview, publishedDate } = props;

  const getDifficultyChipColour = () => {
    switch (difficulty) {
      case "beginner":
        return "success";
      case "intermediate":
        return "primary";
      case "advanced":
        return "warning";
      case "expert":
        return "danger";
    }
  };

  return (
    <Link href={`/blog/${id}`}>
      <Card className="max-w-[340px]" isPressable isHoverable>
        <CardHeader className="flex-col items-start gap-2">
          <h4 className="text-xl font-semibold leading-none text-default-600 capitalize">
            {company}
          </h4>

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
        </CardHeader>

        <CardBody className="px-3 py-0 text-small text-default-400 gap-3">
          <p>{overview}</p>

          <Chip
            color={getDifficultyChipColour()}
            variant="faded"
            className="capitalize"
          >
            {difficulty}
          </Chip>
        </CardBody>
        <CardFooter className="flex-col items-end gap-2">
          <User
            name="Brijen Makwana"
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            }}
          />

          <span className="text-small capitalize text-default-400">
            {/* published on {moment(publishedDate).format("ll")} */}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default InterviewCard;
