import { User } from "@/types/user";
import UserBar from "../UserBar/UserBar";
import css from "./UserNav.module.css";

interface UserNavProps {
  user: User;
}

export default function UserNav({ user }: UserNavProps) {
  return (
    <div className={css.box}>
      <UserBar user={user} />
    </div>
  );
}
