import css from "./Register.module.css";
import PetBlock from "@/components/PetBlock/PetBlock";

export default function Register() {
  return (
    <section className={css.section}>
      <div className="container">
        <PetBlock page="register" />
      </div>
    </section>
  );
}
