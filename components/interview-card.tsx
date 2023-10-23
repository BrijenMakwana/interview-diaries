import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  User,
} from "@nextui-org/react";
import { title } from "@/components/primitives";

const InterviewCard = () => {
  return (
    <Card className="max-w-[340px]">
      <CardHeader className="flex-col items-start gap-2">
        <h4 className="text-xl font-semibold leading-none text-default-600">
          Google
        </h4>

        <span
          className={title({ color: "green" })}
          style={{
            fontSize: "0.9rem",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          fronted-developer
        </span>
      </CardHeader>

      <CardBody className="px-3 py-0 text-small text-default-400 gap-3">
        <p>
          Frontend developer and UI/UX enthusiast. Join me on this coding
          adventure! Frontend developer and UI/UX enthusiast. Join me on this
          coding adventure!Frontend developer and UI/UX enthusiast. Join me on
          this coding adventure! Frontend developer and UI/UX enthusiast. Join
          me on this coding adventure!
        </p>

        <span className="text-sm capitalize bg-purple-400 text-black w-fit px-2 py-1 rounded-xl font-medium">
          Intermediate
        </span>
      </CardBody>
      <CardFooter className="flex-col items-end gap-2">
        <User
          name="Brijen Makwana"
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
        />

        <span className="0 text-small capitalize text-white">
          published on 12 Nov, 23
        </span>
      </CardFooter>
    </Card>
  );
};

export default InterviewCard;
