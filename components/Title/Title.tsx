import css from "./Title.module.css";

interface TitleProps {
  title: string;
  description: string;
}

export default function Title({ title, description }: TitleProps) {
  return (
    <div>
      <h2 className={css.title}>{title}</h2>
      <p className={css.description}>{description}</p>
    </div>
  );
}
