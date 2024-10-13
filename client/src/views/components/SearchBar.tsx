import { useState } from "react";
import { useIsSmallScreen } from "../../helpers/hooks/useIsSmallScreen";
import { useNavigate } from "react-router-dom";

function SearchBarDropDown({
  recentSearches,
  onClickRecentSearch,
}: {
  recentSearches: string[];
  onClickRecentSearch: (searchTerm: string) => void;
}) {
  return (
    <div
      className="dropdown-menu show"
      style={{
        marginTop: "42px",
        borderRadius: "0.25rem",
        border: "1px solid rgba(0, 0, 0, 0.15)",
      }}
    >
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

export function SearchBar({
  onToggleNavItems,
}: {
  onToggleNavItems: (show: boolean) => void;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const isSmallScreen = useIsSmallScreen();
  const [showSearchBar, setShowSearchBar] = useState(false);
  // React Router's navigate hook
  const navigate = useNavigate();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
      if (!searchTerm) {
        setShowSearchBar(false);
        onToggleNavItems(true); // Show other nav items
      }
    }, 280);
  };

  const onClickRecentSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setIsFocused(false);
  };
  const search = async () => {
    // Navigate to the search page with the search term as a query parameter
    navigate(`/search-results?query=${encodeURIComponent(searchTerm)}`);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    search();
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

  // If it's mobile and the search bar should be hidden, show just the search icon
  if (isSmallScreen && !showSearchBar) {
    return (
      <button
        className="btn-search fas fa-search nav-icon"
        style={{ border: "none" }}
        onClick={() => {
          setShowSearchBar(true);
          setIsFocused(true);
          onToggleNavItems(false); // Hide other nav items when opening the search bar
        }}
      />
    );
  }

  return (
    <div className="d-flex flex-grow-1">
      <form
        className="d-flex flex-grow-1 mx-lg-2"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2 flex-grow-1 search-bar"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          autoFocus
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button
          className="btn-search me-2 fas fa-search nav-icon"
          type="submit"
          onClick={() => handleSubmit}
          style={{
            alignItems: "center",
            margin: "0",
          }}
        />
      </form>

      {isFocused && (
        <SearchBarDropDown
          recentSearches={recentSearches}
          onClickRecentSearch={onClickRecentSearch}
        />
      )}
    </div>
  );
}
