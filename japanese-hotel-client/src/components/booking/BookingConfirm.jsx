import { useLocation } from "react-router-dom";
import Header from "../common/Header";

const BookingConfirm = () => {
    const location = useLocation();
    const confirmationCode = location.state?.confirmationCode
    const error = location.state?.error

    return (
        <div className="container">
            <div className="mt-5">
                {confirmationCode ? (
                    <div>
                        <Header title="Booking Success" />
                        <h3 className="text-success"> Booking Success!</h3>
                        <p className="text-success">Confirmation code: {confirmationCode}</p>
                    </div>
                ) : (
                    <div>
                        <Header title="Booking Error" />
                        <h3 className="text-danger"> Error Booking Room!</h3>
                        <p className="text-danger">{error}</p>

                    </div>
                )}
            </div>
        </div>
    )
}

export default BookingConfirm