import CustomSelect from "../CustomSelect/CustomSelect";
import SearchField from "../SearchField/SearchField";
import css from "./NoticesFilters.module.css";

interface NoticesFiltersProps {
  changeSearchWord: (search: string) => void;
  categories: string[];
  changeCategory: (search: string) => void;
  genders: string[];
  changeGender: (search: string) => void;
  species: string[];
  changeType: (search: string) => void;
}

export default function NoticesFilters({
  changeSearchWord,
  categories,
  changeCategory,
  genders,
  changeGender,
  species,
  changeType,
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
          <p>5</p>
        </div>
      </div>
    </div>
  );
}
