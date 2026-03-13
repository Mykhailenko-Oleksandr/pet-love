"use client";

import css from "./SearchField.module.css";
import { ChangeEvent, useState } from "react";

interface SearchFieldProps {
  search: (value: string) => void;
}

export default function SearchField({ search }: SearchFieldProps) {
  const [searchWord, setSearchWord] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchWord(event.target.value);
  }

  return (
    <div className={css.box}>
      <input
        type="text"
        placeholder="Search"
        value={searchWord}
        onChange={handleChange}
        className={css.input}
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
