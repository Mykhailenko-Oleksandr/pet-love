import { News } from "@/types/news";
import css from "./NewsItem.module.css";
import Image from "next/image";

interface NewsItemProps {
  news: News;
}

export default function NewsItem({ news }: NewsItemProps) {
  function reversDate(date: string) {
    const newDate = new Date(date);
    const day = String(newDate.getDate()).padStart(2, "0");
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const year = newDate.getFullYear();

    return `${day}/${month}/${year}`;
  }
  return (
    <li className={css.item}>
      <div className={css.imgBox}>
        <Image
          src={news.imgUrl}
          alt={news.title}
          width={361}
          height={226}
          sizes="(max-width: 767px) 335px, (max-width: 1279px) 340px, 361px"
          className={css.img}
        />
      </div>
      <h3 className={css.title}>{news.title}</h3>
      <p className={css.text}>{news.text}</p>

      <div className={css.bottomBox}>
        <p className={css.date}>{reversDate(news.date)}</p>
        <button type="button" className={css.readMoreBtn}>
          Read more
        </button>
      </div>
    </li>
  );
}
