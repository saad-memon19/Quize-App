function openQuiz(title) {
    document.getElementById("modalQuizTitle").textContent = title;
    document.getElementById("modalQuizDescription").textContent = `Welcome to ${title}!
    Get ready to test your skills with this exciting quiz.
    This quiz consists of 5 questions.
    You will have 1 minute to complete it.
    Stay focused, think quickly, and aim for the best score.
    Good luck!`;

    document.getElementById("quizModal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("quizModal").classList.add("hidden");
}

function quizPage() {
    const title = document.getElementById("modalQuizTitle").textContent;
    let url = "";

    if (title === "Html Quiz - Level 1") {
        url = "../start-quize/index.html";
    } else if (title === "Css Quiz - Level 1") {
        url = "../start-quize/css-quiz/index.html";
    } else if (title === "Javascript Quiz - Level 1") {
        url = "../start-quize/javascript-quiz/index.html";
    }

    window.location = url;
    closeModal();
}

const currentUser = JSON.parse(localStorage.getItem("currentLoggedinUser"));

if (!currentUser) {
    window.location.href = "../student-enroll/index.html"; // Redirect to login page
} else {
    document.getElementById("welcome-message").textContent = `Welcome to Quiz Dashboard, ${currentUser.name}👋!`;

    const quizData = currentUser.quizData || [];

    const totalQuizzes = 3;
    const completedQuizzes = quizData.length;
    const inProgressQuizzes = totalQuizzes - completedQuizzes;

    document.getElementById("completed-quizzes").textContent = completedQuizzes;
    document.getElementById("in-progress-quizzes").textContent = inProgressQuizzes > 0 ? inProgressQuizzes : 0;

    const quizDetailsContainer = document.getElementById("quiz-details");
    if (completedQuizzes > 0) {
        const lastQuiz = quizData[quizData.length - 1];
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
