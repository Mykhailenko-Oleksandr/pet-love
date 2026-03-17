"use client";

import clsx from "clsx";
import css from "./SearchField.module.css";
import { ChangeEvent, KeyboardEvent, useState } from "react";

interface SearchFieldProps {
  search: (value: string) => void;
  inNoticesFilters?: boolean;
}

export default function SearchField({
  search,
  inNoticesFilters,
}: SearchFieldProps) {
  const [searchWord, setSearchWord] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchWord(event.target.value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") search(searchWord);
  }

  return (
    <div className={clsx(css.box, inNoticesFilters && css.inNoticesFilters)}>
      <input
        type="text"
        placeholder="Search"
        value={searchWord}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={clsx(css.input, inNoticesFilters && css.noBorder)}
      ></input>
      <div className={css.btnsBox}>
        {searchWord.length > 0 && (
          <button
            type="button"
            onClick={() => setSearchWord("")}
            className={css.btn}
          >
            <svg width={18} height={18}>
              <use href="/sprite.svg#close"></use>
            </svg>
          </button>
        )}
        <button
          type="button"
          onClick={() => search(searchWord)}
          className={css.btn}
        >
          <svg width={18} height={18}>
            <use href="/sprite.svg#search"></use>
          </svg>
        </button>
      </div>
    </div>
  );
}
