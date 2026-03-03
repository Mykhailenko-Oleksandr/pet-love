"use client";

import Link from "next/link";
import css from "./AuthNav.module.css";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function AuthNav() {
  const pathname = usePathname();

  return (
    <div className={clsx(css.box, pathname === "/" && css.homePage)}>
      <Link href="/login" className={css.link}>
        Log In
      </Link>

      <Link href="/register" className={clsx(css.link, css.registerLink)}>
        Registration
      </Link>
    </div>
  );
}
