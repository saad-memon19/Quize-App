const currentUser = JSON.parse(localStorage.getItem("currentLoggedinUser"));

if (currentUser) {
    const userNameElement = document.getElementById("user-name");
    const quizTitleElement = document.getElementById("quiz-title");
    const userScoreElement = document.getElementById("user-score");
    const totalScoreElement = document.getElementById("total-score");
    const completionDateElement = document.getElementById("completion-date");
    const quizPercentageElement = document.getElementById("quiz-percentage");
    const certificateTitleElement = document.querySelector(".certificate-title");
    const certificateSubtitleElement = document.querySelector(".certificate-subtitle");

    userNameElement.textContent = currentUser.name || "John Doe";

    const latestQuiz = currentUser.quizData ? currentUser.quizData[currentUser.quizData.length - 1] : null;

    if (latestQuiz) {
        const score = latestQuiz.score || 0;
        const totalScore = latestQuiz.totalQuestions * 10 || 100;
        const percentage = Math.round((score / totalScore) * 100);

        // Update certificate content
        quizTitleElement.textContent = latestQuiz.quizName || "Sample Quiz";
        userScoreElement.textContent = score;
        totalScoreElement.textContent = totalScore;
        completionDateElement.textContent = latestQuiz.date || new Date().toLocaleString();
        quizPercentageElement.textContent = `${percentage}%`;

        // Customize heading and subtitle based on score
        if (percentage === 0) {
            certificateTitleElement.textContent = "Starting Point";
            certificateSubtitleElement.textContent = "The journey begins here. It's okay to face setbacks, stay focused and keep moving forward!";
        } else if (percentage <= 20) {
            certificateTitleElement.textContent = "Encouragement Certificate";
            certificateSubtitleElement.textContent = "Don't give up! Keep practicing!";
        } else if (percentage <= 40) {
            certificateTitleElement.textContent = "Good Effort Certificate";
            certificateSubtitleElement.textContent = "You're doing well, keep improving!";
        } else if (percentage <= 60) {
            certificateTitleElement.textContent = "Progress Certificate";
            certificateSubtitleElement.textContent = "Nice progress! Keep pushing yourself!";
        } else if (percentage <= 80) {
            certificateTitleElement.textContent = "Great Effort Certificate";
            certificateSubtitleElement.textContent = "Amazing effort! You're almost there!";
        } else {
            certificateTitleElement.textContent = "Certificate of Completion";
            certificateSubtitleElement.textContent = "This is to certify that you have successfully completed the task.";
        }

    } else {
        // Default fallback for missing quiz data
        quizTitleElement.textContent = "Sample Quiz";
        userScoreElement.textContent = "0";
        totalScoreElement.textContent = "100";
        completionDateElement.textContent = new Date().toLocaleString();
        quizPercentageElement.textContent = "0%";

        // Customize fallback heading and subtitle
        certificateTitleElement.textContent = "Encouragement Certificate";
        certificateSubtitleElement.textContent = "Don't give up! Keep practicing!";
    }
} else {
    swal("Unauthorized!", "You need to log in to view your certificate.", "warning").then(() => {
        window.location.href = "../student-enroll/index.html";
    });
}


// Button functionalities
function backDashboard() {
    window.location.href = "../quize-dashboard/index.html";
}

function restartQuiz() {
    window.location.href = "../start-quize/index.html";
}



