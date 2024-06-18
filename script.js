//Set the Questions
const questions = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "What is US Capital?",
        answers: [
            {text: "New York", correct: false},
            {text: "Los Angeles", correct: false},
            {text: "Washington D.C.", correct: true},
            {text: "San Francisco", correct: false},
        ] 
    },
    {
        question: "What my favorite animal?",
        answers: [
            {text: "Whale", correct: false},
            {text: "Dog", correct: false},
            {text: "Otter", correct: true},
            {text: "Cat", correct: false},
        ] 
    },
    {
        question: "What is the fastest animal?",
        answers: [
            {text: "Falcon", correct: true},
            {text: "Chettah", correct: false},
            {text: "Tuna", correct: false},
            {text: "Alligator", correct: false},
        ] 
    },
]

//varibles for question, answer buttons, and next button
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

//varibales to question number and score
let currentQuestionIndex = 0;
let score = 0;

//fnc serves as a reset
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex]; //the big section of the question and answers
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; //targets the question specifically

    //display the answers
    currentQuestion.answers.forEach(answer => { //loops through each
        const button = document.createElement("button"); //creates a button tag
        button.innerHTML = answer.text; //add text to element
        button.classList.add("btn"); //add btn class name to button
        answerButtons.appendChild(button); //add it to the answer-button id so it can display

        //add click events on answers
        if (answer.correct){
            button.dataset.correct = answer.correct; //adds true or false to dataset
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){ //removes all previous answers
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target; //the selected button element is e
    const isCorrect = selectedBtn.dataset.correct === "true"; //check if e is true or false
    if(isCorrect){
        selectedBtn.classList.add("correct"); //green
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect"); //red
    }
    //after selecting answer -- we can only select once
    //we also need to make sure that if we select the correct, only that turns green
    // if we select a wrong answer, ours turns red and the correct turns green
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){ //adds the green color to the correct ans
            button.classList.add("correct");
        }
        button.disabled = true; //we cannont click on any button
    });
    nextButton.style.display = "block"; //displays the next btn
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

//function for clicking next button
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{ //if no more questions
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();