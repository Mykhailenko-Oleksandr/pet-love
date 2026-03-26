"use client";

import { Pet } from "@/types/pet";
import css from "./PetsItem.module.css";
import Image from "next/image";
import { reversBirthdayDate } from "@/utils/reverseBirthdayDate";
import { useAuthStore } from "@/lib/store/authStore";
import { deletePets } from "@/lib/api/clientApi";
import { ApiError } from "@/app/api/api";
import toast from "react-hot-toast";

interface Props {
  pet: Pet;
}

export default function PetsItem({ pet }: Props) {
  const setUser = useAuthStore((state) => state.setUser);

  async function handleClickDeleteBtn() {
    try {
      const updatedUser = await deletePets(pet._id);
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

  return (
    <li className={css.item}>
      <div className={css.imgBox}>
        <Image
          src={pet.imgURL}
          alt={pet.name}
          fill
          sizes="(max-width: 767px) 66px, (max-width: 1279px) 75px, 90px"
          loading="eager"
          className={css.img}
        />
      </div>

      <div className={css.infoPetBox}>
        <h4 className={css.title}>{pet.title}</h4>

        <ul className={css.listInfoPet}>
          <li className={css.itemInfo}>
            <p className={css.titleItemInfo}>Name</p>
            <p className={css.valueInfoPet}> {pet.name}</p>
          </li>
          <li className={css.itemInfo}>
            <p className={css.titleItemInfo}>Birthday</p>
            <p className={css.valueInfoPet}>{reversBirthdayDate({ pet })}</p>
          </li>
          <li className={css.itemInfo}>
            <p className={css.titleItemInfo}>Sex</p>
            <p className={css.valueInfoPet}>{pet.sex}</p>
          </li>
          <li className={css.itemInfo}>
            <p className={css.titleItemInfo}>Species</p>
            <p className={css.valueInfoPet}>{pet.species}</p>
          </li>
        </ul>
      </div>

      <button
        type="button"
        onClick={handleClickDeleteBtn}
        className={css.deleteBtn}
      >
        <svg width={16} height={16}>
          <use href="/sprite.svg#basket"></use>
        </svg>
      </button>
    </li>
  );
}
