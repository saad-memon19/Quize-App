// // Open Modal
// function openQuiz(title) {
//     document.getElementById("modalQuizTitle").textContent = title;
//     document.getElementById("modalQuizDescription").textContent = `Welcome to ${title}!
//     Get ready to test your skills with this exciting quiz.
//     This quiz consists of 5 questions.
//     You will have 1 minute to complete it.
//     Stay focused, think quickly, and aim for the best score.
//     Good luck!`;
    
//     document.getElementById("quizModal").classList.remove("hidden");
// }


// // Close Modal
// function closeModal() {
//     document.getElementById("quizModal").classList.add("hidden");
// }

// // Scroll to Quiz Section and Show It
// function cssPage() {
//     window.location = "../css-quiz/index.html"
// }
function backDashboard() {
    window.location = "/quize-dashboard/index.html"
}


let questions = [
    {
        question: "Q1): What does CSS stand for?",
        options: [
            "Cascading Style Sheets",
            "Creative Style System",
            "Computer Style Sheets",
            "Colorful Style Syntax"
        ],
        answer: "Cascading Style Sheets",
    },
    {
        question: "Q2): Which HTML tag is used to define an internal style sheet?",
        options: ["<css>", "<script>", "<style>", "<design>"],
        answer: "<style>",
    },
    {
        question: "Q3): Which property is used to change the background color in CSS?",
        options: ["color", "bgcolor", "background-color", "background"],
        answer: "background-color",
    },
    {
        question: "Q4): What is the correct syntax for adding a margin in CSS?",
        options: [
            "margin: 10px;",
            "margin-width: 10px;",
            "margin-size: 10px;",
            "margin-padding: 10px;"
        ],
        answer: "margin: 10px;",
    },
    {
        question: "Q5): Which CSS property is used to make the text bold?",
        options: ["font-weight", "text-style", "font-bold", "bold"],
        answer: "font-weight",
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
        quizName: "Css Quiz", // Quiz ka naam
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
    window.location.href = "/Result-quize/index.html";
}

function startTimer() {
    let timeRemaining = 60; // Total timer duration
    const timerElement = document.getElementById('timer'); // Select the HTML element to update timer

    const timerInterval = setInterval(() => {
        if (timeRemaining > 0) {

            timeRemaining--; // Reduce time by 1 every second
            
            if (timeRemaining <= 20) { 
                timerElement.style.color = '#FF533A'; // Change text color to red when <= 20 seconds
            }
            
            timerElement.textContent = `${timeRemaining}s`; // Update the timer display
        } else {
            clearInterval(timerInterval); // Stop the timer when time runs out
            endQuiz(); // Call the endQuiz function
        }
    }, 1000); // Run this function every 1000 milliseconds (1 second)
}


// Initialize the quiz
loadQuestion();
startTimer();
