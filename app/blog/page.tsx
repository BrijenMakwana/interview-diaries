"use client";

import InterviewCard from "@/components/interview-card";
import SearchBar from "@/components/search-bar";
import { db, collection, getDocs } from "@/firebase/firebase";
import { useEffect, useState } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { useRouter } from "next/navigation";
import moment from "moment";
import InterviewDifficulty from "@/components/interview-difficulty";
import DeveloperPosition from "@/components/developer-position";
import CompanyName from "@/components/company-name";

export default function BlogPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);

  const { push } = useRouter();

  const isArticleReadyToPublish = (scheduleDate: string) => {
    const scheduleDateTime = new Date(scheduleDate);

    const currentDate = new Date();

    scheduleDateTime.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    return scheduleDateTime <= currentDate;
  };

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

    setArticles(
      articlesArray.filter(
        (item) => item.isPublic || isArticleReadyToPublish(item.scheduleDate)
      )
    );

    setFilteredBlogs(articlesArray);
  };

  const filterBlogs = () => {
    const filtered = articles.filter((article: any) =>
      article.company.toLowerCase().includes(searchInput.trim().toLowerCase())
    );

    setFilteredBlogs(filtered);
  };

  useEffect(() => {
    getAllArticles();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      filterBlogs();
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const renderedArray = searchInput ? filteredBlogs : articles;

  return (
    <main>
      <SearchBar setValue={setSearchInput} value={searchInput} />

      <div className="w-full flex flex-col items-center mt-12">
        <Tabs aria-label="Options" color="warning" defaultChecked>
          <Tab key="card" title="Card View">
            <section className="flex gap-5 flex-wrap justify-center w-full mt-6">
              {renderedArray.map((item: any) => (
                <InterviewCard key={item.id} {...item} />
              ))}
            </section>
          </Tab>
          <Tab key="table" title="Table View" className="hidden md:block">
            <section className="w-full mt-6">
              <Table aria-label="interview experiences">
                <TableHeader>
                  <TableColumn>COMPANY</TableColumn>
                  <TableColumn>POSITION</TableColumn>
                  <TableColumn>OVERVIEW</TableColumn>
                  <TableColumn>DIFFICULTY</TableColumn>
                  <TableColumn>AUTHOR</TableColumn>

                  <TableColumn>PUBLISHED ON</TableColumn>
                </TableHeader>
                <TableBody>
                  {renderedArray.map((item: any, index: number) => (
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
                      <TableCell>
                        <InterviewDifficulty difficulty={item.difficulty} />
                      </TableCell>

                      <TableCell>
                        <span className="self-end text-sm">@{item.author}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-small capitalize text-default-400">
                          {moment(item.publishedDate).format("ll")}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>
          </Tab>
        </Tabs>
      </div>
    </main>
  );
}
