import { Notice, NoticeFull } from "@/types/notice";
import { Pet } from "@/types/pet";

interface Props {
  notice?: Notice | NoticeFull;
  pet?: Pet;
}

export const reversBirthdayDate = ({ notice, pet }: Props) => {
  if (notice && notice.birthday) {
    const year = notice.birthday.slice(0, 4);
    const month = notice.birthday.slice(5, 7);
    const day = notice.birthday.slice(8, 10);

    return `${day}.${month}.${year}`;
  }

  if (pet && pet.birthday) {
    const year = pet.birthday.slice(0, 4);
    const month = pet.birthday.slice(5, 7);
    const day = pet.birthday.slice(8, 10);

    return `${day}.${month}.${year}`;
  }

  return "Not specified";
};
