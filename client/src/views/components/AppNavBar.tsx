import { useState } from "react";
import { useIsMobile } from "../../helpers/hooks/useIsMobile";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { LoginModal } from "./LoginModal";

export function AppNavBar({
  isDarkTheme,
  changeTheme,
}: {
  isDarkTheme: boolean;
  changeTheme: () => void;
}) {
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
        {!isMobile ? (
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

            <div className="nav-item me-2 mx-2">
              <a
                className="nav-link active p-0"
                aria-current="page"
                href="/create"
                style={{ fontFamily: "-moz-initial" }}
              >
                <span className="nav-text"> Create</span>
              </a>
            </div>
          </>
        ) : (
          <div className="nav-item me-2 mx-2">
            <a
              className="nav-link active p-0"
              aria-current="page"
              href="/create"
              style={{ fontFamily: "-moz-initial" }}
            >
              <span className="fa-solid fa-pen-nib nav-icon p-0" />
            </a>
          </div>
        )}

        <SearchBar onToggleNavItems={(show) => setShowNavItems(show)} />
        <div className="nav navbar-nav navbar-right d-flex flex-row align-content-center">
          <i
            onClick={changeTheme}
            className={`fa fa-toggle-${isDarkTheme ? "on" : "off"} me-2 align-content-center`}
            style={{ fontSize: "2.5rem"}}
          ></i>
          <span className="align-content-center me-4 fw-bold">Theme</span>

          {/* TODO: add login status judge logic */}
          {showNavItems && isLoggedIn ? (
            <button
              className="nav-item btn-nav me-2"
              onClick={() => navigateToPage("/login")}
            >
              <span className="fas fa-user nav-icon" />
              <span className="nav-text">Profile</span>
            </button>
          ) : (
            <button className="nav-item btn-nav me-2" onClick={handleShow}>
              <span className="fas fa-sign-in-alt nav-icon" />
              <span className="nav-text">Login</span>
            </button>
          )}
        </div>
        <LoginModal
          show={showModal}
          handleClose={handleClose}
          handleLogin={handleLoginSuccess}
        />
      </div>
    </nav>
  );
}
