"use client";

import InterviewCard from "@/components/interview-card";
import SectionHeading from "@/components/section-heading";
import { db, getDoc, doc, arrayUnion, updateDoc } from "@/firebase/firebase";
import { useEffect, useState } from "react";
import { Chip } from "@nextui-org/chip";
import moment from "moment";
import CustomMarkdown from "@/components/custom-markdown";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useUser } from "@clerk/nextjs";
import CustomSignInButton from "@/components/custom-signIn-button";
import UserComment, { IUserComment } from "@/components/user-comment";
import { nanoid } from "nanoid";

export default function ArticlePage({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<any>("");
  const [comment, setComment] = useState<string>("");
  const [isCommenting, setIsCommenting] = useState<boolean>(false);
  const [comments, setComments] = useState<IUserComment[]>([]);
  const { isSignedIn, user, isLoaded } = useUser();

  const getArticle = async () => {
    const docRef = doc(db, "interview-experiences", params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap.data());
      setArticle(docSnap.data());
      setComments(docSnap.data().comments);
    } else {
      console.log("No such document!");
    }
  };

  const addCommentToBlog = async () => {
    setIsCommenting(true);
    const docRef = doc(db, "interview-experiences", params.id);

    const commentObj = {
      id: nanoid(),
      comment: comment,
      author: user?.fullName || "NA",
      date: new Date().toISOString(),
    };

    try {
      await updateDoc(docRef, {
        comments: arrayUnion(commentObj),
      });

      setComments([...comments, commentObj]);
      setComment("");
    } catch (e) {
    } finally {
      setIsCommenting(false);
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

      <section className="flex flex-row gap-3 items-start justify-center flex-wrap mt-10">
        <InterviewCard
          {...article}
          isRoute={false}
          isHoverable={false}
          isPressable={false}
        />

        <article className="max-w-[700px] flex-1 p-5 border-solid border-1 border-zinc-700 rounded-xl">
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

        <section>
          <div className="flex flex-row items-center justify-between gap-5">
            <Input
              type="text"
              label="Your Comment"
              placeholder={
                isSignedIn ? "Want to say anything?" : "Login to comment"
              }
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              maxLength={150}
              className="flex-1"
              disabled={!isSignedIn}
            />

            <Button
              color="primary"
              isLoading={isCommenting}
              onClick={addCommentToBlog}
              isDisabled={!isSignedIn || !comment}
            >
              Add Comment
            </Button>
          </div>

          <section className="mt-5">
            {comments?.map((item: IUserComment) => (
              <UserComment {...item} key={item.id} />
            ))}
          </section>
        </section>
      </section>
    </section>
  );
}
