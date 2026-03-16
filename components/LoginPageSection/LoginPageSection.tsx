"use client";

import clsx from "clsx";
import PetBlock from "../PetBlock/PetBlock";
import css from "./LoginPageSection.module.css";
import LoginForm from "../LoginForm/LoginForm";
import Title from "../Title/Title";
import { useState } from "react";

export default function LoginPageSection() {
  const [countDirtyInputs, setCountDirtyInputs] = useState(0);

  return (
    <section className={css.section}>
      <div className={clsx("container", css.loginContainer)}>
        <PetBlock page="login" />

        <div
          className={clsx(
            css.formBox,
            countDirtyInputs === 1 && css.oneDirtyInput,
          )}
        >
          <div>
            <Title
              title="Log in"
              description="Welcome! Please enter your credentials to login to the platform:"
            />
          </div>

          <LoginForm
            changeDirtyInputs={(count) => setCountDirtyInputs(count)}
          />
        </div>
      </div>
    </section>
  );
}
