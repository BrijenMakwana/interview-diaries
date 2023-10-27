import { Card, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import Link from "next/link";

const FeaturedDev = () => {
  return (
    <Card isFooterBlurred radius="lg" className="border-none">
      <Image
        alt="dev"
        className="object-cover"
        src="/brijen_2.jpg"
        height={300}
        width={250}
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-white/80">Brijen Makwana</p>
        <Button
          as={Link}
          className="text-tiny text-white bg-black/20"
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
          href="/about"
        >
          Know About me
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeaturedDev;
