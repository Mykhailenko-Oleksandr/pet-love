import { News } from "@/types/news";
import css from "./NewsList.module.css";
import NewsItem from "../NewsItem/NewsItem";

interface NewsListProps {
  news: News[];
}

export default function NewsList({ news }: NewsListProps) {
  return (
    <ul className={css.list}>
      {news.map((oneNews) => {
        return <NewsItem news={oneNews} key={oneNews._id} />;
      })}
    </ul>
  );
}
