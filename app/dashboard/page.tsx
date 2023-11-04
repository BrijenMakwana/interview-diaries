"use client";

import {
  db,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "@/firebase/firebase";
import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";
import DeveloperPosition from "@/components/developer-position";
import InterviewDifficulty from "@/components/interview-difficulty";
import CompanyName from "@/components/company-name";
import { toast } from "react-toastify";

export default function DashboardPage() {
  const [articles, setArticles] = useState<any[]>([]);

  const { isSignedIn, user, isLoaded } = useUser();

  const { push } = useRouter();

  const getAllYourArticles = async () => {
    const articlesArray: any[] = [];

    const q = query(
      collection(db, "interview-experiences"),
      where("email", "==", user?.emailAddresses[0].emailAddress || "")
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      articlesArray.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setArticles(articlesArray);
  };

  const deleteArticle = async (id: string) => {
    try {
      setArticles(articles.filter((article) => article.id !== id));

      toast.success("Post deleted!");

      await deleteDoc(doc(db, "interview-experiences", id));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllYourArticles();
  }, []);

  return (
    <main>
      <section className="w-full flex flex-col items-center mt-12">
        <Table aria-label="blogs">
          <TableHeader>
            <TableColumn>COMPANY</TableColumn>
            <TableColumn>POSITION</TableColumn>
            <TableColumn>OVERVIEW</TableColumn>
            <TableColumn>DIFFICULTY</TableColumn>
            <TableColumn>ACTION</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No articles to display."}>
            {articles.map((item: any, index: number) => (
              <TableRow
                key={index + 1}
                onClick={() => push(`/blog/${item.id}`)}
                className="cursor-pointer hover:bg-gray-700 "
              >
                <TableCell>
                  <CompanyName company={item.company} />
                </TableCell>
                <TableCell>
                  <DeveloperPosition position={item.position} />
                </TableCell>
                <TableCell>
                  <p>{item.overview}</p>
                </TableCell>
                <TableCell className="capitalize text-pink-300	font-semibold">
                  <InterviewDifficulty difficulty={item.difficulty} />
                </TableCell>
                <TableCell>
                  <Button color="danger" onClick={() => deleteArticle(item.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
