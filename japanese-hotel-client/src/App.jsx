import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import AddRoom from './components/room/AddRoom'
import RoomManager from "./components/room/RoomManager"
import EditRoom from "./components/room/EditRoom"
import Home from "./components/home/Home"
import NavBar from "./components/layout/NavBar"
import Footer from "./components/layout/Footer"
import Admin from "./components/admin/Admin"
import FindBooking from "./components/booking/FindBooking"
import CheckIn from "./components/booking/CheckIn"
import RoomList from "./components/room/RoomList"
import BookingManager from "./components/booking/BookingManager"
import Login from "./components/auth/Login"
import BookingConfirm from "./components/booking/BookingConfirm"
import RequireAuth from "./components/auth/RequireAuth"
import { AuthProvider } from "./components/auth/AuthProvider"
import Registration from "./components/auth/Registration"
import Profile from "./components/auth/Profile"


function App() {
  return (
    <main>
      <AuthProvider>
        <Router>
          <NavBar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms/add" element={<AddRoom />} />
            <Route path="/rooms/edit/:roomId" element={<EditRoom />} />
            <Route path="/rooms/manager" element={<RoomManager />} />
            <Route path="/rooms" element={<RoomList />} />

            <Route path="/bookings/search" element={<FindBooking />} />
            <Route
              path="/bookings/:roomId"
              element={
                <RequireAuth>
                  <CheckIn />
                </RequireAuth>
              } />
            <Route path="/bookings/manager" element={<BookingManager />} />
            <Route path="/bookings/confirm" element={<BookingConfirm />} />

            <Route path="/register" element={<Registration />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>

          <Footer />
        </Router>
      </AuthProvider>
    </main>
  )
}

export default App
