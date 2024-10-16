const loggedInEmail = localStorage.getItem("loggedInEmail");
if (loggedInEmail) {
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("reservationPage").classList.remove("hidden");
  displayReservations(loggedInEmail);
}

// Toggle between Sign In and Sign Up forms
document.getElementById("signInToggle").addEventListener("click", function () {
  document.getElementById("signInFormContainer").classList.remove("hidden");
  document.getElementById("signUpFormContainer").classList.add("hidden");
  document.getElementById("signInToggle").classList.add("hidden");
  document.getElementById("signUpToggle").classList.remove("hidden");
});

document.getElementById("signUpToggle").addEventListener("click", function () {
  document.getElementById("signInFormContainer").classList.add("hidden");
  document.getElementById("signUpFormContainer").classList.remove("hidden");
  document.getElementById("signUpToggle").classList.add("hidden");
  document.getElementById("signInToggle").classList.remove("hidden");
});

// Handle Sign In
document
  .getElementById("signInForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Mocking authentication
    if (localStorage.getItem("users")) {
      const users = JSON.parse(localStorage.getItem("users"));
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        localStorage.setItem("loggedInEmail", email);
        document.getElementById("loginPage").classList.add("hidden");
        document.getElementById("reservationPage").classList.remove("hidden");
        displayReservations(email);
      } else {
        document.getElementById("emailError").classList.remove("hidden");
      }
    }
  });

// Handle Sign Up
document
  .getElementById("signUpForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("signUpName").value;
    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password === confirmPassword) {
      let users = JSON.parse(localStorage.getItem("users")) || [];
      if (!users.find((user) => user.email === email)) {
        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Sign Up Successful! Please Sign In.");
        document.getElementById("signUpFormContainer").classList.add("hidden");
        document
          .getElementById("signInFormContainer")
          .classList.remove("hidden");
      } else {
        alert("Email already exists.");
      }
    } else {
      alert("Passwords do not match.");
    }
  });

// Handle Logout
document.getElementById("logoutButton").addEventListener("click", function () {
  localStorage.removeItem("loggedInEmail");
  document.getElementById("reservationPage").classList.add("hidden");
  document.getElementById("loginPage").classList.remove("hidden");
});

// Handle Reservation
document
  .getElementById("reservationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const service = document.getElementById("service").value;
    const email = localStorage.getItem("loggedInEmail");

    const reservations = JSON.parse(localStorage.getItem("reservations")) || {};
    if (!reservations[email]) {
      reservations[email] = [];
    }
    reservations[email].push({ date, time, service });
    localStorage.setItem("reservations", JSON.stringify(reservations));
    displayReservations(email);
    document.getElementById("reservationForm").reset();
  });

// Display Reservations for the logged-in user
function displayReservations(email) {
  const reservations = JSON.parse(localStorage.getItem("reservations")) || {};
  const reservationList = document.getElementById("reservationList");
  reservationList.innerHTML = "";

  if (reservations[email]) {
    reservations[email].forEach((reservation) => {
      const listItem = document.createElement("li");
      listItem.className = "border border-gray-300 rounded-lg p-4";
      listItem.innerHTML = `Date: ${reservation.date}, Time: ${reservation.time}, Service: ${reservation.service}`;
      reservationList.appendChild(listItem);
    });
  } else {
    reservationList.innerHTML = "<li>No reservations found.</li>";
  }
}
