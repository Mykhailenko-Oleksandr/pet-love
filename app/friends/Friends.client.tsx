"use client";

import Title from "@/components/Title/Title";
import css from "./Friends.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getFriends } from "@/lib/api/clientApi";

export default function FriendsClient() {
  const { data, isError, isSuccess } = useQuery({
    queryKey: ["friends"],
    queryFn: () => getFriends(),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  return (
    <section className={css.section}>
      <div className="container">
        <Title title="Our friends" />
      </div>
    </section>
  );
}
