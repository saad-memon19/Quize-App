var loginUserName = JSON.parse(localStorage.getItem("currentLoggedinUser"));
if (!loginUserName) {
    location.href = "../student-enroll/index.html"; // Redirect to login/signup page
}

function backDashboard() {
    window.location = "../quize-dashboard/index.html"
}



let questions = [
    {
        question: "Q1): What does HTML stand for?",
        options: [
            "HyperText Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language",
            "HyperTool Management Language"
        ],
        answer: "HyperText Markup Language",
    },
    {
        question: "Q2): What is the correct HTML element for the largest heading?",
        options: ["<h1>", "<heading>", "<h6>", "<head>"],
        answer: "<h1>",
    },
    {
        question: "Q3): Which HTML element is used to create a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: "<a>",
    },
    {
        question: "Q4): What is the correct way to add a background color in HTML?",
        options: [
            '<body style="background-color:yellow;">',
            '<background>yellow</background>',
            '<body bg="yellow">',
            '<body color="yellow">'
        ],
        answer: '<body style="background-color:yellow;">',
    },
    {
        question: "Q5): Which HTML tag is used to define an unordered list?",
        options: ["<ul>", "<ol>", "<li>", "<list>"],
        answer: "<ul>",
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

function startTimer() {
    let timeRemaining = 60; // Total timer duration
    const timerElement = document.getElementById('timer'); // Select the HTML element to update timer

    const timerInterval = setInterval(() => {
        if (timeRemaining > 0) {
<<<<<<< HEAD
            timeRemaining--; // Reduce time by 1 every second
            
            if (timeRemaining <= 20) { 
                timerElement.style.color = '#FF533A'; // Change text color to red when <= 20 seconds
            }
            
            timerElement.textContent = `${timeRemaining}s`; // Update the timer display
=======
            timeRemaining--;

            // Change the color if seconds are 20 or less
            if (timeRemaining <= 20) {
                timerElement.style.color = '#FF533A';
            }

            timerElement.textContent = `${timeRemaining}s`;
>>>>>>> 9126002 (50% page change)
        } else {
            clearInterval(timerInterval); // Stop the timer when time runs out
            endQuiz(); // Call the endQuiz function
        }
    }, 1000); // Run this function every 1000 milliseconds (1 second)
}


// Initialize the quiz
loadQuestion();
startTimer();
