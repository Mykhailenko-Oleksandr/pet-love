import SearchField from "../SearchField/SearchField";
import css from "./NoticesFilters.module.css";

interface NoticesFiltersProps {
  changeSearchWord: (search: string) => void;
}

export default function NoticesFilters({
  changeSearchWord,
}: NoticesFiltersProps) {
  return (
    <div className={css.filtersWrap}>
      <div className={css.filtersBox}>
        <div className={css.topFiltersBox}>
          <SearchField search={changeSearchWord} inNoticesFilters />
          <div className={css.categoryGenderBox}>
            <p>2</p>
            <p>3</p>
          </div>
        </div>
        <div className={css.bottomFilersBox}>
          <p>4</p>
          <p>5</p>
        </div>
      </div>
    </div>
  );
}
