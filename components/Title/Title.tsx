import clsx from "clsx";
import css from "./Title.module.css";

interface TitleProps {
  title: string;
  description?: string;
}

export default function Title({ title, description }: TitleProps) {
  return (
    <>
      <h2 className={clsx(css.title, !description && css.noDescription)}>
        {title}
      </h2>
      {description && <p className={css.description}>{description}</p>}
    </>
  );
}
