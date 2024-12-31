// Check if the user is already logged in
var loginUserName = JSON.parse(localStorage.getItem("currentLoggedinUser"));

if (loginUserName) {
    // If user is logged in, redirect to dashboard
    location.href = "../quize-dashboard/index.html";
}

const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');

function showLogin() {
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
    loginTab.classList.add('text-gray-800', 'border-[#FF533A]');
    loginTab.classList.remove('text-gray-500');
    signupTab.classList.add('text-gray-500');
    signupTab.classList.remove('text-gray-800', 'border-[#FF533A]');
}

function showSignup() {
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    signupTab.classList.add('text-gray-800', 'border-[#FF533A]');
    signupTab.classList.remove('text-gray-500');
    loginTab.classList.add('text-gray-500');
    loginTab.classList.remove('text-gray-800', 'border-[#FF533A]');
    signupTab.classList.remove('border-hidden');
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        // Agar Enter key press hui hai
        if (document.getElementById('signup-form').style.display !== 'none') {
            signup();
            // Agar Signup form visible hai, to signup function call hoga
        } else if (document.getElementById('login-form').style.display !== 'none') {
            login();
            // Agar Login form visible hai, to login function call hoga
        }
    }
});


function signup(e) {
    e.preventDefault(); // Page reload ko roke

    const userName = document.getElementById("signupName").value.trim().toLowerCase();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (!userName || !email || !password) {
        swal("Error", "Saray fields bharna zaroori hain!", "error");
        return;
    }

    // Unique user ID generate karna
    let userIdCounter = localStorage.getItem("userIdCounter");
    if (!userIdCounter) {
        userIdCounter = 1000; // Start ID from 1000
    }
    const newUserId = parseInt(userIdCounter) + 1;
    localStorage.setItem("userIdCounter", newUserId);

    // Naya user object
    const userRecord = {
        id: newUserId,
        name: userName,
        email: email,
        password: password,
        quizData: [] // Quiz data ka empty array initialize
    };

    // LocalStorage me data save karna
    const userData = JSON.parse(localStorage.getItem("userData")) || [];
    const existingUser = userData.find(user => user.email === email);
    if (existingUser) {
        swal("Error", "Email Already Register!", "error");
        return;
    }
    userData.push(userRecord);
    localStorage.setItem("userData", JSON.stringify(userData));

    swal("Success", `Signup successful, ${userName}! Your User ID: ${newUserId}`, "success");

    document.getElementById("signupName").value = "";
    document.getElementById("signupEmail").value = "";
    document.getElementById("signupPassword").value = "";

    window.location = "../student-enroll/index.html"
}

function login(e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
        swal("Error", "Please fill out all fields!", "error");
        return;
    }

    // Fetch all user data
    const userData = JSON.parse(localStorage.getItem("userData")) || [];
    const userFound = userData.find(user => user.email === email && user.password === password);

    if (userFound) {
        // Save the current logged-in user's ID in localStorage
        localStorage.setItem("currentLoggedinUser", JSON.stringify(userFound));
        swal("Success", `Welcome back, ${userFound.name}!`, "success").then(() => {
            window.location = "../quize-dashboard/index.html"; // Redirect to dashboard
        });
    } else {
        swal("Error", "User not found. Check your email and password!", "error");
    }

    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPassword").value = "";
}
