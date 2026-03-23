"use client";

import Image from "next/image";
import Modal from "../Modal/Modal";
import css from "./ModalApproveAction.module.css";
import clsx from "clsx";
import { useAuthStore } from "@/lib/store/authStore";
import { logoutUser } from "@/lib/api/clientApi";
import { ApiError } from "@/app/api/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ModalApproveActionProps {
  onClose: () => void;
}

export default function ModalApproveAction({
  onClose,
}: ModalApproveActionProps) {
  const { clearIsAuthenticated } = useAuthStore();
  const router = useRouter();

  async function handleLogout() {
    try {
      await logoutUser();
    } catch (error: unknown) {
      const err = error as ApiError;
      toast.error(
        err.response?.data?.response?.validation?.body?.message ||
          err.response?.data?.response?.message ||
          err.message,
      );
    } finally {
      clearIsAuthenticated();
      router.push("/");
      onClose();
    }
  }

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
          onClick={handleLogout}
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
