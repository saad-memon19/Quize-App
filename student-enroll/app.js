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




function signup(e) {
    e.preventDefault();
    const userName = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (!userName || !email || !password) {
        swal("Error", "Please fill out all fields!", "error");
        return;
    }

    const userRecord = { name: userName, email: email, password: password };
    const userData = JSON.parse(localStorage.getItem("userData")) || [];
    userData.push(userRecord);

    localStorage.setItem("userData", JSON.stringify(userData));

    swal("Success", `Signup successful, ${userName}!`, "success");

    document.getElementById("signupName").value = "";
    document.getElementById("signupEmail").value = "";
    document.getElementById("signupPassword").value = "";
}

function login(e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
        swal("Error", "Please fill out all fields!", "error");
        return;
    }

    const userData = JSON.parse(localStorage.getItem("userData")) || [];
    const userFound = userData.find(user => user.email === email && user.password === password);

    if (userFound) {
        swal("Success", "Login successful!", "success").then(() => {
            window.location = "../quize-dashboard/index.html";
        });
        localStorage.setItem("currentLoggedinUser", JSON.stringify(userFound));
    } else {
        swal("Error", "User not found. Check your email and password!", "error");
    }

    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPassword").value = "";
}
