import { Notice, NoticeFull } from "@/types/notice";
import css from "./NoticesList.module.css";
import NoticesItem from "../NoticesItem/NoticesItem";

interface NoticesListProps {
  notices: Notice[];
  openAttentionModal: () => void;
  openModalNotice: () => void;
  changeFullInfoNotice: (value: NoticeFull | null) => void;
}

export default function NoticesList({
  notices,
  openAttentionModal,
  openModalNotice,
  changeFullInfoNotice,
}: NoticesListProps) {
  return (
    <ul className={css.list}>
      {notices.map((notice) => {
        return (
          <NoticesItem
            notice={notice}
            openAttentionModal={openAttentionModal}
            openModalNotice={openModalNotice}
            key={notice._id}
            changeFullInfoNotice={changeFullInfoNotice}
          />
        );
      })}
    </ul>
  );
}
