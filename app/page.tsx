import { title, subtitle } from "@/components/primitives";
import SiteStat from "@/components/site-stat";
import SectionHeading from "@/components/section-heading";
import NextLink from "next/link";
import { Button } from "@nextui-org/button";
import Newsletter from "@/components/newsletter";
import Image from "next/image";
import FeaturedInterviews from "@/components/featured-interviews";
import MeetCreator from "@/components/meet-creator";
import TopCompanies from "@/components/top-companies";
import { Divider } from "@nextui-org/divider";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-20 py-8 md:py-10">
      <section className="flex flex-row items-center justify-evenly w-full flex-wrap gap-10">
        <Image src="/interview.svg" height={300} width={300} alt="interview" />

        <div className="inline-block max-w-lg text-center justify-center">
          <h1
            className={title({ color: "yellow" })}
            style={{
              textTransform: "capitalize",
              fontSize: "4rem",
            }}
          >
            interview diaries&nbsp;
          </h1>
          <br />
          <h1 className={title()}>
            Where Developers Share Their Interview Stories.
          </h1>
          <h2 className={subtitle({ class: "mt-4" })}>
            Explore the World of Developer Interviews.
          </h2>

          <Button color="primary" as={NextLink} href="/write" className="mt-5">
            Start Writing
          </Button>
        </div>
      </section>

      <Divider />

      <FeaturedInterviews />

      <Divider />

      <TopCompanies />

      <Divider />

      <SectionHeading text="you can" highlightedText="trust us!" />
      <section className="flex gap-5 flex-wrap items-center justify-evenly w-full">
        <SiteStat title="interviews" />
        <SiteStat title="companies" />
        <SiteStat title="developers" />
      </section>

      <Divider />

      <MeetCreator />

      <Divider />

      <Newsletter />
    </main>
  );
}
