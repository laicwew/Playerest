import { useState } from "react";

function SearchBarDropDown({
  recentSearches,
  onClickRecentSearch,
}: {
  recentSearches: string[];
  onClickRecentSearch: (searchTerm: string) => void;
}) {
  return (
    <div className="dropdown-menu show" style={{ marginTop: "42px",  borderRadius: "0.25rem", border: "1px solid rgba(0, 0, 0, 0.15)"}}>
      {recentSearches.length > 0 ? (
        recentSearches.map((search) => (
          <button
            key={search}
            className="dropdown-item"
            type="button"
            onClick={() => onClickRecentSearch(search)}
          >
            {search}
          </button>
        ))
      ) : (
        <div className="dropdown-item">No recent searches</div>
      )}
    </div>
  );
}

export function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
        setIsFocused(false);
      }, 100);
  };

  const onClickRecentSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setIsFocused(false);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      setRecentSearches((prevSearches) => {
        if (!prevSearches.includes(searchTerm.trim())) {
          return [searchTerm.trim(), ...prevSearches];
        }
        return prevSearches;
      });
      setSearchTerm("");
      setIsFocused(false);
    }
  };

  return (
    <div className="d-flex flex-grow-1">
      <form
        className="d-flex flex-grow-1 mx-lg-2"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2 flex-grow-1"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button className="btn btn-outline-success me-2" type="submit">
          Search
        </button>
      </form>

      {isFocused && <SearchBarDropDown recentSearches={recentSearches} onClickRecentSearch={onClickRecentSearch}/>}
    </div>
  );
}
