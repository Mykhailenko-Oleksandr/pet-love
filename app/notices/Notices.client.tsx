"use client";

import clsx from "clsx";
import css from "./Notices.module.css";
import Title from "@/components/Title/Title";
import NoticesFilters from "@/components/NoticesFilters/NoticesFilters";
import { useState } from "react";
import { Location } from "@/types/location";
import { Category } from "@/types/category";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getNotices } from "@/lib/api/clientApi";
import NoticesList from "@/components/NoticesList/NoticesList";

interface NoticesClientProps {
  categories: Category[];
  genders: string[];
  species: string[];
  locations: Location[];
}

export default function NoticesClient({
  categories,
  genders,
  species,
  locations,
}: NoticesClientProps) {
  const [searchWord, setSearchWord] = useState("");
  const [category, setCategory] = useState<string>("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const [locationId, setLocationId] = useState("");
  const [bySort, setBySort] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: [
      "notices",
      page,
      searchWord,
      category,
      gender,
      type,
      locationId,
      bySort,
    ],
    queryFn: () =>
      getNotices({
        page,
        keyword: searchWord,
        category,
        sex: gender,
        species: type,
        locationId,
        bySort,
      }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const totalPages = data?.totalPages ?? 0;

  return (
    <section className={css.section}>
      <div className="container">
        <Title title="Find your favorite pet" />
      </div>
      <div className={clsx("container", css.filtersContainer)}>
        <NoticesFilters
          changeSearchWord={(value) => setSearchWord(value)}
          categories={categories}
          changeCategory={(value) => setCategory(value)}
          genders={genders}
          changeGender={(value) => setGender(value)}
          species={species}
          changeType={(value) => setType(value)}
          locations={locations}
          changeIdLocation={(id) => setLocationId(id)}
          bySort={bySort}
          changeBySort={(value) => setBySort(value)}
        />
      </div>
      <div className="container">
        {data && data.results.length > 0 ? (
          <NoticesList notices={data.results} />
        ) : (
          <p className={css.textMessage}>Your search returned no results.</p>
        )}

        {isError && (
          <p className={css.textMessage}>
            There was an error, please try again...
          </p>
        )}
      </div>
    </section>
  );
}
