import "./SearchBar.css";

interface Props {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const SearchBar = ({ searchValue, setSearchValue }: Props) => (
  <input
    data-test="searchMeetup"
    value={searchValue}
    onChange={(event) => setSearchValue(event.target.value)}
    className="searchBar"
    placeholder="Search..."
  />
);

export default SearchBar;
