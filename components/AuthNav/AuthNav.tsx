"use client";

import Link from "next/link";
import css from "./AuthNav.module.css";
import clsx from "clsx";
import { usePathname } from "next/navigation";

interface AuthNavProps {
  isMenu?: boolean;
  onCloseMenu?: () => void;
}

export default function AuthNav({ isMenu, onCloseMenu }: AuthNavProps) {
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        css.box,
        pathname === "/" && css.homePage,
        isMenu && css.isMenu,
      )}
    >
      <Link href="/login" className={css.link} onClick={onCloseMenu}>
        Log In
      </Link>

      <Link
        href="/register"
        className={clsx(css.link, css.registerLink)}
        onClick={onCloseMenu}
      >
        Registration
      </Link>
    </div>
  );
}
