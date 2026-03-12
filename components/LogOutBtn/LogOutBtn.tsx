"use client";

import { usePathname } from "next/navigation";
import css from "./LogOutBtn.module.css";
import clsx from "clsx";

interface LogOutBtnProps {
  openModal: () => void;
  inMenu?: boolean;
}

export default function LogOutBtn({ openModal, inMenu }: LogOutBtnProps) {
  const pathname = usePathname();
  const homePage = pathname === "/" ? true : false;

  return (
    <button
      className={clsx(css.btn, homePage && css.homePage, inMenu && css.inMenu)}
      type="button"
      onClick={openModal}
    >
      Log out
    </button>
  );
}
