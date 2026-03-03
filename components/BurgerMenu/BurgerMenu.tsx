"use client";

import clsx from "clsx";
import css from "./BurgerMenu.module.css";
import { MouseEvent, useEffect } from "react";
import AuthNav from "../AuthNav/AuthNav";
import Nav from "../Nav/Nav";

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  homePage?: boolean;
}

export default function BurgerMenu({
  isOpen,
  onClose,
  homePage,
}: BurgerMenuProps) {
  function handleClickBackdrop(e: MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    if (isOpen) {
      window.addEventListener("keydown", onEsc);
      document.body.classList.add("noScroll");
    }

    return () => {
      window.removeEventListener("keydown", onEsc);
      document.body.classList.remove("noScroll");
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1280) onClose();
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [onClose]);

  return (
    <div
      className={clsx(css.backdrop, isOpen && css.isOpen)}
      onClick={handleClickBackdrop}
    >
      <div className={clsx(css.menu, homePage && css.homePage)}>
        <button
          className={css.closeBtn}
          type="button"
          aria-label="Close menu"
          onClick={onClose}
        >
          <svg>
            <use href="/sprite.svg#close"></use>
          </svg>
        </button>

        <Nav isMenu onCloseMenu={onClose} />

        <AuthNav isMenu onCloseMenu={onClose} />
      </div>
    </div>
  );
}
