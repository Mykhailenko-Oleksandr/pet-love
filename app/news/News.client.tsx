"use client";

import Title from "@/components/Title/Title";
import css from "./News.module.css";
import SearchField from "@/components/SearchField/SearchField";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getNews } from "@/lib/api/clientApi";
import { useState } from "react";
import NewsList from "@/components/NewsList/NewsList";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "@/components/Loader/Loader";

export default function NewsClient() {
  const [searchWord, setSearchWord] = useState("");
  const [page, setPage] = useState(1);

  const { data, isError, isSuccess, isLoading } = useQuery({
    queryKey: ["news", searchWord, page],
    queryFn: () => getNews(searchWord, page),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const totalPages = data?.totalPages ?? 0;

  return (
    <section className={css.section}>
      <div className="container">
        <div className={css.topBox}>
          <Title title="News" />
          <SearchField search={(word) => setSearchWord(word)} />
        </div>

        {data && data.results.length > 0 ? (
          <NewsList news={data.results} />
        ) : (
          <p className={css.textMessage}>Your search returned no results.</p>
        )}

        {isError && (
          <p className={css.textMessage}>
            There was an error, please try again...
          </p>
        )}

        {isLoading && <Loader backdrop={true} />}

        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            page={page}
            updatePage={setPage}
          />
        )}
      </div>
    </section>
  );
}
