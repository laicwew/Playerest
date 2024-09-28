import { useState } from "react";
import { useIsMobile } from "../../../helpers/hooks/useIsMobile";
import { SearchBar } from "./SearchBar";

export function AppNavBar() {
  const types = ["Type1", "Type2", "Something else here"];
  const isMobile = useIsMobile();
  const [showNavItems, setShowNavItems] = useState(true);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="/"
          style={{
            color: "rgb(178, 29, 79)",
            fontFamily: "fantasy",
            fontWeight: "bold",
          }}
        >
          Playerest
        </a>
        {/* Explore Menu */}
        {!isMobile && (
          <>
            <div className="nav-item me-2">
              <a
                className="nav-link active"
                aria-current="page"
                href="/"
                style={{ fontFamily: "-moz-initial" }}
              >
                Explore
              </a>
            </div>
            <div className="nav-item dropdown me-2">
              <a
                className="nav-link dropdown-toggle"
                href="# "
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ fontFamily: "-moz-initial" }}
              >
                Categories
              </a>
              <ul className="dropdown-menu">
                {types.map((value) => {
                  return (
                    <li>
                      <a
                        className="dropdown-item"
                        href="# "
                        style={{ fontFamily: "-moz-initial" }}
                      >
                        {value}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}

        <SearchBar onToggleNavItems={(show) => setShowNavItems(show)} />

        {/* TODO: add login status judge logic */}
        {showNavItems && (
          <div className="nav navbar-nav navbar-right">
            <button className="btn-nav me-2">
              <span className="fa-solid fa-pen-nib nav-icon" />
              <span className="nav-text"> Create</span>
            </button>
            <button className="btn-nav me-2">
              <span className="fas fa-user nav-icon" />
              <span className="nav-text"> Login</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
