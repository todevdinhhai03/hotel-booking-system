import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import Logout from "../auth/Logout"

const NavBar = () => {
    const [showAccount, setShowAccount] = useState(false)

    const handleAccountClick = () => {
        setShowAccount(!showAccount)
    }

    const isLoggedIn = localStorage.getItem("token")
    const userRole = localStorage.getItem("userRole")

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow  sticky-top">
            <div className="container-fluid">
                <Link to={"/"} className="navbar-brand">
                    <span className="hotel-color">ジャパンホテル</span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    aria-controls="navbarScroll"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                        <li className="nav-item">
                            <NavLink to={"/rooms"} className="nav-link" aria-current="page">
                                View all rooms
                            </NavLink>
                        </li>

                        {isLoggedIn && userRole === "ROLE_ADMIN" && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to={"/admin"}>
                                        Admin
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to={"/bookings/search"}>
                                        Search Booking
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>

                    <ul className="d-flex navbar-nav">
                        <li className="nav-item dropdown">
                            <a
                                className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={handleAccountClick}
                            >
                                アカウント
                            </a>

                            <ul
                                className={`dropdown-menu ${showAccount ? "show" : ""}`}
                                aria-labelledby="navbarDropdown">
                                {isLoggedIn ? (
                                    <Logout />
                                ) : (
                                    <li>
                                        <Link className="dropdown-item" to={"/login"}>
                                            ログイン
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar