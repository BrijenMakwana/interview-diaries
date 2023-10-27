import SectionHeading from "./section-heading";
import { db, collection, getDocs } from "@/firebase/firebase";
import InterviewCard from "./interview-card";
import { Button } from "@nextui-org/button";
import Link from "next/link";

const getAllArticles = async () => {
  const articlesArray: any[] = [];
  const querySnapshot = await getDocs(collection(db, "interview-experiences"));
  querySnapshot.forEach((doc) => {
    articlesArray.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return articlesArray;
};

export default async function FeaturedInterviews() {
  const articles = await getAllArticles();

  return (
    <>
      <SectionHeading text="featured" highlightedText="interviews" />
      <section className="flex gap-5 flex-wrap justify-center w-full">
        {articles.map((item) => (
          <InterviewCard key={item.id} {...item} />
        ))}
      </section>

      <Button color="primary" as={Link} href="/blog">
        Explore Our Blog
      </Button>
    </>
  );
}
