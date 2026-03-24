import { Notice } from "@/types/notice";
import css from "./NoticesList.module.css";
import NoticesItem from "../NoticesItem/NoticesItem";
import clsx from "clsx";

interface NoticesListProps {
  notices: Notice[];
  profile?: boolean;
  noticesViewed?: boolean;
}

export default function NoticesList({
  notices,
  profile,
  noticesViewed,
}: NoticesListProps) {
  return (
    <ul className={clsx(css.list, profile && css.inProfile)}>
      {notices.map((notice) => {
        return (
          <NoticesItem
            notice={notice}
            key={notice._id}
            profile={profile}
            viewed={noticesViewed}
          />
        );
      })}
    </ul>
  );
}
