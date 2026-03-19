import { MouseEvent } from "react";
import css from "./RadioButton.module.css";
import clsx from "clsx";

interface RadioButtonProps {
  name: string;
  value: string;
  label: string;
  currentSort: string;
  onChange: (value: string) => void;
}

export default function RadioButton({
  name,
  value,
  label,
  currentSort,
  onChange,
}: RadioButtonProps) {
  function handleRadioClick(e: MouseEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;

    if (currentSort !== value) {
      onChange(value);
    }
  }
  return (
    <label className={css.label}>
      <input
        type="radio"
        name={name}
        value={value}
        onClick={handleRadioClick}
        checked={currentSort === value}
        onChange={() => {}}
        className={clsx(css.radio)}
      />
      {label}
      <button type="button" onClick={() => onChange("")} className={css.btn}>
        <svg width={18} height={18}>
          <use href="/sprite.svg#close"></use>
        </svg>
      </button>
    </label>
  );
}
