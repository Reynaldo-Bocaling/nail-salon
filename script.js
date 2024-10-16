  const loggedInEmail = localStorage.getItem("loggedInEmail");
  if (loggedInEmail) {
    toggleVisibility("loginPage", "reservationPage");
    displayReservations(loggedInEmail);
  }
};

const toggleVisibility = (hideId, showId) => {
  document.getElementById(hideId).classList.add("hidden");
  document.getElementById(showId).classList.remove("hidden");
};

document.getElementById("signInToggle").addEventListener("click", () => {
  toggleVisibility("signUpFormContainer", "signInFormContainer");
  toggleVisibility("signInToggle", "signUpToggle");
});

document.getElementById("signUpToggle").addEventListener("click", () => {
  toggleVisibility("signInFormContainer", "signUpFormContainer");
  toggleVisibility("signUpToggle", "signInToggle");
});

// Handle Sign In
document.getElementById("signInForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    localStorage.setItem("loggedInEmail", email);
    toggleVisibility("loginPage", "reservationPage");
    displayReservations(email);
  } else {
    document.getElementById("emailError").classList.remove("hidden");
  }
});

// Handle Sign Up
document.getElementById("signUpForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("signUpName").value;
  const email = document.getElementById("signUpEmail").value;
  const password = document.getElementById("signUpPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password === confirmPassword) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (!users.some((user) => user.email === email)) {
      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Sign Up Successful! Please Sign In.");
      toggleVisibility("signUpFormContainer", "signInFormContainer");
    } else {
      alert("Email already exists.");
    }
  } else {
    alert("Passwords do not match.");
  }
});

// Handle Logout
document.getElementById("logoutButton").addEventListener("click", () => {
  localStorage.removeItem("loggedInEmail");
  toggleVisibility("reservationPage", "loginPage");
});

// Handle Reservation
document
  .getElementById("reservationForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const service = document.getElementById("service").value;
    const email = localStorage.getItem("loggedInEmail");

    const reservations = JSON.parse(localStorage.getItem("reservations")) || {};
    reservations[email] = reservations[email] || [];
    reservations[email].push({ date, time, service });
    localStorage.setItem("reservations", JSON.stringify(reservations));

    displayReservations(email);
    document.getElementById("reservationForm").reset();
  });

// Display Reservations for the logged-in user
const displayReservations = (email) => {
  const reservations = JSON.parse(localStorage.getItem("reservations")) || {};
  const reservationList = document.getElementById("reservationList");
  reservationList.innerHTML = "";

  if (reservations[email]) {
    reservations[email].forEach(({ date, time, service }) => {
      const listItem = document.createElement("li");
      listItem.className = "border border-gray-300 rounded-lg p-4";
      listItem.innerHTML = `Date: ${date}, Time: ${time}, Service: ${service}`;
      reservationList.appendChild(listItem);
    });
  } else {
    reservationList.innerHTML = "<li>No reservations found.</li>";
  }
};

