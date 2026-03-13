"use client";

import css from "./LoginForm.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Link from "next/link";
import { loginUser } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { ApiError } from "@/app/api/api";
import toast from "react-hot-toast";

interface FormData {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .matches(
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        "Enter a valid Email",
      )
      .required("Email is required"),
    password: yup
      .string()
      .min(7, "Password must be at least 7 characters")
      .required("Password is required"),
  })
  .required();

interface LoginFormProps {
  changeDirtyInputs: (count: number) => void;
}

export default function LoginForm({ changeDirtyInputs }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
  } = useForm<FormData>({ mode: "onChange", resolver: yupResolver(schema) });

  const dirtyCount = Object.keys(dirtyFields).filter(
    (field) => field !== "password",
  ).length;

  useEffect(() => {
    changeDirtyInputs(dirtyCount);
  }, [dirtyCount, changeDirtyInputs]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const user = await loginUser(data);
      setUser(user);
      router.replace("/profile");
    } catch (error: unknown) {
      const err = error as ApiError;
      toast.error(
        err.response?.data?.response?.validation?.body?.message ||
          err.response?.data?.response?.message ||
          err.message,
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <div
          className={clsx(css.inputBox, {
            [css.inputBoxWithMessage]:
              errors.email || (!errors.email && dirtyFields.email),
          })}
        >
          <input
            className={clsx(
              css.input,
              errors.email && css.inputError,
              !errors.email && dirtyFields.email && css.inputSuccess,
            )}
            placeholder="Email"
            type="email"
            {...register("email")}
          />

          {errors.email && (
            <>
              <span className={clsx(css.inputMessage, css.error)}>
                {errors.email.message}
              </span>

              <svg
                width={18}
                height={18}
                className={clsx(css.inputIcon, css.errorIcon)}
              >
                <use href="/sprite.svg#close"></use>
              </svg>
            </>
          )}

          {!errors.email && dirtyFields.email && (
            <>
              <span className={clsx(css.inputMessage, css.success)}>
                Email is valid
              </span>

              <svg
                width={18}
                height={18}
                className={clsx(css.inputIcon, css.successIcon)}
              >
                <use href="/sprite.svg#check"></use>
              </svg>
            </>
          )}
        </div>

        <div
          className={clsx(css.inputBox, {
            [css.inputBoxWithMessage]:
              errors.password || (!errors.password && dirtyFields.password),
          })}
        >
          <input
            className={clsx(
              css.input,
              css.passwordInput,
              errors.password && css.inputError,
              !errors.password && dirtyFields.password && css.inputSuccess,
            )}
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
          />

          <button
            type="button"
            className={css.eyeBtn}
            onMouseDown={() => setShowPassword(true)}
            onMouseUp={() => setShowPassword(false)}
            onMouseLeave={() => setShowPassword(false)}
          >
            <svg width={18} height={18} className={css.inputIconEye}>
              <use
                href={showPassword ? "/sprite.svg#eye" : "/sprite.svg#eye-off"}
              ></use>
            </svg>
          </button>

          {errors.password && (
            <>
              <span className={clsx(css.inputMessage, css.error)}>
                {errors.password.message}
              </span>

              <svg
                width={18}
                height={18}
                className={clsx(css.inputIcon, css.errorIcon, css.inPassword)}
              >
                <use href="/sprite.svg#close"></use>
              </svg>
            </>
          )}

          {!errors.password && dirtyFields.password && (
            <>
              <span className={clsx(css.inputMessage, css.success)}>
                Password is secure
              </span>

              <svg
                width={18}
                height={18}
                className={clsx(css.inputIcon, css.successIcon, css.inPassword)}
              >
                <use href="/sprite.svg#check"></use>
              </svg>
            </>
          )}
        </div>
      </fieldset>

      <button className={css.submitBtn} type="submit" disabled={!isValid}>
        Log In
      </button>

      <div className={css.bottomTextBox}>
        <p className={css.bottomText}>Don’t have an account?&nbsp;</p>
        <Link className={css.bottomLink} href="/register">
          Register
        </Link>
      </div>
    </form>
  );
}
