"use client";

import { Notice, NoticeFull } from "@/types/notice";
import css from "./NoticesItem.module.css";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";
import {
  addFavoriteNotice,
  currentUser,
  getNoticeById,
  removeFavoriteNotice,
} from "@/lib/api/clientApi";
import { ApiError } from "@/app/api/api";
import toast from "react-hot-toast";
import { reversBirthdayDate } from "@/utils/reverseBirthdayDate";
import clsx from "clsx";

interface NoticesItemProps {
  notice: Notice;
  openAttentionModal: () => void;
  openModalNotice: () => void;
  changeFullInfoNotice: (value: NoticeFull | null) => void;
}

export default function NoticesItem({
  notice,
  openAttentionModal,
  openModalNotice,
  changeFullInfoNotice,
}: NoticesItemProps) {
  const { user, isAuthenticated, setUser } = useAuthStore();

  const isFavorite = user?.noticesFavorites.some(
    (favoriteNotice) => favoriteNotice._id === notice._id,
  );

  const handleClickLikeBtn = async () => {
    if (!isAuthenticated) {
      openAttentionModal();
      return;
    }

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
  };

  const handleClickLearnMoreBtn = async () => {
    if (!isAuthenticated) {
      openAttentionModal();
      return;
    }
    try {
      const fullInfoNotice = await getNoticeById(notice._id);
      changeFullInfoNotice(fullInfoNotice);
      openModalNotice();
    } catch (error: unknown) {
      const err = error as ApiError;

      changeFullInfoNotice(null);

      toast.error(
        err.response?.data?.response?.validation?.body?.message ||
          err.response?.data?.response?.message ||
          err.message ||
          "There was an error, please try again",
      );
    }
  };

  return (
    <li className={css.item}>
      <div className={css.imgBox}>
        <Image
          src={notice.imgURL}
          alt={notice.title}
          fill
          sizes="(max-width: 767px) 287px, (max-width: 1279px) 294px, 315px"
          loading="eager"
          className={css.img}
        />
      </div>

      <div className={css.topBox}>
        <h3 className={css.title}>{notice.title}</h3>
        <div className={css.popularBox}>
          <svg width={16} height={16} className={css.popularityIcon}>
            <use href="/sprite.svg#star"></use>
          </svg>
          <p className={css.popularityNumber}>{notice.popularity}</p>
        </div>
      </div>

      <ul className={css.listInfo}>
        <li className={css.itemInfo}>
          <p className={css.titleItemInfo}>Name</p>
          <p className={css.valueInfoPet}> {notice.name.split(" ")[0]}</p>
        </li>
        <li className={css.itemInfo}>
          <p className={css.titleItemInfo}>Birthday</p>
          <p className={css.valueInfoPet}>{reversBirthdayDate(notice)}</p>
        </li>
        <li className={css.itemInfo}>
          <p className={css.titleItemInfo}>Sex</p>
          <p className={css.valueInfoPet}>{notice.sex}</p>
        </li>
        <li className={css.itemInfo}>
          <p className={css.titleItemInfo}>Species</p>
          <p className={css.valueInfoPet}>{notice.species}</p>
        </li>
        <li className={css.itemInfo}>
          <p className={css.titleItemInfo}>Category</p>
          <p className={css.valueInfoPet}>{notice.category}</p>
        </li>
      </ul>

      <p className={css.comment}>{notice.comment}</p>
      <p className={css.price}>
        {notice.price ? `$${notice.price.toFixed(2)}` : "No price"}
      </p>

      <div className={css.btnsBox}>
        <button
          type="button"
          onClick={handleClickLearnMoreBtn}
          className={css.learnMoreBtn}
        >
          Learn more
        </button>

        <button
          type="button"
          aria-label="Add-remove favorite pet"
          onClick={handleClickLikeBtn}
          className={clsx(css.likeBtn, isFavorite && css.isFavorite)}
        >
          <svg width={18} height={18}>
            <use href="/sprite.svg#heart"></use>
          </svg>
        </button>
      </div>
    </li>
  );
}
