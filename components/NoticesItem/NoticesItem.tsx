"use client";

import { Notice } from "@/types/notice";
import css from "./NoticesItem.module.css";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";

interface NoticesItemProps {
  notice: Notice;
  openAttentionModal: () => void;
}

export default function NoticesItem({
  notice,
  openAttentionModal,
}: NoticesItemProps) {
  const { user, isAuthenticated } = useAuthStore();

  const reversBirthdayDate = () => {
    if (notice.birthday) {
      const year = notice.birthday.slice(0, 4);
      const month = notice.birthday.slice(5, 7);
      const day = notice.birthday.slice(8, 10);

      return `${day}.${month}.${year}`;
    }

    return "Not specified";
  };

  const handleClickLikeBtn = () => {
    if (!isAuthenticated) {
      openAttentionModal();
    }
  };

  const handleClickLearnMoreBtn = () => {
    if (!isAuthenticated) {
      openAttentionModal();
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
          <p className={css.valueInfoPet}>{reversBirthdayDate()}</p>
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
        {notice.price ? `$${notice.price}` : "No price"}
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
          className={css.likeBtn}
        >
          <svg width={18} height={18}>
            <use href="/sprite.svg#heart"></use>
          </svg>
        </button>
      </div>
    </li>
  );
}
