"use client";

import css from "./LogOutBtn.module.css";

interface LogOutBtnProps {
  openModal: () => void;
}

export default function LogOutBtn({ openModal }: LogOutBtnProps) {
  return (
    <button className={css.btn} type="button" onClick={openModal}>
      Log out
    </button>
  );
}
