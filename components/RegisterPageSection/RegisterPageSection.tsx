"use client";

import clsx from "clsx";
import PetBlock from "../PetBlock/PetBlock";
import css from "./RegisterPageSection.module.css";
import Title from "../Title/Title";
import { useState } from "react";
import RegistrationForm from "../RegistrationForm/RegistrationForm";

export default function RegisterPageSection() {
  const [countDirtyInputs, setCountDirtyInputs] = useState(0);

  return (
    <section className={css.section}>
      <div className={clsx("container", css.registerContainer)}>
        <PetBlock page="register" />

        <div
          className={clsx(
            css.formBox,
            countDirtyInputs === 1 && css.oneDirtyInput,
            countDirtyInputs === 2 && css.twoDirtyInput,
            countDirtyInputs === 3 && css.threeDirtyInput,
          )}
        >
          <Title
            title="Registration"
            description="Thank you for your interest in our platform."
          />

          <RegistrationForm
            changeDirtyInputs={(count) => setCountDirtyInputs(count)}
          />
        </div>
      </div>
    </section>
  );
}
