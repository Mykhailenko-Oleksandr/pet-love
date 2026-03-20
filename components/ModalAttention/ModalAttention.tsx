import Image from "next/image";
import Modal from "../Modal/Modal";
import css from "./ModalAttention.module.css";
import Link from "next/link";
import clsx from "clsx";

interface ModalAttentionProps {
  onClose: () => void;
}

export default function ModalAttention({ onClose }: ModalAttentionProps) {
  return (
    <Modal onClose={onClose} isAttentionModal>
      <div className={css.imgBox}>
        <Image src="/images/dog-icon.png" alt="Cat" width={44} height={44} />
      </div>
      <h2 className={css.title}>Attention</h2>
      <p className={css.text}>
        We would like to remind you that certain functionality is available only
        to authorized users.If you have an account, please log in with your
        credentials. If you do not already have an account, you must register to
        access these features.
      </p>

      <div className={css.linksBox}>
        <Link href="/login" className={clsx(css.link, css.linkLogin)}>
          Log In
        </Link>
        <Link href="/register" className={clsx(css.link, css.linkRegister)}>
          Registration
        </Link>
      </div>
    </Modal>
  );
}
