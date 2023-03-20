const loader = document.getElementById("center-loading-animation-div");

//   Show Loader for 2Sec
// loader.classList.add("active");
// setTimeout(() => {
//   loader.classList.remove("active");
// }, 2000);

//   Code for Switch Login and SignUp
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const sign_in_img = document.querySelector("#sign-in-img");
const sign_up_img = document.querySelector("#sign-up-img");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// Check Already login or not
let status = JSON.parse(localStorage.getItem("login-status"));
console.log(status);
if (status) {
  window.location = "/";
}

// Handle Register
function handleRegister() {
  let name = document.getElementById("register-name").value;
  let email = document.getElementById("register-email").value;
  let password = document.getElementById("register-password").value;
  if (name.length && email.length && password.length) {
    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    localStorage.setItem("login-status", true);
    alert("Register Successfully")
    window.location = "/";
  }
}

// Handle Register
function handleLogin() {
  let email = document.getElementById("login-email").value;
  let password = document.getElementById("login-password").value;
  let user = JSON.parse(localStorage.getItem("user"));
  if (email.length && password.length) {
    if (user.email === email && user.password === password) {
      localStorage.setItem("login-status", true);
      window.location = "/";
    }else{
        alert("Please Enter the correct email & password");
    }
  }else{
    alert("Please Enter the email & password")
  }
}
