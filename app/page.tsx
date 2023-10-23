"use client";

import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import InterviewCard from "@/components/interview-card";
import CompanyCard from "@/components/company-card";
import FeaturedDev from "@/components/featured-dev";
import SiteStat from "@/components/site-stat";
import SectionHeading from "@/components/section-heading";
import { Divider } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-10 py-8 md:py-10">
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
      </div>

      <Link
        isExternal
        as={NextLink}
        href={siteConfig.links.docs}
        className={buttonStyles({
          color: "primary",
          radius: "full",
          variant: "shadow",
        })}
        style={{
          textTransform: "capitalize",
        }}
      >
        go to interview page
      </Link>

      <SectionHeading text="featured" highlightedText="interviews" />
      <section className="flex gap-5 flex-wrap items-center justify-evenly w-full">
        <InterviewCard />
        <InterviewCard />
        <InterviewCard />
        <InterviewCard />
        <InterviewCard />
        <InterviewCard />
      </section>

      <Divider className="my-20" />

      <SectionHeading text="top" highlightedText="companies" />
      <section className="flex gap-5 flex-wrap items-center justify-evenly w-full">
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
      </section>

      <Divider className="my-20" />

      <SectionHeading text="amazing" highlightedText="developers" />
      <section className="flex gap-5 flex-wrap items-center justify-evenly w-full">
        <FeaturedDev />
        <FeaturedDev />
        <FeaturedDev />
        <FeaturedDev />
        <FeaturedDev />
      </section>

      <Divider className="my-20" />

      <SectionHeading text="you can" highlightedText="trust us!" />
      <section className="flex gap-5 flex-wrap items-center justify-evenly w-full">
        <SiteStat title="interviews" />
        <SiteStat title="companies" />
        <SiteStat title="developers" />
      </section>
    </main>
  );
}
