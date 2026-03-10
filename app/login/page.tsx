import Title from "@/components/Title/Title";
import css from "./Login.module.css";
import PetBlock from "@/components/PetBlock/PetBlock";
import clsx from "clsx";
import LoginForm from "@/components/LoginForm/LoginForm";

export default function Login() {
  return (
    <section className={css.section}>
      <div className={clsx("container", css.loginContainer)}>
        <PetBlock page="login" />

        <div className={css.formBox}>
          <Title
            title="Log in"
            description="Welcome! Please enter your credentials to login to the platform:"
          />

          <LoginForm />
        </div>
      </div>
    </section>
  );
}
