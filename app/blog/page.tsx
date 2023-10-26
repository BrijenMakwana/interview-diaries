"use client";

import InterviewCard from "@/components/interview-card";
import SearchBar from "@/components/search-bar";
import { db, collection, getDocs } from "@/firebase/firebase";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);

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

    setFilteredBlogs(articlesArray);
  };

  const filterBlogs = () => {
    const filtered = articles.filter((article: any) =>
      article.company.toLowerCase().includes(searchInput.toLowerCase())
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

  return (
    <main>
      <SearchBar setValue={setSearchInput} value={searchInput} />

      <section className="flex gap-5 flex-wrap items-center justify-center w-full mt-12">
        {searchInput
          ? filteredBlogs.map((item: any) => (
              <InterviewCard key={item.id} {...item} />
            ))
          : articles.map((item: any) => (
              <InterviewCard key={item.id} {...item} />
            ))}
      </section>
    </main>
  );
}
