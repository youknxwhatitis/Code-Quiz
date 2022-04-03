//Elements
var clockEl = document.querySelector("#time");
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#choices");
var beginBtn = document.querySelector("#begin");
var submitBtn = document.querySelector("#submit");
var initialsEl = document.querySelector("#initials");
var reportEl = document.querySelector("#report");

// quiz state variables
var time = questions.length * 12;
var presentQuestionGuide = 0;
var clockId;

function beginQuiz() {
  // hides the home-screen
  var homeScreenEl = document.getElementById("home-screen");
  homeScreenEl.setAttribute("class", "hide");

  // reveals questions
  questionsEl.removeAttribute("class");

  // displays time left
  clockEl.textContent = time;

  // initiate clock/timer
  clockId = setInterval(clockTick, 1000);
  
  recieveQuestion();
}

function recieveQuestion() {
  // collects questinn from array
  var presentQuestion = questions[presentQuestionGuide];

  // updates question prompt
  var titleEl = document.getElementById("prompt");
  titleEl.textContent = presentQuestion.title;

  // clears previous choices
  choicesEl.innerHTML = "";

  // loops choices
  presentQuestion.choices.forEach(function(choice, i) {
    // creates new button for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // event-listener for each choice
    choiceNode.onclick = questionClick;

    // displays on the page
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  // check if user guessed incorrectly
  if (this.value !== questions[presentQuestionGuide].answer) {
    // time deduction 
    time -= 10 ;

    if (time <= 0) {
      time = 0;
    }
    // display new time on page
    clockEl.textContent = time;
    reportEl.textContent = "Incorrect";
    reportEl.style.fontSize = "100%";
  } else {
    reportEl.textContent = "Correct!";
    reportEl.style.fontSize = "100%";
  }

  // flash right/wrong feedback
  reportEl.setAttribute("class", "report");
  setTimeout(function() {
    reportEl.setAttribute("class", "report hide");
  }, 1000);

  // next question
  presentQuestionGuide++;

  // time checker
  if (presentQuestionGuide === questions.length) {
    quizEnd();
  } else {
    recieveQuestion();
  }
}

function quizEnd() {

  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  clearInterval(clockId);

  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // update time
  time--;
  clockEl.textContent = time;

  // user check for no more time 
  if (time <= 0) {
    quizEnd();
  }
}

function recordHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    // get saved scores to localstorage 
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // change object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // direct to the score page
    window.location.href = "highscores.html";
  }
}

function entry(event) {
  if (event.key === "Enter") {
    recordHighscore();
  }
}

// submit initials
submitBtn.onclick = recordHighscore;


// begins quiz
beginBtn.onclick = beginQuiz;

initialsEl.onkeyup = entry;
