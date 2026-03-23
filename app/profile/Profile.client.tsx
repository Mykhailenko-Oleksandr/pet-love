"use client";

import { UserFull } from "@/types/user";
import css from "./Profile.module.css";
import UserCard from "@/components/UserCard/UserCard";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";
import clsx from "clsx";

interface ProfileClientProps {
  userFull: UserFull;
}

export default function ProfileClient({ userFull }: ProfileClientProps) {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    setUser(userFull);
  }, [userFull, setUser]);

  return (
    <section className={css.section}>
      <div className={clsx("container", css.profileContainer)}>
        {user && <UserCard />}
      </div>
    </section>
  );
}
