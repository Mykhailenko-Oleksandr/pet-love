import { Notice } from "@/types/notice";
import css from "./NoticesList.module.css";
import NoticesItem from "../NoticesItem/NoticesItem";

interface NoticesListProps {
  notices: Notice[];
  openAttentionModal: () => void;
}

export default function NoticesList({
  notices,
  openAttentionModal,
}: NoticesListProps) {
  return (
    <ul className={css.list}>
      {notices.map((notice) => {
        return (
          <NoticesItem
            notice={notice}
            openAttentionModal={openAttentionModal}
            key={notice._id}
          />
        );
      })}
    </ul>
  );
}
