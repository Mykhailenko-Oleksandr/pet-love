import clsx from "clsx";
import css from "./AddPet.module.css";

import PetBlock from "@/components/PetBlock/PetBlock";
import AddPetForm from "@/components/AddPetForm/AddPetForm";
import { getSpecies } from "@/lib/api/serverApi";

export default async function AddPet() {
  const species = await getSpecies();

  return (
    <section className={css.section}>
      <div className={clsx("container", css.addPetContainer)}>
        <PetBlock page="addPet" />
        <AddPetForm species={species} />
      </div>
    </section>
  );
}
