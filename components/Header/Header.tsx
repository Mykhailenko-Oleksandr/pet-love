"use client";

import clsx from "clsx";
import css from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Nav from "../Nav/Nav";
import AuthNav from "../AuthNav/AuthNav";
import { useState } from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <div
        className={clsx(
          "container",
          css.headerContainer,
          pathname === "/" && css.homePage,
        )}
      >
        <Link className={css.logo} href="/" aria-label="Logotype PetLove">
          petl
          <svg aria-hidden="true">
            <use href="/sprite.svg#heart"></use>
          </svg>
          ve
        </Link>

        <Nav />

        <div className={css.rightBox}>
          <AuthNav />

          <button
            className={css.burgerMenuBtn}
            type="button"
            aria-label="Menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg>
              <use href="/sprite.svg#menu"></use>
            </svg>
          </button>
        </div>

        <BurgerMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          homePage={pathname === "/"}
        />
      </div>
    </header>
  );
}
