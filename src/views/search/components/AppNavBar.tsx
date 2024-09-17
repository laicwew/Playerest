import { SearchBar } from "./SearchBar";

export function AppNavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/" style={{color: "green"}}>
          Playerest
        </a>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/">
              Explore
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="# "
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Categories
            </a>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="# ">
                  Type1
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="# ">
                  Another Type
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="# ">
                  Something else here
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <SearchBar />
        <div className="nav-item me-2">
          <a className="nav-link active" aria-current="page" href="/">
            Create
          </a>
        </div>
        <div className="nav-item me-2">
          <a className="nav-link active" aria-current="page" href="/">
            Profile
          </a>
        </div>
      </div>
    </nav>
  );
}
