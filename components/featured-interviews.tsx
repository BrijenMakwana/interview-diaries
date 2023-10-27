import SectionHeading from "./section-heading";
import { db, collection, getDocs } from "@/firebase/firebase";
import InterviewCard from "./interview-card";

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
      <section className="flex gap-5 flex-wrap justify-evenly w-full">
        {articles.map((item) => (
          <InterviewCard key={item.id} {...item} />
        ))}
      </section>
    </>
  );
}
