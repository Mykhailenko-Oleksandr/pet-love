"use client";

import css from "./RegistrationForm.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { useState } from "react";
import Link from "next/link";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
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
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  })
  .required();

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
  } = useForm<FormData>({ mode: "onChange", resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <div
          className={clsx(css.inputBox, {
            [css.inputBoxWithMessage]:
              errors.name || (!errors.name && dirtyFields.name),
          })}
        >
          <input
            className={clsx(
              css.input,
              errors.name && css.inputError,
              !errors.name && dirtyFields.name && css.inputSuccess,
            )}
            placeholder="Name"
            type="text"
            {...register("name")}
          />

          {errors.name && (
            <>
              <span className={clsx(css.inputMessage, css.error)}>
                {errors.name.message}
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

          {!errors.name && dirtyFields.name && (
            <>
              <span className={clsx(css.inputMessage, css.success)}>
                Valid name
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

        <div
          className={clsx(css.inputBox, {
            [css.inputBoxWithMessage]:
              errors.confirmPassword ||
              (!errors.confirmPassword && dirtyFields.confirmPassword),
          })}
        >
          <input
            className={clsx(
              css.input,
              css.passwordInput,
              errors.confirmPassword && css.inputError,
              !errors.confirmPassword &&
                dirtyFields.confirmPassword &&
                css.inputSuccess,
            )}
            placeholder="Confirm password"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
          />

          <button
            type="button"
            className={css.eyeBtn}
            onMouseDown={() => setShowConfirmPassword(true)}
            onMouseUp={() => setShowConfirmPassword(false)}
            onMouseLeave={() => setShowConfirmPassword(false)}
          >
            <svg width={18} height={18} className={css.inputIconEye}>
              <use
                href={
                  showConfirmPassword
                    ? "/sprite.svg#eye"
                    : "/sprite.svg#eye-off"
                }
              ></use>
            </svg>
          </button>

          {errors.confirmPassword && (
            <>
              <span className={clsx(css.inputMessage, css.error)}>
                {errors.confirmPassword.message}
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

          {!errors.confirmPassword && dirtyFields.confirmPassword && (
            <>
              <span className={clsx(css.inputMessage, css.success)}>
                Confirmed successfully
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
        Registration
      </button>

      <div className={css.bottomTextBox}>
        <p className={css.bottomText}>Already have an account?&nbsp;</p>
        <Link className={css.bottomLink} href="/login">
          Login
        </Link>
      </div>
    </form>
  );
}
