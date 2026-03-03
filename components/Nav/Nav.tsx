"use client";

import Link from "next/link";
import css from "./Nav.module.css";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface NavProps {
  isMenu?: boolean;
  onCloseMenu?: () => void;
}

export default function Nav({ isMenu, onCloseMenu }: NavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={clsx(
        css.nav,
        pathname === "/" && css.homePage,
        isMenu && css.isMenu,
      )}
    >
      <Link
        href="/news"
        className={clsx(css.link, pathname === "/news" && css.currentPage)}
        onClick={onCloseMenu}
      >
        News
      </Link>

      <Link
        href="/notices"
        className={clsx(css.link, pathname === "/notices" && css.currentPage)}
        onClick={onCloseMenu}
      >
        Find pet
      </Link>

      <Link
        href="/friends"
        className={clsx(css.link, pathname === "/friends" && css.currentPage)}
        onClick={onCloseMenu}
      >
        Our friends
      </Link>
    </nav>
  );
}
