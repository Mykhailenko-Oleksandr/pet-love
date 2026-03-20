import css from "./ModalNotice.module.css";
import Modal from "../Modal/Modal";
import Image from "next/image";
import { NoticeFull } from "@/types/notice";

interface ModalNoticeProps {
  onClose: () => void;
  notice: NoticeFull;
}

export default function ModalNotice({ onClose, notice }: ModalNoticeProps) {
  console.log(notice);

  return (
    <Modal onClose={onClose} isNoticesModal>
      <div className={css.imgBox}>
        <Image
          src={notice.imgURL}
          alt={notice.name}
          fill
          sizes="(max-width: 767px) 120px, 150px"
          loading="eager"
        />
        <div className={css.imgBadge}>{notice.category}</div>
      </div>
    </Modal>
  );
}
