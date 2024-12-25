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
let timeRemaining = 60;
let timer;

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
        button.onclick = () => selectOption(button, currentQuestion.answer);
        optionsContainer.appendChild(button);
    });
}

// Handle option selection
function selectOption(button, correctAnswer) {
    // Remove active class from all options
    let allOptions = document.querySelectorAll("#options-container button");
    allOptions.forEach((btn) => btn.classList.remove("active"));

    // Add active class to selected option
    button.classList.add("active");

    // Check if the selected answer is correct
    if (button.textContent === correctAnswer) {
        score += 10; // Increase score by 10 points for correct answer
    }
}

// Move to the next question or end the quiz
function goToNextQuestion() {
    questionIndex++;

    if (questionIndex < questions.length) {
        loadQuestion(); // Load the next question
    } else {
        endQuiz(); // End the quiz
    }
}

// Start timer
function startTimer() {
    timer = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            timerElement.textContent = `${timeRemaining}s`;
        } else {
            clearInterval(timer);
            endQuiz(); // End the quiz if time runs out
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);

    const currentUser = JSON.parse(localStorage.getItem("currentLoggedinUser"));

    if (!currentUser) {
        console.error("User data not found.");
        return;
    }

    let percentage = (score / (questions.length * 10)) * 100;

    if (!currentUser.quizData) {
        currentUser.quizData = [];
    }
    currentUser.quizData.push({
        quizName: "HTML Quiz", // Quiz ka naam
        score: score,
        percentage: Math.round(percentage),
        totalQuestions: questions.length,
        date: new Date().toLocaleString() // Timestamp
    });

    const userData = JSON.parse(localStorage.getItem("userData")) || [];
    const userIndex = userData.findIndex(user => user.id === currentUser.id);
    if (userIndex !== -1) {
        userData[userIndex] = currentUser; // Update global user data
        localStorage.setItem("userData", JSON.stringify(userData));
    }

    localStorage.setItem("currentLoggedinUser", JSON.stringify(currentUser));
    window.location.href = "../Result-quize/index.html";
}

// Initialize the quiz
loadQuestion();
startTimer();
