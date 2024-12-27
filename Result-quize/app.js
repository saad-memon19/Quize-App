const currentUser = JSON.parse(localStorage.getItem("currentLoggedinUser"));

if (currentUser && currentUser.quizData && currentUser.quizData.length > 0) {
    const latestQuiz = currentUser.quizData[currentUser.quizData.length - 1];
    document.getElementById("score-display").textContent = `Your Score: ${latestQuiz.score} out of ${
        latestQuiz.totalQuestions * 10
    }`;
    document.getElementById("percentage-display").textContent = `Percentage: ${latestQuiz.percentage}%`;
} else {
    document.getElementById("score-display").textContent = "No score available.";
    document.getElementById("percentage-display").textContent = "No percentage available.";
}
function backDashboard() {
    window.location = "../quize-dashboard/index.html";
}

function restartQuiz() {
    window.location.href = "../start-quize/index.html"; // Redirect to quiz start page
}

