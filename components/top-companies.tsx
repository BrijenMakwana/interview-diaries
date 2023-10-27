import React from "react";
import SectionHeading from "./section-heading";
import CompanyCard from "./company-card";

const techCompanies = [
  {
    id: 1,
    name: "Google",
    description:
      "A multinational technology company specializing in Internet-related services and products.",
    website: "https://www.google.com/",
  },
  {
    id: 2,
    name: "Apple",
    description:
      "A leading technology company that designs, manufactures, and markets consumer electronics and software.",
    website: "https://www.apple.com/",
  },
  {
    id: 3,
    name: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, and artificial intelligence.",
    website: "https://www.amazon.com/",
  },
  {
    id: 4,
    name: "Microsoft",
    description:
      "A global technology corporation renowned for its software, hardware, and cloud services.",
    website: "https://www.microsoft.com/",
  },
  {
    id: 5,
    name: "Facebook",
    description:
      "A social media and technology company connecting people worldwide.",
    website: "https://www.facebook.com/",
  },
  {
    id: 6,
    name: "Tesla",
    description:
      "An electric vehicle and clean energy company committed to sustainable energy solutions.",
    website: "https://www.tesla.com/",
  },
];

const TopCompanies = () => {
  return (
    <>
      <SectionHeading text="top" highlightedText="companies" />
      <section className="flex gap-5 flex-wrap justify-center w-full">
        {techCompanies.map((item) => (
          <CompanyCard {...item} key={item.id} />
        ))}
      </section>
    </>
  );
};

export default TopCompanies;
