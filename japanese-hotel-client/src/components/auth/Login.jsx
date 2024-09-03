import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { loginUser } from "../utils/ApiFunctions"
import { useAuth } from "./AuthProvider"

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()
    const auth = useAuth()
    const location = useLocation()
    const redirectUrl = location.state?.path || "/"

    const handleInputChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await loginUser(login)
            console.log(response)
            if (response.status == 201) {
                console.log("response")
                const token = response.data.token
                auth.handleLogin(token)
                navigate(redirectUrl, { replace: true })
                window.location.reload()
            } else {
                setErrorMessage("Invalid username or password. Please try again.")
            }
        } catch (error) {
            setErrorMessage("Error: " + error.message)
        }

        setTimeout(() => {
            setErrorMessage("")
        }, 4000)
    }

    return (
        <section className="container col-6 mt-5 mb-5">
            {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
            <h2 className="fw-900 ">ログイン</h2>

            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <label htmlFor="email" className="col-sm-2 col-form-label hotel-color">
                        メール
                    </label>
                    <div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="form-control"
                            value={login.email}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="password" className="col-sm-2 col-form-label hotel-color">
                        パスワード
                    </label>
                    <div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="form-control"
                            value={login.password}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <button type="submit" className="btn btn-hotel" style={{ marginRight: "10px" }}>
                        ログイン
                    </button>
                    <span style={{ marginLeft: "10px" }}>
                        まだアカウントをお持ちですか？
                        <Link to={"/register"}> レジスター</Link>
                    </span>
                </div>
            </form>
        </section>
    )
}

export default Login
