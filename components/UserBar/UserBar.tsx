"use client";

import { User } from "@/types/user";
import css from "./UserBar.module.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface UserBarProps {
  user: User;
}

export default function UserBar({ user }: UserBarProps) {
  const pathname = usePathname();

  return (
    <Link href="/profile" className={css.link}>
      <div className={css.avatarBox}>
        {user.avatar ? (
          <Image src={user.avatar} alt="Avatar" width={40} height={40} />
        ) : (
          <svg width={20} height={20}>
            <use href="/sprite.svg#user"></use>
          </svg>
        )}
      </div>
      <span className={clsx(css.userName, pathname === "/" && css.homePage)}>
        {user.name}
      </span>
    </Link>
  );
}
