"use client";

import InterviewCard from "@/components/interview-card";
import { db, collection, getDocs } from "@/firebase/firebase";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const [articles, setArticles] = useState<any>([]);

  const getAllArticles = async () => {
    const articlesArray: any[] = [];
    const querySnapshot = await getDocs(
      collection(db, "interview-experiences")
    );
    querySnapshot.forEach((doc) => {
      articlesArray.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setArticles(articlesArray);

    console.log(articlesArray);
  };

  useEffect(() => {
    getAllArticles();
  }, []);

  return (
    <section className="flex gap-5 flex-wrap items-center justify-center w-full">
      {articles.map((item: any) => (
        <InterviewCard key={item.id} {...item} />
      ))}
    </section>
  );
}
