"use client";

import { Dispatch, useEffect, useState } from "react";
import css from "./Pagination.module.css";
import ReactPaginate from "react-paginate";
import clsx from "clsx";

interface PaginationProps {
  totalPages: number;
  page: number;
  updatePage: Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({
  totalPages,
  page,
  updatePage,
}: PaginationProps) {
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(2);

  useEffect(() => {
    function handleResize() {
      setPageRangeDisplayed(window.innerWidth >= 768 ? 3 : 2);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={css.paginationWrapper}>
      <div className={css.prevNextBtnsBox}>
        <button
          type="button"
          className={css.prevNextBtn}
          onClick={() => updatePage(1)}
          disabled={page === 1}
        >
          <svg width={20} height={20} className={css.iconFirstLastBtnOne}>
            <use href="/sprite.svg#arrow-left"></use>
          </svg>
          <svg width={20} height={20} className={css.iconFirstLastBtnTwo}>
            <use href="/sprite.svg#arrow-left"></use>
          </svg>
        </button>

        <button
          type="button"
          className={css.prevNextBtn}
          onClick={() => updatePage(page - 1)}
          disabled={page === 1}
        >
          <svg width={20} height={20} className={css.iconBtn}>
            <use href="/sprite.svg#arrow-left"></use>
          </svg>
        </button>
      </div>

      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={pageRangeDisplayed}
        marginPagesDisplayed={0}
        onPageChange={({ selected }) => updatePage(selected + 1)}
        forcePage={page - 1}
        containerClassName={css.pagination}
        previousClassName={css.previous}
        nextClassName={css.next}
        pageLinkClassName={css.link}
        activeLinkClassName={css.active}
        breakClassName={clsx(css.break, page !== 1 && css.notFirstPage)}
        nextLabel={null}
        previousLabel={null}
      />

      <div className={css.prevNextBtnsBox}>
        <button
          type="button"
          className={css.prevNextBtn}
          onClick={() => updatePage(page + 1)}
          disabled={page === totalPages}
        >
          <svg width={20} height={20} className={css.iconBtn}>
            <use href="/sprite.svg#arrow-right"></use>
          </svg>
        </button>

        <button
          type="button"
          className={css.prevNextBtn}
          onClick={() => updatePage(totalPages)}
          disabled={page === totalPages}
        >
          <svg width={20} height={20} className={css.iconFirstLastBtnOne}>
            <use href="/sprite.svg#arrow-right"></use>
          </svg>
          <svg width={20} height={20} className={css.iconFirstLastBtnTwo}>
            <use href="/sprite.svg#arrow-right"></use>
          </svg>
        </button>
      </div>
    </div>
  );
}
