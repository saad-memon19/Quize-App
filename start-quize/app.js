var loginUserName = JSON.parse(localStorage.getItem("currentLoggedinUser"));
if (!loginUserName) {
    location.href = "../student-enroll/index.html"; // Redirect to login/signup page
}

function backDashboard() {
    window.location = "../quize-dashboard/index.html"
}



let questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris",
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4",
    },
    {
        question: "What is the full form of RAM?",
        options: [
            "Random Access Memory",
            "Run Accept Memory",
            "Read Aceapt Memory",
            "None of these",
        ],
        answer: "Random Access Memory",
    },
];

let questionIndex = 0;
let score = 0;

// DOM Elements
const questionNumberElement = document.getElementById("question-number");
const questionTextElement = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const timerElement = document.getElementById("timer");

// Load the first question
function loadQuestion() {
    let currentQuestion = questions[questionIndex];

    // Set question number and text
    questionNumberElement.textContent = `Question ${questionIndex + 1} of ${questions.length}`;
    questionTextElement.textContent = currentQuestion.question;

    // Clear and add options
    optionsContainer.innerHTML = "";
    currentQuestion.options.forEach((option) => {
        let button = document.createElement("button");
        button.textContent = option;
        button.className =
            "w-full text-left bg-gray-200 hover:bg-[#00A97F] hover:text-white transition-all duration-700 px-4 py-3 rounded-lg text-gray-800 font-medium";

        // Allow user to select and change answer
        button.onclick = () => selectOption(button, currentQuestion.answer);

        optionsContainer.appendChild(button);
    });
}

// Handle option selection
function selectOption(button, correctAnswer) {
    // Remove active class from all options
    let allOptions = document.querySelectorAll("#options-container button");
    allOptions.forEach((btn) => btn.classList.remove("active"));

    // Add active class to the selected option
    button.classList.add("active");

    // Save the selected option as a temporary value (for changing answers)
    button.parentNode.dataset.selectedOption = button.textContent;
}

// Move to the next question or end the quiz
function goToNextQuestion() {
    // Check the selected option
    const selectedOption = document.querySelector("#options-container .active");
    if (!selectedOption) {
        alert("Please select an answer before proceeding.");
        return;
    }

    // Get the selected answer
    const selectedAnswer = selectedOption.textContent;

    // Get the correct answer
    const correctAnswer = questions[questionIndex].answer;

    // Check if the selected answer is correct
    if (selectedAnswer === correctAnswer) {
        score += 10; // Add score for correct answer
    }

    // Move to the next question or end the quiz
    questionIndex++;
    if (questionIndex < questions.length) {
        loadQuestion(); // Load the next question
    } else {
        endQuiz(); // End the quiz
    }
}

// End Quiz Logic
function endQuiz() {
    clearInterval(timer); // Stop the timer

    // Fetch the current user
    const currentUser = JSON.parse(localStorage.getItem("currentLoggedinUser"));

    if (!currentUser) {
        alert("No user logged in. Redirecting to login.");
        window.location.href = "../login/index.html";
        return;
    }

    // Calculate percentage
    let percentage = (score / (questions.length * 10)) * 100;

    // Add the quiz result to the user's quiz data
    if (!currentUser.quizData) {
        currentUser.quizData = [];
    }
    currentUser.quizData.push({
        quizName: "HTML Quiz",
        score: score,
        percentage: Math.round(percentage),
        totalQuestions: questions.length,
        date: new Date().toLocaleString(),
    });

    // Save the updated user data back to localStorage
    localStorage.setItem("currentLoggedinUser", JSON.stringify(currentUser));

    // Redirect to result page
    window.location.href = "../Result-quize/index.html";
}

// Start timer
function startTimer() {
    let timeRemaining = 60; // Set total time for the quiz
    const timerInterval = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            timerElement.textContent = `${timeRemaining}s`;
        } else {
            clearInterval(timerInterval);
            endQuiz(); // End the quiz if time runs out
        }
    }, 1000);
}

// Initialize the quiz
loadQuestion();
startTimer();
