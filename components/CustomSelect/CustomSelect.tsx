"use client";

import clsx from "clsx";
import css from "./CustomSelect.module.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import type { Props as SelectProps, SingleValue } from "react-select";

const Select = dynamic(() => import("./ClientSelect"), { ssr: false }) as <
  Option,
  IsMulti extends boolean = false,
>(
  props: SelectProps<Option, IsMulti>,
) => React.ReactElement;

interface IOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  onChange: (value: string) => void;
  values: string[];
  placeholder: string;
  inAddPet?: boolean;
}

export default function CustomSelect({
  onChange,
  values,
  placeholder,
  inAddPet,
}: CustomSelectProps) {
  const options: IOption[] = inAddPet
    ? [
        ...values.map((val) => {
          return { value: val.toString(), label: val };
        }),
      ]
    : [
        { value: "", label: "Show all" },
        ...values.map((val) => {
          return { value: val.toString(), label: val };
        }),
      ];

  const [currentValue, setCurrentValue] = useState<IOption | null>(null);

  function changeValue(newValue: SingleValue<IOption>) {
    setCurrentValue(newValue);

    if (newValue) onChange(newValue.value);
  }

  return (
    <label className={css.label}>
      <Select<IOption>
        className={css.customSelectBox}
        classNamePrefix={inAddPet ? "customSelectAddPet" : "customSelect"}
        onChange={changeValue}
        value={currentValue}
        options={options}
        isSearchable={false}
        placeholder={`${placeholder}`}
      />
    </label>
  );
}
