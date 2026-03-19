import { Notice } from "@/types/notice";
import css from "./NoticesList.module.css";
import NoticesItem from "../NoticesItem/NoticesItem";

interface NoticesListProps {
  notices: Notice[];
}

export default function NoticesList({ notices }: NoticesListProps) {
  return (
    <ul className={css.list}>
      {notices.map((notice) => {
        return <NoticesItem notice={notice} key={notice._id} />;
      })}
    </ul>
  );
}
