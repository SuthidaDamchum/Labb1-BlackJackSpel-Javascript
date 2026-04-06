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


const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('login-form');

registerForm.addEventListener('submit', (e) => {

    e.preventDeafult();

    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    console.log("register:", username , password);
    alert("Du trykte på register name:"  + useername)


});