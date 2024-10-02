import { useState } from "react";
import { useIsMobile } from "../../helpers/hooks/useIsMobile";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { LoginModal } from "./LoginModal";

export function AppNavBar() {
  const types = ["Type1", "Type2", "Something else here"];
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [showNavItems, setShowNavItems] = useState(true);

  const navigateToPage = (path: string) => {
    if (window.location.pathname !== path) navigate(path);
  };

  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

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
                    <li key={value}>
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
        {showNavItems && isLoggedIn ? (
          <div className="nav navbar-nav navbar-right">
            <button
              className="btn-nav me-2"
              onClick={() => navigateToPage("/create")}
            >
              <span className="fa-solid fa-pen-nib nav-icon" />
              <span className="nav-text"> Create</span>
            </button>
            <button
              className="btn-nav me-2"
              onClick={() => navigateToPage("/login")}
            >
              <span className="fas fa-user nav-icon" />
              <span className="nav-text">Profile</span>
            </button>
          </div>
        ) : (
          <button className="btn-nav me-2" onClick={handleShow}>
            <span className="fas fa-sign-in-alt nav-icon" />
            <span className="nav-text">Login</span>
          </button>
        )}
        <LoginModal
          show={showModal}
          handleClose={handleClose}
          handleLogin={handleLoginSuccess}
        />
      </div>
    </nav>
  );
}
