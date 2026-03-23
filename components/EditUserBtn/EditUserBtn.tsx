import css from "./EditUserBtn.module.css";

interface Props {
  onClick: () => void;
}

export default function EditUserBtn({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Edit profile"
      className={css.btn}
    >
      <svg width={18} height={18}>
        <use href="/sprite.svg#edit"></use>
      </svg>
    </button>
  );
}
