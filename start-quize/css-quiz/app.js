

// let questions = [
//     {
//         question: "Q1): What does CSS stand for?",
//         options: [
//             "Cascading Style Sheets",
//             "Creative Style System",
//             "Computer Style Sheets",
//             "Colorful Style Syntax"
//         ],
//         answer: "Cascading Style Sheets",
//     },
//     {
//         question: "Q2): Which HTML tag is used to define an internal style sheet?",
//         options: ["<css>", "<script>", "<style>", "<design>"],
//         answer: "<style>",
//     },
//     {
//         question: "Q3): Which property is used to change the background color in CSS?",
//         options: ["color", "bgcolor", "background-color", "background"],
//         answer: "background-color",
//     },
//     {
//         question: "Q4): What is the correct syntax for adding a margin in CSS?",
//         options: [
//             "margin: 10px;",
//             "margin-width: 10px;",
//             "margin-size: 10px;",
//             "margin-padding: 10px;"
//         ],
//         answer: "margin: 10px;",
//     },
//     {
//         question: "Q5): Which CSS property is used to make the text bold?",
//         options: ["font-weight", "text-style", "font-bold", "bold"],
//         answer: "font-weight",
//     },
// ];

// let questionIndex = 0;
// let score = 0;

// // DOM Elements
// const questionNumberElement = document.getElementById("question-number");
// const questionTextElement = document.getElementById("question-text");
// const optionsContainer = document.getElementById("options-container");
// const timerElement = document.getElementById("timer");

// // Load the first question
// function loadQuestion() {
//     let currentQuestion = questions[questionIndex];

//     // Set question number and text
//     questionNumberElement.textContent = `Question ${questionIndex + 1} of ${questions.length}`;
//     questionTextElement.textContent = currentQuestion.question;

//     // Clear and add options
//     optionsContainer.innerHTML = "";
//     currentQuestion.options.forEach((option) => {
//         let button = document.createElement("button");
//         button.textContent = option;
//         button.className =
//             "w-full text-left bg-gray-200 hover:bg-[#00A97F] hover:text-white transition-all duration-700 px-4 py-3 rounded-lg text-gray-800 font-medium";

//         // Allow user to select and change answer
//         button.onclick = () => selectOption(button, currentQuestion.answer);

//         optionsContainer.appendChild(button);
//     });
// }

// // Handle option selection
// function selectOption(button, correctAnswer) {
//     // Remove active class from all options
//     let allOptions = document.querySelectorAll("#options-container button");
//     allOptions.forEach((btn) => btn.classList.remove("active"));

//     // Add active class to the selected option
//     button.classList.add("active");

//     // Save the selected option as a temporary value (for changing answers)
//     button.parentNode.dataset.selectedOption = button.textContent;
// }

// // Move to the next question or end the quiz
// function goToNextQuestion() {
//     // Check the selected option
//     const selectedOption = document.querySelector("#options-container .active");
//     if (!selectedOption) {
//         alert("Please select an answer before proceeding.");
//         return;
//     }

//     // Get the selected answer
//     const selectedAnswer = selectedOption.textContent;

//     // Get the correct answer
//     const correctAnswer = questions[questionIndex].answer;

//     // Check if the selected answer is correct
//     if (selectedAnswer === correctAnswer) {
//         score += 10; // Add score for correct answer
//     }

//     // Move to the next question or end the quiz
//     questionIndex++;
//     if (questionIndex < questions.length) {
//         loadQuestion(); // Load the next question
//     } else {
//         endQuiz(); // End the quiz
//     }
// }

// // End Quiz Logic
// function endQuiz() {
//     clearInterval(timer); // Stop the timer

//     // Fetch the current user
//     const currentUser = JSON.parse(localStorage.getItem("currentLoggedinUser"));

//     if (!currentUser) {
//         alert("No user logged in. Redirecting to login.");
//         window.location.href = "../login/index.html";
//         return;
//     }

//     // Calculate percentage
//     let percentage = (score / (questions.length * 10)) * 100;

//     // Add the quiz result to the user's quiz data
//     if (!currentUser.quizData) {
//         currentUser.quizData = [];
//     }
//     currentUser.quizData.push({
//         quizName: "CSS Quiz",
//         score: score,
//         percentage: Math.round(percentage),
//         totalQuestions: questions.length,
//         date: new Date().toLocaleString(),
//     });

//     // Save the updated user data back to localStorage
//     localStorage.setItem("currentLoggedinUser", JSON.stringify(currentUser));

//     // Redirect to result page
//     window.location.href = "../Result-css-quiz/index.html";
// }

// // Start timer
// function startTimer() {
//     let timeRemaining = 60; // Set total time for the quiz
//     const timerInterval = setInterval(() => {
//         if (timeRemaining > 0) {
//             timeRemaining--;
//             timerElement.textContent = `${timeRemaining}s`;
//         } else {
//             clearInterval(timerInterval);
//             endQuiz(); // End the quiz if time runs out
//         }
//     }, 1000);
// }

// // Initialize the quiz
// loadQuestion();
// startTimer();
