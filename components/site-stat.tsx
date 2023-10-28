import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { FC } from "react";

interface ISiteStat {
  title: string;
}

const SiteStat: FC<ISiteStat> = (props) => {
  const { title } = props;

  const randomNumber = Math.floor(Math.random() * (1500 - 1000 + 1) + 1000);

  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large capitalize">
          {randomNumber}+ {title}
        </h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://images.unsplash.com/photo-1568992688065-536aad8a12f6?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNvbXBhbmllc3xlbnwwfHwwfHx8MA%3D%3D"
          width={270}
        />
      </CardBody>
    </Card>
  );
};

export default SiteStat;
