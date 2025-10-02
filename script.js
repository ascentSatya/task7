const API_URL = "https://jsonplaceholder.typicode.com/users";
const userContainer = document.getElementById("user-container");
const message = document.getElementById("message");
const reloadBtn = document.getElementById("reload");
const searchInput = document.getElementById("search");
const themeToggle = document.getElementById("theme-toggle");

async function fetchUsers() {
  message.textContent = "⏳ Loading users...";
  userContainer.innerHTML = "";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) throw new Error("Failed to fetch users");

    const users = await response.json();
    displayUsers(users);

    message.textContent = ""; // clear loading message

    // enable search filter
    searchInput.addEventListener("input", () => {
      const searchValue = searchInput.value.toLowerCase();
      const filtered = users.filter(u => 
        u.name.toLowerCase().includes(searchValue) ||
        u.email.toLowerCase().includes(searchValue)
      );
      displayUsers(filtered);
    });

  } catch (error) {
    console.error(error);
    message.innerHTML = "⚠️ Oops! Couldn’t fetch users. Check your internet.";
  }
}

function displayUsers(users) {
  userContainer.innerHTML = "";
  if (users.length === 0) {
    userContainer.innerHTML = "<p>No users found.</p>";
    return;
  }

  users.forEach(user => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${user.name}</h3>
      <p class="email">📧 ${user.email}</p>
      <p class="address">📍 ${user.address.street}, ${user.address.city}</p>
    `;

    userContainer.appendChild(card);
  });
}

// reload button
reloadBtn.addEventListener("click", fetchUsers);

// DARK MODE TOGGLE
function setTheme(isDark) {
  if (isDark) {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark");
    themeToggle.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
}

// check stored preference
if (localStorage.getItem("theme") === "dark") {
  setTheme(true);
}

// toggle button
themeToggle.addEventListener("click", () => {
  setTheme(!document.body.classList.contains("dark"));
});

// initial fetch
fetchUsers();
