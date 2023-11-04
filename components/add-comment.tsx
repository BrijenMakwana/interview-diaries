"use client";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import UserComment, { IUserComment } from "./user-comment";
import { FC, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db, doc, updateDoc, arrayUnion } from "@/firebase/firebase";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

interface IAddComment {
  articleID: string;
  comments: IUserComment[];
}

const AddComment: FC<IAddComment> = (props) => {
  const { comments, articleID } = props;

  const [comment, setComment] = useState<string>("");
  const [isCommenting, setIsCommenting] = useState<boolean>(false);
  const [localComments, setLocalComments] = useState<IUserComment[]>([]);
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    if (comments) {
      setLocalComments(comments);
    }
  }, [comments]);

  const addCommentToBlog = async () => {
    setIsCommenting(true);
    const docRef = doc(db, "interview-experiences", articleID);

    const commentObj = {
      id: nanoid(),
      comment: comment,
      author: user?.fullName || "NA",
      date: new Date().toISOString(),
    };

    try {
      setLocalComments([...localComments, commentObj]);
      setComment("");

      toast.success("Comment added!");

      await updateDoc(docRef, {
        comments: arrayUnion(commentObj),
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsCommenting(false);
    }
  };

  return (
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
        {localComments?.map((item: IUserComment) => (
          <UserComment {...item} key={item.id} />
        ))}
      </section>
    </section>
  );
};

export default AddComment;
