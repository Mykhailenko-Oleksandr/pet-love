"use client";

import css from "./AddPetForm.module.css";
import * as yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { ChangeEvent, MouseEvent, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { addPets, uploadImage } from "@/lib/api/clientApi";
import { ApiError } from "@/app/api/api";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomSelect from "../CustomSelect/CustomSelect";
import { SpeciesArray } from "@/types/species";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  title: string;
  imgURL: string;
  species: string;
  birthday: string;
  sex?: string;
}
const schema = yup
  .object({
    name: yup
      .string()
      .min(3, "Name must be at least 3 characters long")
      .max(20, "Name must be at most 20 characters long")
      .required("Name is required"),
    title: yup
      .string()
      .min(3, "Title must be at least 3 characters long")
      .max(40, "Title must be at most 40 characters long")
      .required("Title is required"),
    imgURL: yup
      .string()
      .matches(
        /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
        "Image URL must be a valid link ending with .png, .jpg, .jpeg, .gif, .bmp, or .webp",
      )
      .required("Image URL is required"),
    species: yup
      .string()
      .oneOf(SpeciesArray, "Species must be one of the predefined values")
      .required("Species is required"),
    birthday: yup
      .string()
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Birthday must be in format YYYY-MM-DD")
      .required("Birthday is required"),
    sex: yup
      .string()
      .oneOf(
        ["unknown", "female", "male", "multiple"],
        "Sex must be one of: unknown, female, male, multiple",
      )
      .default("unknown")
      .required("Sex is required"),
  })
  .required();

interface Props {
  species: string[];
}

export default function AddPetForm({ species }: Props) {
  const [sex, setSex] = useState<"female" | "male" | "multiple" | "unknown">(
    "unknown",
  );
  const [urlPhoto, setUrlPhoto] = useState<string | null>(null);
  const { setUser } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isValid, dirtyFields },
  } = useForm({ mode: "onTouched", resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const updatedUser = await addPets({ ...data, sex });
      setUser(updatedUser);
      router.push("/profile");
      toast.success("Pet successfully added");
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

  function handleRadioClick(e: MouseEvent<HTMLInputElement>) {
    const { value } = e.currentTarget;
    const typedValue = value as "female" | "male" | "multiple";

    if (sex === typedValue) {
      setSex("unknown");
      setValue("sex", "unknown");
      return;
    }
    setSex(typedValue);
    setValue("sex", typedValue);
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("The image must be under 5 MB");
      return;
    }
    try {
      const imgUrl = await uploadImage(file);
      setValue("imgURL", imgUrl, { shouldValidate: true, shouldDirty: true });
      setUrlPhoto(imgUrl);
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
    <div className={css.box}>
      <div className={css.titleBox}>
        <h2 className={css.title}>Add my pet /</h2>
        <p className={css.titleText}>Personal details</p>
      </div>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={css.sexRadioBox}>
          <label className={css.sexLabel}>
            <input
              type="radio"
              name="sex"
              value="female"
              checked={sex === "female"}
              onClick={handleRadioClick}
              onChange={() => {}}
              className={css.defaultRadio}
            />
            <span className={clsx(css.sexBtn, css.female)}>
              <svg width={20} height={20}>
                <use href="/sprite.svg#female"></use>
              </svg>
            </span>
          </label>

          <label className={css.sexLabel}>
            <input
              type="radio"
              name="sex"
              value="male"
              checked={sex === "male"}
              onClick={handleRadioClick}
              onChange={() => {}}
              className={css.defaultRadio}
            />
            <span className={clsx(css.sexBtn, css.male)}>
              <svg width={20} height={20}>
                <use href="/sprite.svg#male"></use>
              </svg>
            </span>
          </label>

          <label className={css.sexLabel}>
            <input
              type="radio"
              name="sex"
              value="multiple"
              checked={sex === "multiple"}
              onClick={handleRadioClick}
              onChange={() => {}}
              className={css.defaultRadio}
            />
            <span className={clsx(css.sexBtn, css.multiple)}>
              <svg width={20} height={20}>
                <use href="/sprite.svg#male-female"></use>
              </svg>
            </span>
          </label>
        </fieldset>
        {urlPhoto ? (
          <div className={css.photoBox}>
            <Image
              src={urlPhoto}
              alt="Photo pet"
              fill
              sizes="(max-width: 767px) 68px, 86px"
            />
          </div>
        ) : (
          <div className={css.defaultPhotoBox}>
            <svg width={32} height={32}>
              <use href="/sprite.svg#cat-footprint"></use>
            </svg>
          </div>
        )}

        <div className={css.uploadPhotoBox}>
          <div className={css.uploadPhotoInputBox}>
            <div className={clsx(css.urlPhoto, urlPhoto && css.isPhoto)}>
              {urlPhoto ? urlPhoto : "Enter URL"}
            </div>

            <label className={css.label}>
              <input
                type="file"
                id="uploadPhoto"
                accept="image/*"
                onChange={handleFileChange}
              />
              Upload photo
              <svg width={16} height={16}>
                <use href="/sprite.svg#cloud"></use>
              </svg>
            </label>
          </div>

          {errors.imgURL?.message && (
            <span className={css.errorText}>{errors.imgURL?.message}</span>
          )}
        </div>

        <div className={css.inputBox}>
          <input
            type="text"
            placeholder="Title"
            className={clsx(
              css.input,
              errors.title?.message && css.errorInput,
              !errors.title?.message && dirtyFields.title && css.validInput,
            )}
            {...register("title")}
          />

          {errors.title?.message && (
            <span className={css.errorText}>{errors.title?.message}</span>
          )}
        </div>

        <div className={css.inputBox}>
          <input
            type="text"
            placeholder="Pet’s Name"
            className={clsx(
              css.input,
              errors.name?.message && css.errorInput,
              !errors.title?.message && dirtyFields.title && css.validInput,
            )}
            {...register("name")}
          />

          {errors.name?.message && (
            <span className={css.errorText}>{errors.name?.message}</span>
          )}
        </div>

        <div className={css.calendarSpeciesBox}>
          <div className={css.calendarInputBox}>
            <Controller
              name="birthday"
              control={control}
              render={({ field }) => (
                <DatePicker
                  id="date"
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date: Date | null) => {
                    if (date) {
                      field.onChange(date.toISOString().split("T")[0]);
                    } else {
                      field.onChange("");
                    }
                  }}
                  maxDate={new Date()}
                  dateFormat="dd.MM.yyyy"
                  placeholderText="00.00.0000"
                  className={clsx(
                    css.input,
                    errors.birthday?.message && css.errorInput,
                    !errors.birthday?.message &&
                      dirtyFields.birthday &&
                      css.validInput,
                  )}
                />
              )}
            />
            <label htmlFor="date">
              <svg width={18} height={18} className={css.iconCalendar}>
                <use href="/sprite.svg#calendar"></use>
              </svg>
            </label>
            {errors.birthday?.message && (
              <span className={clsx(css.errorText, css.errorCalendar)}>
                {errors.birthday?.message}
              </span>
            )}
          </div>

          <div className={css.speciesSelectBox}>
            <Controller
              name="species"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  values={species}
                  onChange={field.onChange}
                  placeholder="Type of pet"
                  inAddPet
                />
              )}
            />
          </div>
        </div>

        <div className={css.bottomBtnsBox}>
          <Link href="/profile" className={clsx(css.btn, css.linkBack)}>
            Back
          </Link>
          <button
            type="submit"
            className={clsx(css.btn, css.submitBtn)}
            disabled={!isValid}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
