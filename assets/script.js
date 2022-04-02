

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

    clockId = setInterval(clocktick, 1000)

    clockEl.textContent = time; 

    recieveQuestion(); 
}

function recieveQuestion() {

    var presentQuestion = questions[presentQuestionGuide]; 

    var promptEl = document.getElementById("question-prompt"); 
    promptEl.textContent = presentQuestion.prompt; 

    choicesEl.innerHTML = ""; 

    presentQuestion.choices.forEach(function(choice, i) {
        var choiceNew = document.createElement("button");
        choiceNew.setAttribute("class", "choice");
        choiceNew.setAttribute("value", choice); 

        choiceNew.onclick = questionClick; 
        
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

function quizFinish() {
    clearInterval(clockId);

    var finalScreenEl = document.getElementById("final-screen"); 
    finalScreenEl.removeAttribute("class");

    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time; 

    questionsEl.setAttribute("class", "hide"); 
}

function clocktick() {

    time--;
    timerEl.textContent = time; 

    if(time <= 0) {
        quizFinish();
    }
}

function recordHighscore() {

    var initials = initialsEl.value.trim();

    if (initials !== "") {
        var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || []; 

        var newHighscore = {
            score: time, 
            initials: initials
        };

        highscores.push(newHighscore); 
        window.localStorage.setItem("highscores", JSON.stringify(highscores)); 

        window.location.href = "highscores.html";
    }
}

function checkEntry(event) {
    if (event.key === "Enter") {
        recordHighscore(); 
    }
}



// submitting initials 
submitBtn.onclick = recordHighscore; 

startBtn.onclick = beginQuiz; 

initialsEl.onkeyup = checkEntry; 


var questions = [
    {
        prompt: "Inside which Element do we put the JavaScript?",
        choices: ["<js>", "<javascript>", "<scripting>", "<script>"],
        answer: "<script>" 
    },
    {
        prompt: "Where is the correct place to insert a JavaScript?",
        choices: ['document.getElementById("demo").innerHtml = "Hello World!";', 'document.getElement("p").innerHTML = "Hello World!";', '#demo.innerHTML = "Hello World!";', 'document.getElementByName("p").innerHTML = "Hello World!";'],
        answer: 'document.getElementById("demo").innerHtml = "Hello World!";'
    },
    {
        prompt: "Where is the correct place to insert a JavaScript?",
        choices: ["Both the <head> section and the <body> section are correct", "The <head> section", "The <body> section"],
        answer: "Both the <head> section and the <body> section are correct" 
    },
    {
        prompt: "How do you write "Hello World" in an alert box?",
        choices: ['msg("Hello World");', 'msgBox("Hello World");', 'alert("Hello World");', 'alertBox("Hello World");'],
        answer: "<script>" 
    }
];

function printHighscores() {
    // 
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
    // 
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
      // 
      var liTag = document.createElement("li");
      liTag.textContent = score.initials + " - " + score.score;
  
      // 
      var olEl = document.getElementById("highscores");
      olEl.appendChild(liTag);
    });
  }
  
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = clearHighscores;
  
  // 
  printHighscores();




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