let mcqs = [
    {
        id: 1,
        question: " Which keyword is used to declare a variable in JavaScript?",
        options: ["int", "var", "string", "define"],
        answer: "var"
    },
    {
        id: 2,
        question: " Which method is used to add an element at the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        answer: "push()"
    },
    {
        id: 3,
        question: " Which method removes the last element from an array?",
        options: ["push()", "shift()", "pop()", "slice()"],
        answer: "pop()"
    },
    {
        id: 4,
        question: " Which method is used to create a new array by modifying every element?",
        options: ["filter()", "map()", "find()", "forEach()"],
        answer: "map()"
    },
    {
        id: 5,
        question: " Which method returns elements that satisfy a condition?",
        options: ["map()", "filter()", "push()", "join()"],
        answer: "filter()"
    },
    {
        id: 6,
        question: " Which operator is used for strict equality?",
        options: ["=", "==", "===", "!="],
        answer: "==="
    },
    {
        id: 7,
        question: " What is the output of: typeof 'Hello'?",
        options: ["text", "string", "char", "object"],
        answer: "string"
    },
    {
        id: 8,
        question: " Which method is used to find the first element that satisfies a condition?",
        options: ["find()", "filter()", "map()", "every()"],
        answer: "find()"
    },
    {
        id: 9,
        question: " Which method checks whether all elements satisfy a condition?",
        options: ["some()", "every()", "find()", "filter()"],
        answer: "every()"
    },
    {
        id: 10,
        question: " Which method checks whether at least one element satisfies a condition?",
        options: ["every()", "some()", "findIndex()", "map()"],
        answer: "some()"
    },
    {
        id: 11,
        question: " Which method returns the index of the first element that satisfies a condition?",
        options: ["find()", "indexOf()", "findIndex()", "search()"],
        answer: "findIndex()"
    },
    {
        id: 12,
        question: " What is the output of: 10 + '5'?",
        options: ["15", "105", "Error", "50"],
        answer: "105"
    },
    {
        id: 13,
        question: " Which symbol is used for a single-line comment?",
        options: ["/* */", "//", "#", "<!-- -->"],
        answer: "//"
    },
    {
        id: 14,
        question: " Which function is used to display a popup message?",
        options: ["prompt()", "confirm()", "alert()", "message()"],
        answer: "alert()"
    },
    {
        id: 15,
        question: " Which keyword is used to declare a constant variable?",
        options: ["var", "let", "const", "constant"],
        answer: "const"
    }
];


let currentQuestion = 0;
let selectedOption = {};
let timeInterval;
let timeLeft = 5 * 60;
let quizSubmitted = false;


// ================= START QUIZ =================

function startQuiz() {

    document.getElementById("home-screen").classList.add("d-none");

    document.getElementById("quiz-screen").classList.remove("d-none");

    currentQuestion = 0;
    selectedOption = {};
    timeLeft = 5 * 60;
    quizSubmitted = false;

    showQuestion();

    updateTime();

    startTime();
}


// ================= SHOW QUESTION =================

function showQuestion() {

    let question = mcqs[currentQuestion];

    // Show question
    document.getElementById("display-question").innerHTML = `
        <h5>${question.id}. ${question.question}</h5>
    `;


    // Show options
    let optionBox = document.getElementById("display-option");

    optionBox.innerHTML = "";


    question.options.forEach(function (option) {

        let li = document.createElement("li");

        li.innerHTML = `
            <label class="option-box">
                <input 
                    type="radio"
                    name="answer"
                    value="${option}"
                >
                ${option}
            </label>
        `;


        let radio = li.querySelector("input");


        // Save selected answer
        radio.addEventListener("change", function () {

            selectedOption[currentQuestion] = this.value;

        });


        // Restore selected answer
        if (selectedOption[currentQuestion] === option) {
            radio.checked = true;
        }


        optionBox.append(li);

    });


    // ================= PREV / NEXT BUTTON =================

    let prevBtn = document.getElementById("prev-btn");

    let nextBtn = document.getElementById("next-btn");


    // First question → Prev disabled
    if (currentQuestion === 0) {

        prevBtn.disabled = true;

    } else {

        prevBtn.disabled = false;

    }


    // Last question → Next disabled
    if (currentQuestion === mcqs.length - 1) {

        nextBtn.disabled = true;

    } else {

        nextBtn.disabled = false;

    }

}


// ================= NEXT QUESTION =================

function nextQuestion() {

    if (currentQuestion < mcqs.length - 1) {

        currentQuestion++;

        showQuestion();

    }

}


// ================= PREVIOUS QUESTION =================

function prevQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();

    }

}


// ================= START TIMER =================

function startTime() {

    clearInterval(timeInterval);


    timeInterval = setInterval(function () {

        timeLeft--;

        updateTime();


        // Time finished
        if (timeLeft <= 0) {

            clearInterval(timeInterval);

            submitQuiz();

        }

    }, 1000);

}


// ================= UPDATE TIMER =================

function updateTime() {

    let minutes = Math.floor(timeLeft / 60);

    let seconds = timeLeft % 60;


    document.getElementById("time").innerText =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}


// ================= SUBMIT QUIZ =================

function submitQuiz() {

    if (quizSubmitted) {

        return;

    }


    quizSubmitted = true;


    clearInterval(timeInterval);


    let score = checkAnswer();


    // Hide quiz
    document.getElementById("quiz-screen").classList.add("d-none");


    // Show result
    document.getElementById("result-screen").classList.remove("d-none");


    // Show score
    document.getElementById("score").innerHTML =
        `Your Score: ${score} / ${mcqs.length}`;


    // Show answer sheet
    showAnswerSheet();

}


// ================= CHECK ANSWERS =================

function checkAnswer() {

    let score = 0;


    mcqs.forEach(function (question, index) {

        if (selectedOption[index] === question.answer) {

            score++;

        }

    });


    return score;

}


// ================= ANSWER SHEET =================

function showAnswerSheet() {

    let answerSheet = document.getElementById("answer-sheet");


    answerSheet.innerHTML = "";


    mcqs.forEach(function (question, index) {

        let userAnswer = selectedOption[index];


        let status;


        // Unanswered
        if (!userAnswer) {

            status = `
                <span class="answer-unanswered">
                    Unanswered
                </span>
            `;

        }

        // Correct
        else if (userAnswer === question.answer) {

            status = `
                <span class="answer-corect">
                    Correct
                </span>
            `;

        }

        // Wrong
        else {

            status = `
                <span class="answer-wrong">
                    Wrong
                </span>
            `;

        }


        answerSheet.innerHTML += `

            <div class="mb-4">

                <h6>
                    ${question.id}. ${question.question}
                </h6>

                <p>
                    <b>Your Answer:</b>
                    ${userAnswer || "Not answered"}
                </p>

                <p>
                    <b>Correct Answer:</b>
                    ${question.answer}
                </p>

                <p>
                    ${status}
                </p>

                <hr>

            </div>

        `;

    });

}