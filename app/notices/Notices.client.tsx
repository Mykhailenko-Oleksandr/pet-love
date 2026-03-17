"use client";

import clsx from "clsx";
import css from "./Notices.module.css";
import Title from "@/components/Title/Title";
import NoticesFilters from "@/components/NoticesFilters/NoticesFilters";
import { useState } from "react";

interface NoticesClientProps {
  categories: string[];
  genders: string[];
  species: string[];
}

export default function NoticesClient({
  categories,
  genders,
  species,
}: NoticesClientProps) {
  const [searchWord, setSearchWord] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");

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
        />
      </div>
      <div className="container"></div>
    </section>
  );
}
