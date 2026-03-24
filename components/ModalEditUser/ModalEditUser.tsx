"use client";

import css from "./ModalEditUser.module.css";
import Modal from "../Modal/Modal";
import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { updateUser, uploadImage } from "@/lib/api/clientApi";
import { ApiError } from "@/app/api/api";
import clsx from "clsx";

interface FormData {
  avatar?: string;
  name?: string;
  email?: string;
  phone?: string;
}

const schema = yup
  .object({
    avatar: yup
      .string()
      .matches(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/),
    name: yup
      .string()
      .min(3, "Name must be at least 3 characters long")
      .max(30, "Name must be at most 30 characters long"),
    email: yup
      .string()
      .max(40, "Email must not exceed 40 characters")
      .matches(
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        "Email must be a valid format",
      ),
    phone: yup
      .string()
      .matches(/^$|^\+38\d{10}$/, "Phone must be in format +38XXXXXXXXXX"),
  })
  .required();

interface Props {
  onClose: () => void;
}

export default function ModalEditUser({ onClose }: Props) {
  const { user, setUser } = useAuthStore();
  const [urlAvatar, setUrlAvatar] = useState(
    user?.avatar ? user.avatar : "https://",
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: "onTouched", resolver: yupResolver(schema) });

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("The image must be under 5 MB");
      return;
    }

    try {
      const imgUrl = await uploadImage(file);
      setValue("avatar", imgUrl);
      setUrlAvatar(imgUrl);
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

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (data.phone === "") {
      delete data.phone;
    }

    try {
      const updatedUser = await updateUser(data);
      setUser(updatedUser);
      onClose();
      toast.success("The data has been updated");
    } catch (error: unknown) {
      const err = error as ApiError;

      toast.error(
        err.response?.data?.response?.validation?.body?.message ||
          err.response?.data?.response?.message ||
          err.message ||
          "There was an error, please try again",
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];

    if (!/[0-9+]/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <Modal onClose={onClose} isEditUserModal>
      <>
        <h3 className={css.title}>Edit information</h3>

        {urlAvatar ? (
          <div className={css.avatarBox}>
            <Image
              src={urlAvatar}
              alt="Avatar"
              fill
              sizes="(max-width: 767px) 80px, 86px"
            />
          </div>
        ) : (
          <div className={css.defaultAvatar}>
            <svg width={40} height={40}>
              <use href="/sprite.svg#user"></use>
            </svg>
          </div>
        )}

        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={css.uploadAvatarBox}>
            <div className={clsx(css.urlAvatar, user?.avatar && css.isAvatar)}>
              {urlAvatar}
            </div>
            <label className={css.label}>
              <input
                type="file"
                id="uploadPhoto"
                accept="image/*"
                onChange={handleFileChange}
              />
              Upload photo
              <svg width={18} height={18}>
                <use href="/sprite.svg#cloud"></use>
              </svg>
            </label>
          </div>

          <ul className={css.inputsList}>
            <li className={css.inputItem}>
              <input
                type="text"
                placeholder="Your name"
                defaultValue={user?.name}
                className={clsx(
                  css.input,
                  errors.name?.message && css.errorInput,
                )}
                {...register("name")}
              />

              {errors.name?.message && (
                <span className={css.errorText}>{errors.name?.message}</span>
              )}
            </li>

            <li className={css.inputItem}>
              <input
                type="email"
                placeholder="Your email"
                defaultValue={user?.email}
                className={clsx(
                  css.input,
                  errors.email?.message && css.errorInput,
                )}
                {...register("email")}
              />

              {errors.email?.message && (
                <span className={css.errorText}>{errors.email?.message}</span>
              )}
            </li>

            <li className={css.inputItem}>
              <input
                type="tel"
                placeholder="+380"
                onKeyDown={handleKeyPress}
                defaultValue={user?.phone}
                className={clsx(
                  css.input,
                  errors.phone?.message && css.errorInput,
                )}
                {...register("phone")}
              />

              {errors.phone?.message && (
                <span className={css.errorText}>{errors.phone?.message}</span>
              )}
            </li>
          </ul>

          <button type="submit" disabled={!isValid} className={css.submitBtn}>
            Save
          </button>
        </form>
      </>
    </Modal>
  );
}
