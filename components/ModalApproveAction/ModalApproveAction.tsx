import Image from "next/image";
import Modal from "../Modal/Modal";
import css from "./ModalApproveAction.module.css";
import clsx from "clsx";

interface ModalApproveActionProps {
  onClose: () => void;
  confirm: () => void;
}

export default function ModalApproveAction({
  onClose,
  confirm,
}: ModalApproveActionProps) {
  return (
    <Modal onClose={onClose}>
      <div className={css.imgBox}>
        <Image src="/images/cat-icon.png" alt="Cat" width={44} height={44} />
      </div>
      <h2 className={css.title}>Already leaving?</h2>
      <div className={css.btnsBox}>
        <button
          type="button"
          className={clsx(css.btn, css.btnYes)}
          onClick={confirm}
        >
          Yes
        </button>
        <button
          type="button"
          className={clsx(css.btn, css.btnCancel)}
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
