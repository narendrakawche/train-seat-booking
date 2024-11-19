const seatsContainer = document.getElementById("seatsContainer");
const seatsInput = document.getElementById("seats");
const bookSeatsButton = document.getElementById("bookSeats");

// Fetch seat data from the backend
async function fetchSeats() {
  try {
    const response = await fetch("http://localhost:3000/seats");
    const seats = await response.json();
    renderSeats(seats);
  } catch (error) {
    console.error("Error fetching seats:", error);
    alert("Failed to load seats. Please try again later.");
  }
}

// Render seats dynamically
function renderSeats(seats) {
  seatsContainer.innerHTML = ""; // Clear the container
  seats.forEach((seat) => {
    const seatButton = document.createElement("button");
    seatButton.textContent = seat.id; // Display seat number
    seatButton.className = seat.status; // Apply class (available/booked)
    seatButton.disabled = seat.status === "booked"; // Disable booked seats
    seatsContainer.appendChild(seatButton);
  });
}

// Book seats via the backend
async function bookSeats(numSeats) {
  try {
    const response = await fetch("http://localhost:3000/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ numberOfSeats: numSeats }),
    });

    if (response.ok) {
      alert(`${numSeats} seat(s) booked successfully!`);
      fetchSeats(); // Refresh seat layout
    } else {
      const error = await response.json();
      alert(error.message);
    }
  } catch (error) {
    console.error("Error booking seats:", error);
    alert("Failed to book seats. Please try again.");
  }
}

// Add event listener to the booking button
bookSeatsButton.addEventListener("click", () => {
  const numSeats = parseInt(seatsInput.value);
  if (isNaN(numSeats) || numSeats < 1 || numSeats > 7) {
    alert("Please enter a valid number between 1 and 7!");
    return;
  }
  bookSeats(numSeats);
});

// Fetch seats when the page loads
fetchSeats();
