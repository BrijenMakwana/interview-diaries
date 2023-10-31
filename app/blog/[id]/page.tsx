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
import UserComment, { IUserComment } from "@/components/user-comment";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import Newsletter from "@/components/newsletter";
import CustomDivider from "@/components/custom-divider";

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
      setComments([...comments, commentObj]);
      setComment("");

      toast.success("Comment added!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      await updateDoc(docRef, {
        comments: arrayUnion(commentObj),
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsCommenting(false);
    }
  };

  useEffect(() => {
    getArticle();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center w-full">
      <SectionHeading
        text="interview experience for"
        highlightedText={article.company}
      />

      <section className="flex flex-row gap-10 items-start justify-center flex-wrap mt-10 w-full">
        <article className="max-w-[700px] flex-1 md:min-w-[500px]">
          <section className="flex flex-row gap-2 items-center flex-wrap mb-4">
            <Chip
              color={article.selected ? "success" : "danger"}
              variant="dot"
              className="capitalize"
            >
              {article.selected ? "selected" : "not-selected"}
            </Chip>
            <Chip color="primary" variant="dot" className="capitalize">
              {article.mode}
            </Chip>
            <Chip color="primary" variant="dot" className="capitalize">
              {article.rounds} {article.rounds > 1 ? "rounds" : "round"}
            </Chip>
            <Chip color="primary" variant="dot" className="capitalize">
              interviewed on {moment(article.interviewDate).format("ll")}
            </Chip>
          </section>

          <CustomMarkdown content={article.content} />
        </article>

        <div>
          <InterviewCard
            {...article}
            isRoute={false}
            isHoverable={false}
            isPressable={false}
          />

          <section className="mt-10">
            <div className="flex flex-row items-center justify-between gap-3">
              <Input
                type="text"
                placeholder={
                  isSignedIn ? "Want to say something?" : "Login to comment"
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
                className="w-[140px]"
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
        </div>
      </section>

      <CustomDivider />

      <Newsletter />
    </main>
  );
}
