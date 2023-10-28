import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FC } from "react";

interface ICustomMarkdown {
  content: string;
}

const CustomMarkdown: FC<ICustomMarkdown> = (props) => {
  const { content } = props;

  return (
    <div className="prose lg:prose-xl">
      <Markdown
        className="bg-gray-200 p-3 rounded-xl"
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </Markdown>
    </div>
  );
};

export default CustomMarkdown;
