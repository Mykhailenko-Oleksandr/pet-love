"use client";

import clsx from "clsx";
import css from "./Notices.module.css";
import Title from "@/components/Title/Title";
import NoticesFilters from "@/components/NoticesFilters/NoticesFilters";
import { useState } from "react";
import { Location } from "@/types/location";

interface NoticesClientProps {
  categories: string[];
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
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const [idLocation, setIdLocation] = useState("");
  const [bySort, setBySort] = useState("");

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
          changeIdLocation={(id) => setIdLocation(id)}
          bySort={bySort}
          changeBySort={(value) => setBySort(value)}
        />
      </div>
      <div className="container"></div>
    </section>
  );
}
