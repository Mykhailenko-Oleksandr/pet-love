"use client";

import clsx from "clsx";
import css from "./Notices.module.css";
import Title from "@/components/Title/Title";
import NoticesFilters from "@/components/NoticesFilters/NoticesFilters";
import { useEffect, useState } from "react";
import { Location } from "@/types/location";
import { Category } from "@/types/category";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getNotices } from "@/lib/api/clientApi";
import NoticesList from "@/components/NoticesList/NoticesList";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "@/components/Loader/Loader";
import ModalAttention from "@/components/ModalAttention/ModalAttention";
import ModalNotice from "@/components/ModalNotice/ModalNotice";
import { NoticeFull } from "@/types/notice";

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
  const [isModalAttention, setIsModalAttention] = useState(false);
  const [isModalNotice, setIsModalNotice] = useState(false);
  const [fullInfoNotice, setFullInfoNotice] = useState<NoticeFull | null>(null);

  useEffect(() => {
    if (!isModalNotice) {
      setFullInfoNotice(null);
    }
  }, [isModalNotice]);

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
    <>
      <section className={css.section}>
        <div className="container">
          <Title title="Find your favorite pet" />
        </div>
        <div className={clsx("container", css.filtersContainer)}>
          <NoticesFilters
            changeSearchWord={(value) => {
              setSearchWord(value);
              setPage(1);
            }}
            categories={categories}
            changeCategory={(value) => {
              setCategory(value);
              setPage(1);
            }}
            genders={genders}
            changeGender={(value) => {
              setGender(value);
              setPage(1);
            }}
            species={species}
            changeType={(value) => {
              setType(value);
              setPage(1);
            }}
            locations={locations}
            changeIdLocation={(id) => {
              setLocationId(id);
              setPage(1);
            }}
            bySort={bySort}
            changeBySort={(value) => {
              setBySort(value);
              setPage(1);
            }}
          />
        </div>
        <div className="container">
          {data && data.results.length > 0 ? (
            <NoticesList
              notices={data.results}
              openAttentionModal={() => setIsModalAttention(true)}
              openModalNotice={() => setIsModalNotice(true)}
              changeFullInfoNotice={(value) => setFullInfoNotice(value)}
            />
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

      {isModalAttention && (
        <ModalAttention onClose={() => setIsModalAttention(false)} />
      )}

      {isModalNotice && fullInfoNotice && (
        <ModalNotice
          notice={fullInfoNotice}
          onClose={() => setIsModalNotice(false)}
        />
      )}
    </>
  );
}
