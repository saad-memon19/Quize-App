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
    // const quizSection = document.getElementById("startquizsection");

    // Show the Quiz Section
    // quizSection.classList.remove("hidden");

    // Scroll to the Quiz Section
    // quizSection.scrollIntoView({ behavior: "smooth" });

    // Hide the Modal
    // document.getElementById("quizModal").classList.add("hidden");

    window.location = "../start-quize/index.html"
}

const currentUser = JSON.parse(localStorage.getItem("currentLoggedinUser"));

// Check if the user is logged in
if (!currentUser) {
    window.location.href = "../student-enroll/index.html"; // Redirect to login page
} else {
    // Display welcome message
    document.getElementById("welcome-message").textContent = `Welcome to Quiz Dashboard, ${currentUser.name}!`;

    // Fetch quiz data for the current user
    const quizData = currentUser.quizData || [];
    console.log("Quiz Data:", quizData); // Debugging log

    // Total quizzes and completed quizzes
    const totalQuizzes = 5; // Adjust this as per your total quizzes
    const completedQuizzes = quizData.length;
    const inProgressQuizzes = totalQuizzes - completedQuizzes;

    // Update stats on the dashboard
    document.getElementById("completed-quizzes").textContent = completedQuizzes;
    document.getElementById("in-progress-quizzes").textContent = inProgressQuizzes > 0 ? inProgressQuizzes : 0;

    // Show last completed quiz details (if any)
    const quizDetailsContainer = document.getElementById("quiz-details");
    if (completedQuizzes > 0) {
        const lastQuiz = quizData[quizData.length - 1]; // Fetch the latest quiz
        quizDetailsContainer.innerHTML = `
            <p><strong>Last Completed Quiz:</strong> ${lastQuiz.quizName}</p>
            <p>Score: ${lastQuiz.score} / ${lastQuiz.totalQuestions * 10}</p>
            <p>Percentage: ${lastQuiz.percentage}%</p>
            <p>Date: ${lastQuiz.date}</p>
        `;
    } else {
        quizDetailsContainer.innerHTML = "<p>No quizzes completed yet.</p>";
    }
}
// Logout function to clear current user
function logout() {
    localStorage.removeItem("currentLoggedinUser");
    // alert("You have logged out.");
    window.location.href = "../student-enroll/index.html"; // Redirect to login page
}
