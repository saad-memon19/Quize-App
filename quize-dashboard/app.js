// Open Modal
function openQuiz(title) {
    document.getElementById("modalQuizTitle").textContent = title;
    document.getElementById("modalQuizDescription").textContent = `Welcome to ${title}. Get ready to test your skills!`;
    document.getElementById("quizModal").classList.remove("hidden");
}

// Close Modal
function closeModal() {
    document.getElementById("quizModal").classList.add("hidden");
}

// Scroll to Quiz Section and Show It
function quizPage() {
    const quizSection = document.getElementById("startquizsection");

    // Show the Quiz Section
    quizSection.classList.remove("hidden");

    // Scroll to the Quiz Section
    quizSection.scrollIntoView({ behavior: "smooth" });

    // Hide the Modal
    document.getElementById("quizModal").classList.add("hidden");
}


function logout() {

    window.location = "../student-enroll/index.html";
localStorage.removeItem("currentLoggedinUser")
}

window.onload = showData;








