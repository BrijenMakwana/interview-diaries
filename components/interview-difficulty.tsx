import { FC } from "react";
import { Chip } from "@nextui-org/chip";

interface IInterviewDifficulty {
  difficulty: string;
}

const InterviewDifficulty: FC<IInterviewDifficulty> = (props) => {
  const { difficulty } = props;

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
    <Chip
      color={getDifficultyChipColour()}
      variant="faded"
      className="capitalize"
    >
      {difficulty}
    </Chip>
  );
};

export default InterviewDifficulty;
