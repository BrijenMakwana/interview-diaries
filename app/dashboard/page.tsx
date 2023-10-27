"use client";

import { db, collection, getDocs, query, where } from "@/firebase/firebase";
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

export default function DashboardPage() {
  const [articles, setArticles] = useState<any[]>([]);

  const { isSignedIn, user, isLoaded } = useUser();

  const { push } = useRouter();

  const getAllYourArticles = async () => {
    const articlesArray: any[] = [];

    const q = query(
      collection(db, "interview-experiences"),
      where("email", "==", user?.emailAddresses[0].emailAddress)
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
          </TableHeader>
          <TableBody>
            {articles.map((item: any, index: number) => (
              <TableRow
                key={index + 1}
                onClick={() => push(`/blog/${item.id}`)}
                className="cursor-pointer hover:bg-gray-700 "
              >
                <TableCell className="font-bold capitalize">
                  {item.company}
                </TableCell>
                <TableCell className="text-amber-600 font-bold capitalize">
                  {item.position}
                </TableCell>
                <TableCell>
                  <p>{item.overview}</p>
                </TableCell>
                <TableCell className="capitalize text-pink-300	font-semibold">
                  {item.difficulty}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
