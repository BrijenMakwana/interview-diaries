import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Divider } from "@nextui-org/divider";
import { FC } from "react";

interface ICompanyCard {
  id: number;
  name: string;
  description: string;
  website: string;
}

const CompanyCard: FC<ICompanyCard> = (props) => {
  const { id, name, description, website } = props;

  return (
    <Card className="max-w-[340px]">
      <CardHeader>
        <p className="text-xl capitalize">{name}</p>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{description}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link isExternal showAnchorIcon href={website}>
          Visit Company Site.
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CompanyCard;
