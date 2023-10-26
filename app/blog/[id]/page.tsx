"use client";

import InterviewCard from "@/components/interview-card";
import SectionHeading from "@/components/section-heading";
import { db, getDoc, doc } from "@/firebase/firebase";
import { useEffect, useState } from "react";
import { Chip } from "@nextui-org/chip";
import moment from "moment";
import CustomMarkdown from "@/components/custom-markdown";

export default function ArticlePage({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<any>("");

  const getArticle = async () => {
    const docRef = doc(db, "interview-experiences", params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap.data());
      setArticle(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getArticle();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center w-full">
      <SectionHeading
        text="interview experience for"
        highlightedText={article.company}
      />

      <section className="flex flex-row gap-3 items-start justify-center mt-10 flex-wrap">
        <InterviewCard
          {...article}
          isRoute={false}
          isHoverable={false}
          isPressable={false}
        />

        <article className="p-5 rounded-lg w-[700px]">
          <section className="flex flex-row gap-2 items-center flex-wrap mb-3">
            <Chip color="primary" variant="flat" className="capitalize">
              {article.selected ? "selected" : "not-selected"}
            </Chip>
            <Chip color="primary" variant="flat" className="capitalize">
              {article.mode}
            </Chip>
            <Chip color="primary" variant="flat" className="capitalize">
              interviewed on {moment(article.interviewDate).format("ll")}
            </Chip>
          </section>

          <CustomMarkdown content={article.content} />
        </article>
      </section>
    </section>
  );
}
