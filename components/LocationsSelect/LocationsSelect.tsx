"use client";

import css from "./LocationsSelect.module.css";
import { Location } from "@/types/location";
import dynamic from "next/dynamic";
import { KeyboardEvent, useState } from "react";
import type {
  OptionProps,
  Props as SelectProps,
  SingleValue,
} from "react-select";
import { components } from "react-select";

const Select = dynamic(() => import("./ClientSelect"), { ssr: false }) as <
  Option,
  IsMulti extends boolean = false,
>(
  props: SelectProps<Option, IsMulti>,
) => React.ReactElement;

const CustomOption = (props: OptionProps<IOption, false>) => {
  const { selectProps, data } = props;

  const input = selectProps.inputValue || "";
  const label = data.label;

  const index = label.toLowerCase().indexOf(input.toLowerCase());

  if (index === -1 || !input) {
    return <components.Option {...props}>{label}</components.Option>;
  }

  const before = label.slice(0, index);
  const match = label.slice(index, index + input.length);
  const after = label.slice(index + input.length);

  return (
    <components.Option {...props}>
      <span className={css.optionSearchText}>{before}</span>
      <span className={css.optionSearchTextCurrent}>{match}</span>
      <span className={css.optionSearchText}>{after}</span>
    </components.Option>
  );
};

interface IOption {
  value: string;
  label: string;
}

interface LocationsSelectProps {
  locations: Location[];
  changeIdLocation: (id: string) => void;
}

export default function LocationsSelect({
  locations,
  changeIdLocation,
}: LocationsSelectProps) {
  const [selected, setSelected] = useState<IOption | null>(null);

  function changeSelect(e: SingleValue<IOption>) {
    if (e) {
      setSelected(e);
    }
  }

  function handleSubmit() {
    if (selected) {
      changeIdLocation(selected.value);
    } else {
      changeIdLocation("");
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" && selected) {
      changeIdLocation(selected.value);
    } else {
      changeIdLocation("");
    }
  }

  const sortLocations = locations.toSorted((a, b) =>
    a.stateEn.localeCompare(b.stateEn),
  );

  const options: IOption[] = [
    ...sortLocations.map((location) => {
      return {
        value: location._id,
        label: `${location.stateEn}, ${location.cityEn}`,
      };
    }),
  ];
  return (
    <div className={css.wrap}>
      <Select<IOption>
        className={css.locationsSelectBox}
        classNamePrefix="locationsSelect"
        options={options}
        placeholder="Location"
        onChange={changeSelect}
        onKeyDown={handleKeyDown}
        value={selected}
        isSearchable
        components={{ Option: CustomOption }}
      />

      <div className={css.btnsBox}>
        {selected && (
          <button
            type="button"
            onClick={() => {
              setSelected(null);
            }}
            className={css.btn}
          >
            <svg width={18} height={18}>
              <use href="/sprite.svg#close"></use>
            </svg>
          </button>
        )}
        <button type="button" onClick={handleSubmit} className={css.btn}>
          <svg width={18} height={18}>
            <use href="/sprite.svg#search"></use>
          </svg>
        </button>
      </div>
    </div>
  );
}
