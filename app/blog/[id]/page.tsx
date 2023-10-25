"use client";

import InterviewCard from "@/components/interview-card";
import SectionHeading from "@/components/section-heading";
import { db, getDoc, doc } from "@/firebase/firebase";
import { useEffect, useState } from "react";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

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
    <section className="flex gap-5 flex-wrap items-center justify-center w-full">
      <SectionHeading
        text="interview experience for"
        highlightedText={article.company}
      />

      <article className="bg-gray-300 p-5 rounded-lg">
        <FroalaEditorView model={article.content} />
      </article>
    </section>
  );
}
