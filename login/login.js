const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const btnPopup = document.querySelector(".btnLogin-popup");
const iconClose = document.querySelector(".icon-close");

registerLink.addEventListener("click", () => {
  wrapper.classList.add("active");
});

loginLink.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

btnPopup.addEventListener("click", () => {
  wrapper.classList.add("active-popup");
});

iconClose.addEventListener("click", () => {
  wrapper.classList.remove("active-popup");
  wrapper.classList.remove("active");
});

let allUsers = JSON.parse(localstorage.getItem("users")) || [];

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = document.getElementById("login-username").value;
  const pass = document.getElementById("login-password").value;

  console.log("login:", user, pass);
  alert("Hi! welcome to the casino:", user);
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;

  console.log("register:", username, password);
  alert("Du trykte på register name:" + username);
});

function checkUserLogin() {
  let loginUser = user;
}
