"use client";

import clsx from "clsx";
import css from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Nav from "../Nav/Nav";
import AuthNav from "../AuthNav/AuthNav";
import { useState } from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { useAuthStore } from "@/lib/store/authStore";
import UserNav from "../UserNav/UserNav";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalLogout, setIsModalLogout] = useState(false);

  const pathname = usePathname();
  const { isAuthenticated, user } = useAuthStore();

  return (
    <header className={css.header}>
      <div className="container">
        <div
          className={clsx(
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
            {isAuthenticated && user ? (
              <UserNav user={user} openModal={() => setIsModalLogout(true)} />
            ) : (
              <AuthNav />
            )}

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
      </div>
    </header>
  );
}
