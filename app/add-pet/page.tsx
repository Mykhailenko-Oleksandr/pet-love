import clsx from "clsx";
import css from "./AddPet.module.css";

import PetBlock from "@/components/PetBlock/PetBlock";
import AddPetForm from "@/components/AddPetForm/AddPetForm";
import { getSpecies } from "@/lib/api/serverApi";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add a Pet",
  description:
    "Create a new pet profile on PetLove. Upload photos, add details, and share your furry friend with the community.",
  openGraph: {
    title: "Add a Pet – PetLove",
    description:
      "Easily add your pet to PetLove. Share their name, birthday, species, and photo with other pet lovers.",
    url: "https://pet-love-rust.vercel.app/add-pet",
    images: [{ url: "/images/og.webp" }],
  },
};

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
