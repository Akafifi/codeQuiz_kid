const startButton = document.getElementById('start_btn')
const nextButton = document.getElementById('next_btn')
// var startButton = document.querySelector("#start_btn");
// var nextButton = document.querySelector("#next_btn");


const questionContainerElement = document.getElementById('question_container')

const questionElement = document.getElementById('question')

const answerButtonsElement = document.getElementById('answer_buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()

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
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }

}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if(correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
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
    }
]