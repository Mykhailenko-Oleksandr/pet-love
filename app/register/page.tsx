import Title from "@/components/Title/Title";
import css from "./Register.module.css";
import PetBlock from "@/components/PetBlock/PetBlock";
import clsx from "clsx";
import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";

export default function Register() {
  return (
    <section className={css.section}>
      <div className={clsx("container", css.registerContainer)}>
        <PetBlock page="register" />

        <div className={css.formBox}>
          <Title
            title="Registration"
            description="Thank you for your interest in our platform."
          />

          <RegistrationForm />
        </div>
      </div>
    </section>
  );
}
