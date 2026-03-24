"use client";

import { useState } from "react";
import css from "./MyNotices.module.css";
import clsx from "clsx";
import { useAuthStore } from "@/lib/store/authStore";
import NoticesList from "../NoticesList/NoticesList";

export default function MyNotices() {
  const { user } = useAuthStore();
  const [tabs, setTabs] = useState<"favorite" | "viewed">("favorite");

  return (
    <div className={css.box}>
      <div className={css.tabsBox}>
        <button
          type="button"
          onClick={() => setTabs("favorite")}
          className={clsx(css.tabBtn, tabs === "favorite" && css.currentTab)}
        >
          My favorite pets
        </button>
        <button
          type="button"
          onClick={() => setTabs("viewed")}
          className={clsx(css.tabBtn, tabs === "viewed" && css.currentTab)}
        >
          Viewed
        </button>
      </div>
      {tabs === "favorite" && user && user.noticesFavorites.length > 0 && (
        <NoticesList notices={user.noticesFavorites} profile />
      )}

      {tabs === "favorite" && user && user.noticesFavorites.length === 0 && (
        <p className={css.textNoFavorites}>
          Oops, <span>looks like there aren&apos;t any furries</span> on our
          adorable page yet. Do not worry! View your pets on the &quot;find your
          favorite pet&quot; page and add them to your favorites.
        </p>
      )}

      {tabs === "viewed" &&
        user?.noticesViewed &&
        user.noticesViewed.length > 0 && (
          <NoticesList notices={user.noticesViewed} profile noticesViewed />
        )}

      {tabs === "viewed" &&
        user?.noticesViewed &&
        user.noticesViewed.length === 0 && (
          <p className={css.textNoFavorites}>
            Oops, looks like no one has viewed it yet. Don&apos;t worry! Check
            out your favorites on the page.
          </p>
        )}
    </div>
  );
}
