import { Pet } from "@/types/pet";
import css from "./PetsItem.module.css";
import Image from "next/image";
import { reversBirthdayDate } from "@/utils/reverseBirthdayDate";

interface Props {
  pet: Pet;
}

export default function PetsItem({ pet }: Props) {
  console.log(pet);

  return (
    <li className={css.item}>
      <div className={css.imgBox}>
        <Image
          src={pet.imgURL}
          alt={pet.name}
          fill
          sizes="(max-width: 767px) 75px, (max-width: 1279px) 90px, 66px"
          loading="eager"
          className={css.img}
        />
      </div>

      <div className={css.infoPetBox}>
        <h4 className={css.title}>{pet.title}</h4>

        <ul className={css.listInfoPet}>
          <li className={css.itemInfo}>
            <p className={css.titleItemInfo}>Name</p>
            <p className={css.valueInfoPet}> {pet.name}</p>
          </li>
          <li className={css.itemInfo}>
            <p className={css.titleItemInfo}>Birthday</p>
            <p className={css.valueInfoPet}>{reversBirthdayDate({ pet })}</p>
          </li>
          <li className={css.itemInfo}>
            <p className={css.titleItemInfo}>Sex</p>
            <p className={css.valueInfoPet}>{pet.sex}</p>
          </li>
          <li className={css.itemInfo}>
            <p className={css.titleItemInfo}>Species</p>
            <p className={css.valueInfoPet}>{pet.species}</p>
          </li>
        </ul>
      </div>
    </li>
  );
}
