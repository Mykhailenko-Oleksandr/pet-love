import { Notice, NoticeFull } from "@/types/notice";

export const reversBirthdayDate = (notice: Notice | NoticeFull) => {
  if (notice.birthday) {
    const year = notice.birthday.slice(0, 4);
    const month = notice.birthday.slice(5, 7);
    const day = notice.birthday.slice(8, 10);

    return `${day}.${month}.${year}`;
  }

  return "Not specified";
};
