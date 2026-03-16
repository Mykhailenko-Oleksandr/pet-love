"use client";

import Title from "@/components/Title/Title";
import css from "./Friends.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getFriends } from "@/lib/api/clientApi";
import FriendsList from "@/components/FriendsList/FriendsList";

export default function FriendsClient() {
  const { data: friends, isError } = useQuery({
    queryKey: ["friends"],
    queryFn: () => getFriends(),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  return (
    <section className={css.section}>
      <div className="container">
        <Title title="Our friends" />

        {friends && friends.length > 0 ? (
          <FriendsList friends={friends} />
        ) : (
          <p className={css.textMessage}>No friends found at this time.</p>
        )}

        {isError && (
          <p className={css.textMessage}>
            There was an error, please try again...
          </p>
        )}
      </div>
    </section>
  );
}
