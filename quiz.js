const questions = [
    {
        question: "What is the Capital of India?",
        answers: [

            { text: "Mumbai", correct: false },
            { text: "Hyderabad", correct: false },
            { text: "New Delhi", correct: true },
            { text: "Kolkata", correct: false },

        ]
    },

    {
        question: "Who is the Prime Minister of Bharat?",
        answers: [

            { text: "Yogi Aaditya Nath", correct: false },
            { text: "Narendra Modi", correct: true },
            { text: "Tiger Raja Singh", correct: false },
            { text: "Rishab Kumar", correct: false },

        ]
    },
    {
        question: "What is most important in Coding?",
        answers: [

            { text: "Discipline", correct: false },
            { text: "Consistency", correct: false},
            { text: "Getting Erros", correct: false },
            { text: "All the above", correct: true },

        ]
    },
    {
        question: "Best Platform to learn Coding?",
        answers: [

            { text: "Youtube", correct: false },
            { text: "University", correct: false },
            { text: "Telegram", correct: false },
            { text: "Codera", correct: true },

        ]
    },

    {
        question: "Largest Continent in the World?",
        answers: [

            { text: "Asia", correct: true },
            { text: "Australia", correct: false },
            { text: "Africa", correct: false },
            { text: "Europe", correct: false },

        ]
    },
];

const question_element = document.querySelector("#question");
const answers_element = document.querySelector(".answers");
const Next_button = document.querySelector("#Next");

let current_question_index = 0;
let user_score = 0;

function start_quiz() {
    current_question_index = 0;
    user_score = 0;
    Next_button.innerHTML = "Next";
    show_question();
}
function reset_state() {
    Next_button.style.display = "none";
    while (answers_element.firstChild) {
        answers_element.removeChild(answers_element.firstChild);
    }
}


function show_question() {
    reset_state();
    let current_question = questions[current_question_index];
    let question_number = current_question_index + 1;
    question_element.innerHTML = `${question_number}. ${current_question.question}`;

    current_question.answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("answer_button");
        answers_element.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", check_answer);

    })

}

function check_answer(e) {
    let selected_answer = e.target;
    if (selected_answer.dataset.correct === "true") {
        selected_answer.classList.add("correct");
        user_score++;
    }
    else {
        selected_answer.classList.add("incorrect");
    }
    Array.from(answers_element.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    Next_button.style.display = "block";

}

function show_User_score() {
    reset_state();
    question_element.innerHTML = `You have scored ${user_score} out of ${questions.length}!`;
    Next_button.innerHTML = "Play Again";
    Next_button.style.display = "block";
}

function handle_Next_question() {
    current_question_index++;
    if (current_question_index < questions.length) {
        show_question();
    }
    else {
        show_User_score();
    }
}



Next_button.addEventListener("click", () => {
    if (current_question_index < questions.length) {
        handle_Next_question();
    }
    else {
        start_quiz();
    }

})

start_quiz();