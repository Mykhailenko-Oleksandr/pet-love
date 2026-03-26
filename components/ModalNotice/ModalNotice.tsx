"use client";

import css from "./ModalNotice.module.css";
import Modal from "../Modal/Modal";
import Image from "next/image";
import { NoticeFull } from "@/types/notice";
import { reversBirthdayDate } from "@/utils/reverseBirthdayDate";
import clsx from "clsx";
import {
  addFavoriteNotice,
  currentUser,
  removeFavoriteNotice,
} from "@/lib/api/clientApi";
import { ApiError } from "@/app/api/api";
import toast from "react-hot-toast";
import { useAuthStore } from "@/lib/store/authStore";
import { useState } from "react";
import Link from "next/link";

interface ModalNoticeProps {
  onClose: () => void;
  notice: NoticeFull;
}

export default function ModalNotice({ onClose, notice }: ModalNoticeProps) {
  const [modalContacts, setModalContacts] = useState(false);
  const { user, setUser } = useAuthStore();

  const isFavorite = user?.noticesFavorites.some(
    (favoriteNotice) => favoriteNotice._id === notice._id,
  );

  async function addRemoveFavorite() {
    if (!isFavorite) {
      try {
        await addFavoriteNotice(notice._id);
        const updatedUser = await currentUser();
        setUser(updatedUser);
      } catch (error: unknown) {
        const err = error as ApiError;

        toast.error(
          err.response?.data?.response?.validation?.body?.message ||
            err.response?.data?.response?.message ||
            err.message ||
            "There was an error, please try again",
        );
      }
    } else {
      try {
        await removeFavoriteNotice(notice._id);
        const updatedUser = await currentUser();
        setUser(updatedUser);
      } catch (error: unknown) {
        const err = error as ApiError;

        toast.error(
          err.response?.data?.response?.validation?.body?.message ||
            err.response?.data?.response?.message ||
            err.message ||
            "There was an error, please try again",
        );
      }
    }
  }

  return (
    <>
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
        <h3 className={css.title}>{notice.title}</h3>
        <div className={css.popularBox}>
          <svg width={16} height={16}>
            <use href="/sprite.svg#star"></use>
          </svg>
          <p className={css.popularityNumber}>{notice.popularity}</p>
        </div>

        <ul className={css.listInfo}>
          <li className={css.itemInfo}>
            <p className={css.titleItemInfo}>Name</p>
            <p className={css.valueInfoPet}> {notice.name.split(" ")[0]}</p>
          </li>
          <li className={css.itemInfo}>
            <p className={css.titleItemInfo}>Birthday</p>
            <p className={css.valueInfoPet}>{reversBirthdayDate({ notice })}</p>
          </li>
          <li className={css.itemInfo}>
            <p className={css.titleItemInfo}>Sex</p>
            <p className={css.valueInfoPet}>{notice.sex}</p>
          </li>
          <li className={css.itemInfo}>
            <p className={css.titleItemInfo}>Species</p>
            <p className={css.valueInfoPet}>{notice.species}</p>
          </li>
        </ul>

        <p className={css.comment}>{notice.comment}</p>
        <p className={css.price}>
          {notice.price ? `$${notice.price.toFixed(2)}` : "No price"}
        </p>

        <div className={css.btnsBox}>
          <button
            type="button"
            onClick={addRemoveFavorite}
            className={clsx(css.btn, css.addBtn, isFavorite && css.isFavorite)}
          >
            {isFavorite ? "Remove to" : "Add to"}

            <svg width={18} height={18}>
              <use href="/sprite.svg#heart"></use>
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setModalContacts(true)}
            className={clsx(css.btn, css.contactsBtn)}
          >
            Contact
          </button>
        </div>
      </Modal>

      {modalContacts && (
        <Modal onClose={() => setModalContacts(false)}>
          <h3 className={css.title}>Contacts</h3>
          {notice.user.email && (
            <div className={css.contactBox}>
              <p className={css.keyContact}>Email:</p>
              <Link
                href={`mailto:${notice.user.email}`}
                className={css.contactLink}
              >
                {notice.user.email}
              </Link>
            </div>
          )}
          {notice.user.phone && (
            <div className={css.contactBox}>
              <p className={css.keyContact}>Phone:</p>
              <Link
                href={`tel:${notice.user.phone}`}
                className={css.contactLink}
              >
                {notice.user.phone}
              </Link>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
