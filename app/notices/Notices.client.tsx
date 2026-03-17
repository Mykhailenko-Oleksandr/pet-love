"use client";

import clsx from "clsx";
import css from "./Notices.module.css";
import Title from "@/components/Title/Title";
import NoticesFilters from "@/components/NoticesFilters/NoticesFilters";
import { useState } from "react";

export default function NoticesClient() {
  const [searchWord, setSearchWord] = useState("");
  

  return (
    <section className={css.section}>
      <div className="container">
        <Title title="Find your favorite pet" />
      </div>
      <div className={clsx("container", css.filtersContainer)}>
        <NoticesFilters changeSearchWord={(value) => setSearchWord(value)} />
      </div>
      <div className="container"></div>
    </section>
  );
}
