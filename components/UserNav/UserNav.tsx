import { User } from "@/types/user";
import UserBar from "../UserBar/UserBar";
import css from "./UserNav.module.css";
import LogOutBtn from "../LogOutBtn/LogOutBtn";

interface UserNavProps {
  user: User;
  openModal: () => void;
}

export default function UserNav({ user, openModal }: UserNavProps) {
  return (
    <div className={css.box}>
      <LogOutBtn openModal={openModal} />
      <UserBar user={user} />
    </div>
  );
}
