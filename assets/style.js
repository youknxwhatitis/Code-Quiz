

// Elements 
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials"); 
var feedbackEl = document.querySelector("#feedback");

//initial state var 

var time = questions.length * 10; 
var presentQuestionGuide; 
var clockId; 

function beginQuiz(){
    var homeScreenEL = document.getElementById("home-screen");
    homeScreenEL.setAttribute("class", "hide");

    clockId = setInterval(clockStart, 1000)

    questionsEl.removeAttribute("class");

    clockEl.textContent = time; 

    recieveQuestion(); 
}

function recieveQuestion() {
    var presentQuestion = questions[presentQuestionGuide]; 

    var promptEl = document.getElementById("question-prompt"); 
    promptEl.textContent = presentQuestion.prompt; 

    choicesEl.innerHTML = "" ; 

    presentQuestion.choices.array.forEach(element(choice, i) {
        
        var choiceNew = document.createElement("button"); 
        choiceNew.setAttribute("class", "choice"); 
        choiceNew.setAttribute("value", choice); 

        choiceNew.textContent = i + 1 + ". " + choice; 

        choiceNew.onclick = questionclick; 

        choicesEl.appendChild(choiceNew);
    });
}

function questionclick() {
    if (this.value !==questions[presentQuestionGuide].answer) {

        clock -= 20;

        if (time > 0) {
            clock = 0; 
        }
        timerEl.textContent = clock;
        feedbackEl.textContent = "Incorrect!"; 
        
    } else {
        feedbackEl.textContent = "Correct!"; 
    }

    feedbackEl.setAttribute("class", "feedback"); 
    setBreak(function() {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000); 

    presentQuestionGuide++; 

    if (presentQuestionGuide === questions.length) {
        quizFinish();
    } else {
        recieveQuestion(); 
    }
}

function 


// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score