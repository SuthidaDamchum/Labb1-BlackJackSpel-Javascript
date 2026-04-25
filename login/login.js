const loginSection = document.getElementById("login-section");
const registerSection = document.getElementById("register-section");
const toRegisterLink = document.getElementById("to-register");
const toLoginLink = document.getElementById("to-login");
const loginButton = document.getElementById("loginButton");
const registerButton = document.getElementById("registerButton");
const errorMsg = document.getElementById("errorMsg");

toRegisterLink.addEventListener("click", () => {
  loginSection.style.display = "none";
  registerSection.style.display = "block";
  errorMsg.textContent = "";
});

toLoginLink.addEventListener("click", () => {
  registerSection.style.display = "none";
  loginSection.style.display = "block";
  errorMsg.textContent = "";
});

registerButton.addEventListener("click", () => {
  // VIKTIGT: Kolla att ID stämmer med din HTML (reg-username)
  const usernameInput = document.getElementById("register-username").value;
  const passwordInput = document.getElementById("register-password").value;

  if (!usernameInput || !passwordInput) {
    errorMsg.textContent = "Fill in all fields!";
    errorMsg.style.color = "red";
    return;
  }

  let users = JSON.parse(localStorage.getItem("allUsers")) || [];
  const userExists = users.find((user) => user.username === usernameInput);

  if (userExists) {
    errorMsg.textContent = "Username is already taken!";
    errorMsg.style.color = "red";
  } else {
    const newUser = {
      username: usernameInput,
      password: passwordInput,
      balance: 1000,
    };

    users.push(newUser); // Lägg till i listan
    localStorage.setItem("allUsers", JSON.stringify(users)); // Spara hela listan

    errorMsg.textContent = "Account created! Log in now.";
    errorMsg.style.color = "green";

    setTimeout(() => {
      registerSection.style.display = "none";
      loginSection.style.display = "block";
      errorMsg.textContent = "";
    }, 1500);
  }
});

loginButton.addEventListener("click", () => {
  const usernameInput = document.getElementById("login-username").value;
  const passwordInput = document.getElementById("login-password").value;

  let users = JSON.parse(localStorage.getItem("allUsers")) || [];

  const foundUser = users.find(
    (user) =>
      user.username === usernameInput && user.password === passwordInput,
  );

  if (foundUser) {
    // VIKTIGT: setItem, inte getItem!
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    window.location.href = "../game/game.html";
  } else {
    errorMsg.textContent = "Wrong username or password!";
    errorMsg.style.color = "red";
  }
});
