import { Pet } from "@/types/pet";
import css from "./PetsList.module.css";
import PetsItem from "../PetsItem/PetsItem";

interface Props {
  pets: Pet[];
}

export default function PetsList({ pets }: Props) {
  return (
    <ul className={css.list}>
      {pets.map((pet) => {
        return <PetsItem pet={pet} key={pet._id} />;
      })}
    </ul>
  );
}
