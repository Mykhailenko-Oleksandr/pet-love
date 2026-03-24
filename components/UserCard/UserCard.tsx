"use client";

import { ChangeEvent, useState } from "react";
import EditUserBtn from "../EditUserBtn/EditUserBtn";
import css from "./UserCard.module.css";
import Image from "next/image";
import clsx from "clsx";
import { updateUser, uploadImage } from "@/lib/api/clientApi";
import toast from "react-hot-toast";
import { useAuthStore } from "@/lib/store/authStore";
import { ApiError } from "@/app/api/api";
import PetsBlock from "../PetsBlock/PetsBlock";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import ModalApproveAction from "../ModalApproveAction/ModalApproveAction";

export default function UserCard() {
  const { user, setUser } = useAuthStore();
  const [modalEdit, setModalEdit] = useState(false);
  const [approveModal, setApproveModal] = useState(false);

  console.log(user);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("The image must be under 5 MB");
      return;
    }

    try {
      const imgUrl = await uploadImage(file);
      const updatedUser = await updateUser({ avatar: imgUrl });
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
    <>
      <div className={css.box}>
        <div className={css.userBadge}>
          User
          <svg width={18} height={18}>
            <use href="/sprite.svg#user"></use>
          </svg>
        </div>
        <EditUserBtn onClick={() => setModalEdit(true)} />

        {user && (
          <>
            {user.avatar ? (
              <label htmlFor="uploadPhoto" className={css.label}>
                <div className={css.avatarBox}>
                  <Image
                    src={user.avatar}
                    alt="Avatar"
                    fill
                    sizes="(max-width: 767px) 94px, 110px"
                  />
                </div>
                <input
                  type="file"
                  id="uploadPhoto"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className={css.defaultAvatarBox}>
                <label htmlFor="uploadPhoto">
                  <div className={css.defaultAvatar}>
                    <svg width={40} height={40}>
                      <use href="/sprite.svg#user"></use>
                    </svg>
                  </div>
                </label>

                <label className={css.label}>
                  <input
                    type="file"
                    id="uploadPhoto"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  Upload photo
                </label>
              </div>
            )}

            <h3 className={css.title}> My information</h3>

            <ul className={css.listUserInfo}>
              <li className={clsx(css.itemUserInfo, !user.name && css.noInfo)}>
                {user.name ? user.name : "Name"}
              </li>
              <li className={clsx(css.itemUserInfo, !user.email && css.noInfo)}>
                {user.email ? user.email : "name@gmail.com|"}
              </li>
              <li className={clsx(css.itemUserInfo, !user.phone && css.noInfo)}>
                {user.phone ? user.phone : "+380"}
              </li>
            </ul>

            {<PetsBlock pets={user.pets} />}

            <LogOutBtn
              openModal={() => setApproveModal(true)}
              inMenu
              inUserCard
            />
          </>
        )}
      </div>

      {approveModal && (
        <ModalApproveAction onClose={() => setApproveModal(false)} />
      )}
    </>
  );
}
