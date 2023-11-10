import { FC } from "react";
import { Chip } from "@nextui-org/chip";
import CustomMarkdown from "./custom-markdown";
import moment from "moment";

export interface IArticle {
  selected: boolean;
  mode: string;
  rounds: number;
  interviewDate: string;
  content: string;
}

const Article: FC<IArticle> = (props) => {
  const { selected, mode, rounds, interviewDate, content } = props;

  return (
    <article className="max-w-[800px]">
      <section className="flex flex-row gap-2 items-center flex-wrap mb-4">
        <Chip
          color={selected ? "success" : "danger"}
          variant="dot"
          className="capitalize"
        >
          {selected ? "selected" : "not-selected"}
        </Chip>
        <Chip color="primary" variant="dot" className="capitalize">
          {mode}
        </Chip>
        <Chip color="primary" variant="dot" className="capitalize">
          {rounds} {rounds > 1 ? "rounds" : "round"}
        </Chip>
        <Chip color="primary" variant="dot" className="capitalize">
          interviewed on {moment(interviewDate).format("ll")}
        </Chip>
      </section>

      <CustomMarkdown content={content} />
    </article>
  );
};

export default Article;
