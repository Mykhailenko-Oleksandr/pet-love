import { Friends } from "@/types/friends";
import css from "./FriendsList.module.css";
import FriendsItem from "../FriendsItem/FriendsItem";

interface FriendsListProps {
  friends: Friends[];
}

export default function FriendsList({ friends }: FriendsListProps) {
  return (
    <ul className={css.list}>
      {friends.map((friend) => {
        return <FriendsItem friend={friend} key={friend._id} />;
      })}
    </ul>
  );
}
