import { useLocation } from 'react-router-dom'
import HotelService from '../common/HotelService'
import Parallax from '../common/Parallax'
import RoomCarousel from '../common/RoomCarousel'
import RoomSearch from '../common/RoomSearch'
import MainHeader from '../layout/MainHeader'
import { useEffect, useState } from 'react'

const Home = () => {
    const [message, setMessage] = useState("");
    // check logout
    const location = useLocation()

    useEffect(() => {
        if (location.state && location.state.message && !localStorage.getItem("token")) {
            setMessage(location.state.message);
        }
    }, [location.state?.message]);
    setTimeout(() => {
        setMessage("");
    }, 2000)

    // check login
    const currentUser = localStorage.getItem("userId")

    return (
        <section>
            {message && <p className="alert alert-danger fade show">{message}</p>}
            {currentUser && (
                <h6 className="alert alert-success fade show"> You are logged-In as {currentUser}</h6>
            )}
            <MainHeader />
            <div className="container container-custom">
                <RoomSearch />
                <RoomCarousel />
                <Parallax title="最高のサービス" subTitle="あらゆるニーズにお応えします" />
                <HotelService />
                <Parallax title="多くのインセンティブ" subTitle="ポイントを獲得してギフトを受け取ります" />
                <RoomCarousel />
            </div>
        </section>
    )
}

export default Home