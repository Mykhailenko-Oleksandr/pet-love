"use client";

import { usePathname } from "next/navigation";
import css from "./LogOutBtn.module.css";
import clsx from "clsx";

interface LogOutBtnProps {
  openModal: () => void;
  inMenu?: boolean;
  inUserCard?: boolean;
}

export default function LogOutBtn({
  openModal,
  inMenu,
  inUserCard,
}: LogOutBtnProps) {
  const pathname = usePathname();
  const homePage = pathname === "/" ? true : false;

  return (
    <button
      className={clsx(
        css.btn,
        homePage && css.homePage,
        inMenu && css.inMenu,
        inUserCard && css.inUserCard,
      )}
      type="button"
      onClick={openModal}
    >
      Log out
    </button>
  );
}
