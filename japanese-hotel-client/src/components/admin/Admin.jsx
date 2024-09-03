import { Link } from "react-router-dom"

const Admin = () => {
    return (
        <section className="container mt-5">
            <h2>Adimin Panel</h2>
            <hr />
            <Link to={"/rooms/manager"}>ルームマネージャー</Link> <br />
            <Link to={"/bookings/manager"}>ブッキングマネージャー</Link>
        </section>
    )
}

export default Admin
