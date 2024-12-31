function signupPage() {
  window.location = "./student-enroll/index.html"
}


const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});
