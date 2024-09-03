import { Link, useNavigate } from "react-router-dom"
import { AuthContext, useAuth } from "./AuthProvider"

const Logout = () => {
    const auth = useAuth();
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.handleLogout()
        navigate("/", { state: { message: " You have been logged out!" } })
        window.location.reload(true)
    }

    return (
        <>
            <li>
                <Link className="dropdown-item" to={"/profile"}>
                    Profile
                </Link>
            </li>
            <li>
                <hr className="dropdown-divider" />
            </li>
            <button className="dropdown-item" onClick={handleLogout}>
                Logout
            </button>
        </>
    )
}

export default Logout
