import { Card, CardBody } from "@nextui-org/card";
import moment from "moment";
import { FC } from "react";

export interface IUserComment {
  id: string;
  comment: string;
  author: string | null | undefined;
  date: string;
}

const UserComment: FC<IUserComment> = (props) => {
  const { comment, author, date } = props;

  return (
    <Card className="mt-3">
      <CardBody>
        <p>{comment}</p>

        <span className="self-end text-sm">@{author}</span>
        <span className="self-end text-xs mt-1">
          {moment(date).format("ll")}
        </span>
      </CardBody>
    </Card>
  );
};

export default UserComment;
