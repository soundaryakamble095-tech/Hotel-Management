// File Name: frontend/hotelDemo/src/App.jsx

import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:5000";

function App() {

  // ===============================
  // Form State
  // ===============================
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("Single");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  // Editing booking id
  const [editingId, setEditingId] = useState(null);

  // Booking List
  const [bookings, setBookings] = useState([]);

  // Search
  const [search, setSearch] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 5;
  const [totalPages, setTotalPages] = useState(1);

  // Loading
  const [loading, setLoading] = useState(false);

  // Error
  const [error, setError] = useState("");

  // Last Updated
  const [updatedTime, setUpdatedTime] = useState("");

  // Dark Mode
  const [darkMode, setDarkMode] = useState(false);

  // ==================================
  // Fetch Bookings
  // ==================================
  const fetchBookings = async () => {

    setLoading(true);

    try {

      const response = await fetch(
        `${API}/rooms?page=${page}&limit=${limit}&search=${search}`
      );

      const data = await response.json();

      setBookings(data.data);
      setTotalPages(data.totalPages);

      setUpdatedTime(new Date().toLocaleString());

    } catch (err) {

      console.log(err);

    }

    setLoading(false);

  };

  // Load Data
  useEffect(() => {

    fetchBookings();

  }, [page, search]);

  // ==================================
  // Reset Form
  // ==================================
  const clearForm = () => {

    setGuestName("");
    setEmail("");
    setPhone("");
    setRoomNumber("");
    setRoomType("Single");
    setCheckIn("");
    setCheckOut("");

    setEditingId(null);
    setError("");

  };

  // ==================================
  // Save Booking
  // ==================================
  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    // Client Validation
    if (
      guestName.trim() === "" ||
      email.trim() === "" ||
      roomNumber.trim() === "" ||
      roomType.trim() === "" ||
      checkIn.trim() === "" ||
      checkOut.trim() === ""
    ) {

      setError("Please fill all required fields.");
      return;

    }

    const booking = {

      guest_name: guestName,
      email,
      phone,
      room_number: roomNumber,
      room_type: roomType,
      check_in: checkIn,
      check_out: checkOut

    };

    try {

      let response;

      if (editingId) {

        response = await fetch(`${API}/rooms/${editingId}`, {

          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(booking)

        });

      } else {

        response = await fetch(`${API}/rooms`, {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(booking)

        });

      }

      const result = await response.json();

      if (!response.ok) {

        setError(result.message);
        return;

      }

      clearForm();
      fetchBookings();

    }

    catch (err) {

      console.log(err);
      setError("Server Error");

    }

  };

  // ==================================
  // Edit Booking
  // ==================================
  const editBooking = (booking) => {

    setEditingId(booking.id);

    setGuestName(booking.guest_name);
    setEmail(booking.email);
    setPhone(booking.phone);
    setRoomNumber(booking.room_number);
    setRoomType(booking.room_type);
    setCheckIn(booking.check_in);
    setCheckOut(booking.check_out);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };

  // ==================================
  // Delete Booking
  // ==================================
  const deleteBooking = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this booking?"
    );

    if (!confirmDelete) return;

    await fetch(`${API}/rooms/${id}`, {

      method: "DELETE"

    });

    fetchBookings();

  };

  return (

    <div className={darkMode ? "app dark" : "app"}>

      <div className="container">

        <div className="topBar">

          <h1>🏨 Hotel Management</h1>

          <button
            className="darkBtn"
            onClick={() => setDarkMode(!darkMode)}
          >

            {darkMode ? "☀ Light" : "🌙 Dark"}

          </button>

        </div>

        {/* Booking Form */}

        <form
          className="bookingForm"
          onSubmit={handleSubmit}
        >

          <h2>

            {editingId
              ? "Edit Booking"
              : "Book Room"}

          </h2>

          {error && (

            <p className="error">

              {error}

            </p>

          )}

          <label>

            Guest Name

          </label>

          <input
            type="text"
            maxLength={40}
            value={guestName}
            onChange={(e) =>
              setGuestName(e.target.value)
            }
            placeholder="Guest Name"
          />

          <div className="counter">

            {guestName.length}/40 Characters

          </div>

          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Email"
          />

          <label>Phone</label>

          <input
            type="text"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            placeholder="Phone"
          />

          <label>Room Number</label>

          <input
            type="text"
            value={roomNumber}
            onChange={(e) =>
              setRoomNumber(e.target.value)
            }
            placeholder="Room Number"
          />

          <label>Room Type</label>

          <select
            value={roomType}
            onChange={(e) =>
              setRoomType(e.target.value)
            }
          >

            <option>Single</option>
            <option>Double</option>
            <option>Deluxe</option>
            <option>Suite</option>

          </select>

          <label>Check In</label>

          <input
            type="date"
            value={checkIn}
            onChange={(e) =>
              setCheckIn(e.target.value)
            }
          />

          <label>Check Out</label>

          <input
            type="date"
            value={checkOut}
            onChange={(e) =>
              setCheckOut(e.target.value)
            }
          />

          <button type="submit">

            {editingId
              ? "Update Booking"
              : "Book Room"}

          </button>

          {editingId && (

            <button
              type="button"
              className="cancelBtn"
              onClick={clearForm}
            >

              Cancel Edit

            </button>

          )}

        </form>
// File Name: frontend/hotelDemo/src/App.jsx
// ===============================
// Continue from Part 2
// ===============================

        {/* Booking List */}
        <div className="bookingList">

          <div className="listHeader">

            <h2>Hotel Booking List</h2>

            <input
              type="text"
              placeholder="Search Guest / Room / Type..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="searchBox"
            />

          </div>

          <p className="updated">
            Last Updated : {updatedTime || "--"}
          </p>

          {loading ? (

            <h3 className="loading">
              Loading bookings...
            </h3>

          ) : bookings.length === 0 ? (

            <h3>No bookings found.</h3>

          ) : (

            bookings.map((booking) => (

              <div
                key={booking.id}
                className="card"
              >

                <div className="avatar">

                  {booking.guest_name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()}

                </div>

                <div className="details">

                  <h3>{booking.guest_name}</h3>

                  <p>
                    <strong>Email:</strong>{" "}
                    {booking.email}
                  </p>

                  <p>
                    <strong>Phone:</strong>{" "}
                    {booking.phone || "-"}
                  </p>

                  <p>
                    <strong>Room Number:</strong>{" "}
                    {booking.room_number}
                  </p>

                  <p>
                    <strong>Room Type:</strong>{" "}
                    {booking.room_type}
                  </p>

                  <p>
                    <strong>Check-In:</strong>{" "}
                    {booking.check_in}
                  </p>

                  <p>
                    <strong>Check-Out:</strong>{" "}
                    {booking.check_out}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {booking.status}
                  </p>

                  <p>
                    <strong>Created:</strong>{" "}
                    {booking.created_at}
                  </p>

                </div>

                <div className="actions">

                  <button
                    className="editBtn"
                    onClick={() =>
                      editBooking(booking)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="deleteBtn"
                    onClick={() =>
                      deleteBooking(booking.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          )}

          {/* Pagination */}

          <div className="pagination">

            <button
              disabled={page === 1}
              onClick={() =>
                setPage(page - 1)
              }
            >
              Previous
            </button>

            <span>

              Page {page} of {totalPages}

            </span>

            <button
              disabled={page === totalPages}
              onClick={() =>
                setPage(page + 1)
              }
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default App;