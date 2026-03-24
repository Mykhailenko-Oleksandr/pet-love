"use client";

import { Pet } from "@/types/pet";
import css from "./PetsBlock.module.css";
import Link from "next/link";
import clsx from "clsx";
import PetsList from "../PetsList/PetsList";

interface Props {
  pets?: Pet[];
}

export default function PetsBlock({ pets }: Props) {
  return (
    <>
      <div className={clsx(css.topBox, pets && pets.length == 0 && css.noPets)}>
        <h3 className={css.title}>My pets</h3>
        <Link href="/add-pet" className={css.addPetLink}>
          Add pet
          <svg width={18} height={18}>
            <use href="/sprite.svg#plus"></use>
          </svg>
        </Link>
      </div>

      {pets && pets.length > 0 && <PetsList pets={pets} />}
    </>
  );
}
