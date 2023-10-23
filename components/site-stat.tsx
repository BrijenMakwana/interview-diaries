import { Card, CardBody, Image, CardHeader } from "@nextui-org/react";
import { FC } from "react";

interface ISiteStat {
  title: string;
}

const SiteStat: FC<ISiteStat> = (props) => {
  const { title } = props;
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large capitalize">1000+ {title}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://images.unsplash.com/photo-1586985564150-11ee04838034?auto=format&fit=crop&q=80&w=2029&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width={270}
        />
      </CardBody>
    </Card>
  );
};

export default SiteStat;
