function backDashboard() {
    window.location = "/quize-dashboard/index.html"
}


let questions = [
    {
        question: "Q1): What is the correct syntax for referring to an external script in JavaScript?",
        options: [
            '<script src="file.js">',
            '<script href="file.js">',
            '<script ref="file.js">',
            '<script link="file.js">'
        ],
        answer: '<script src="file.js">',
    },
    {
        question: "Q2): Inside which HTML element do we put the JavaScript?",
        options: ["<js>", "<javascript>", "<script>", "<code>"],
        answer: "<script>",
    },
    {
        question: "Q3): How do you write 'Hello World' in an alert box in JavaScript?",
        options: [
            'alert("Hello World");',
            'msg("Hello World");',
            'prompt("Hello World");',
            'print("Hello World");'
        ],
        answer: 'alert("Hello World");',
    },
    {
        question: "Q4): How do you declare a JavaScript variable?",
        options: [
            "var myVar;",
            "variable myVar;",
            "v myVar;",
            "declare myVar;"
        ],
        answer: "var myVar;",
    },
    {
        question: "Q5): Which operator is used to assign a value to a variable in JavaScript?",
        options: ["=", "==", "===", "=>"],
        answer: "=",
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
        quizName: "Javascript Quiz",
        score: score,
        percentage: Math.round(percentage),
        totalQuestions: questions.length,
        date: new Date().toLocaleString(),
    });

    // Save the updated user data back to localStorage
    localStorage.setItem("currentLoggedinUser", JSON.stringify(currentUser));

    // Redirect to result page
    window.location.href = "/Result-quize/index.html";
}

// Start timer
function startTimer() {
    let timeRemaining = 60; // Set total time for the quiz
    const timerInterval = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;

            // Change the color if seconds are 20 or less
            if (timeRemaining <= 20) {
                timerElement.style.color = '#FF533A';
            }

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
