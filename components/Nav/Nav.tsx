"use client";

import Link from "next/link";
import css from "./Nav.module.css";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className={clsx(css.nav, pathname === "/" && css.homePage)}>
      <Link
        href="/news"
        className={clsx(css.link, pathname === "/news" && css.currentPage)}
      >
        News
      </Link>

      <Link
        href="/notices"
        className={clsx(css.link, pathname === "/notices" && css.currentPage)}
      >
        Find pet
      </Link>

      <Link
        href="/friends"
        className={clsx(css.link, pathname === "/friends" && css.currentPage)}
      >
        Our friends
      </Link>
    </nav>
  );
}
