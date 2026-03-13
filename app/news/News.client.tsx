"use client";

import Title from "@/components/Title/Title";
import css from "./News.module.css";
import SearchField from "@/components/SearchField/SearchField";

export default function NewsClient() {
  return (
    <section className={css.section}>
      <div className="container">
        <div className={css.topBox}>
          <Title title="News" />
          <SearchField search={() => {}} />
        </div>
      </div>
    </section>
  );
}
