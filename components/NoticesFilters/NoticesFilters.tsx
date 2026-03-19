import { Location } from "@/types/location";
import CustomSelect from "../CustomSelect/CustomSelect";
import SearchField from "../SearchField/SearchField";
import css from "./NoticesFilters.module.css";
import LocationsSelect from "../LocationsSelect/LocationsSelect";
import RadioButton from "../RadioButton/RadioButton";

interface NoticesFiltersProps {
  changeSearchWord: (search: string) => void;
  categories: string[];
  changeCategory: (search: string) => void;
  genders: string[];
  changeGender: (search: string) => void;
  species: string[];
  changeType: (search: string) => void;
  locations: Location[];
  changeIdLocation: (id: string) => void;
  bySort: string;
  changeBySort: (value: string) => void;
}

export default function NoticesFilters({
  changeSearchWord,
  categories,
  changeCategory,
  genders,
  changeGender,
  species,
  changeType,
  locations,
  changeIdLocation,
  bySort,
  changeBySort,
}: NoticesFiltersProps) {
  return (
    <div className={css.filtersWrap}>
      <div className={css.filtersBox}>
        <div className={css.topFiltersBox}>
          <SearchField search={changeSearchWord} inNoticesFilters />
          <div className={css.categoryGenderBox}>
            <CustomSelect
              values={categories}
              onChange={changeCategory}
              placeholder="Category"
            />
            <CustomSelect
              values={genders}
              onChange={changeGender}
              placeholder="By gender"
            />
          </div>
        </div>
        <div className={css.bottomFilersBox}>
          <CustomSelect
            values={species}
            onChange={changeType}
            placeholder="By type"
          />
          <LocationsSelect
            locations={locations}
            changeIdLocation={changeIdLocation}
          />
        </div>
      </div>
      <div className={css.btnsFilterBox}>
        <RadioButton
          name="bySort"
          value="popular"
          label="Popular"
          currentSort={bySort}
          onChange={changeBySort}
        />
        <RadioButton
          name="bySort"
          value="unpopular"
          label="Unpopular"
          currentSort={bySort}
          onChange={changeBySort}
        />
        <RadioButton
          name="bySort"
          value="cheap"
          label="Cheap"
          currentSort={bySort}
          onChange={changeBySort}
        />
        <RadioButton
          name="bySort"
          value="expensive"
          label="Expensive"
          currentSort={bySort}
          onChange={changeBySort}
        />
      </div>
    </div>
  );
}
