const questions = [
    {
        question: 'Commonly used data types DO NOT include:',
        answers: [
            {text: 'strings', correct: false},
            {text: 'booleans', correct: true},
            {text: 'alerts', correct: false},
            {text: 'numbers', correct: false}
        ]
    },
    {
        question: 'The conditions of an if/else statement are enclosed within:',
        answers: [
            {text: 'curly brackets', correct: false},
            {text: 'quotes', correct: false},
            {text: 'parentheses', correct: true},
            {text: 'square brackets', correct: false}
        ]
    },
    {
        question: 'Which of the following assignments prevents you from changing its value: ',
        answers: [
            {text: 'var', correct: false},
            {text: 'let', correct: false},
            {text: 'const', correct: true},
            {text: 'int', correct: false}
        ]
    },
    {
        question: 'Javascript is object-oriented:',
        answers: [
            {text: 'False', correct: false},
            {text: 'True', correct: true}
        ]
    }
];

const startButton = document.getElementById('start_btn');
const nextButton = document.getElementById('next_btn');
const questionContainerElement = document.getElementById('question_container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer_buttons');
var time = 60
var getTime = document.querySelector('.timer_part_seconds')

let shuffledQuestions, currentQuestionIndex;


startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    setInterval(function setTime() {getTime.innerText = time
        time--}, 1000 )
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    }) 
}

function resetState() {
    nextButton.classList.add('hide')
    document.body.classList.remove('correct', 'wrong')
    while (answerButtonsElement.firstChild) {
       answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        gameOver()
    }

}

function gameOver() {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')

    var questions = document.querySelector('#questions')
    questions.classList.add('hide')

    var endScreen = document.querySelector('#end')
    endScreen.classList.remove('hide')

    // document.querySelector('#end').classList.remove('hide')
}


function setStatusClass(element, correct) {
    clearStatusClass(element)
    if(correct) {
        element.classList.add('correct')
    } else {
        time = time - 10
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = document.querySelector('#mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 3

// finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

function saveHighScore(e) {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }
    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })
    highScores.splice(3)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('./index.html')
}