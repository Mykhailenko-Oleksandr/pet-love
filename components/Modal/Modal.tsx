"use client";

import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import { MouseEvent, ReactNode, useEffect } from "react";
import clsx from "clsx";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  isAttentionModal?: boolean;
  isNoticesModal?: boolean;
}

export default function Modal({
  children,
  onClose,
  isAttentionModal,
  isNoticesModal,
}: ModalProps) {
  function handleClickBackdrop(e: MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onEsc);
    document.body.classList.add("noScroll");

    return () => {
      window.removeEventListener("keydown", onEsc);
      document.body.classList.remove("noScroll");
    };
  }, [onClose]);

  return createPortal(
    <div className={css.backdrop} onClick={handleClickBackdrop}>
      <div
        className={clsx(
          css.modal,
          isAttentionModal && css.isAttentionModal,
          isNoticesModal && css.isNoticesModal,
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className={css.closeBtn}
        >
          <svg>
            <use href="/sprite.svg#close"></use>
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
