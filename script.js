var totalTime = 90;
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("countDown");
var quizQuestions = [
  {
    question: "What is the first pillar of object oriented programming?",
    answers: {
      a: "Abstraction",
      b: "Encapsulation",
      c: "Polymorphism",
      d: "Inheritance",
    },
    correctAnswer: "b",
  },
  {
    question: "Hoisting is the process of moving ______",
    answers: {
      a: "Functions to the top of the file",
      b: "Objects to the top of the file",
      c: "Callback Functions",
      d: "None of the above",
    },
    correctAnswer: "a",
  },
  {
    question: "Which of these removes the first element of an array?",
    answers: {
      a: "pop",
      b: "slice",
      c: "unshift",
      d: "shift",
    },
    correctAnswer: "d",
  },
  {
    question: "Template literals use which punctuation marks",
    answers: {
      a: "single quotes",
      b: "double quotes",
      c: "backticks",
      d: "backslashes",
    },
    correctAnswer: "c",
  },
  {
    question:
      "What naming convention is typically used with a constructor function?",
    answers: {
      a: "PascalCase",
      b: "Camelcase",
      c: "Snakecase",
      d: "Hungarian notation",
    },
    correctAnswer: "a",
  },
  {
    question: "What is used to iterate over the objects of an array?",
    answers: {
      a: "if and else",
      b: "for",
      c: "switch and case",
      d: "for in",
    },
    correctAnswer: "d",
  },
  {
    question: "What is a method",
    answers: {
      a: "a function in an object",
      b: "a function that creates an object",
      c: "a function that depends on another function",
      d: "both a and b",
    },
    correctAnswer: "a",
  },
  {
    question: "Which of these statements are true",
    answers: {
      a: "Primitives are copied by their value",
      b: "Objects are copied by their reference",
      c: "Both a and b",
      d: "Neither a or b",
    },
    correctAnswer: "c",
  },
];
var currentSlide = 0;

function beginQuiz() {
  var startTimer = setInterval(function () {
    totalTime--;
    timeLeft.textContent = totalTime;
    if (totalTime === 0) {
      clearInterval(startTimer);
    }

    if (currentSlide >= quizQuestions.length) {
      clearInterval(startTimer);
    }
  }, 1000);
}

(function () {
  function makeQuiz() {
    var output = [];
    quizQuestions.forEach(function (currentQuestion, questionNumber) {
      var answers = [];

      for (letter in currentQuestion.answers) {
        answers.push(
          '<label>\n <input type="radio" name="question'
            .concat(questionNumber, '" value="')
            .concat(letter, '">\n')
            .concat(letter, " :\n")
            .concat(currentQuestion.answers[letter], "\n </label>")
        );
      }

      output.push(
        '<div class="slide">\n <div class="question"> '
          .concat(currentQuestion.question, ' </div>\n<div class="answers"> ')
          .concat(answers.join(""), " </div>\n -</div>")
      );
    });
    quizContainer.innerHTML = output.join("");
  }

  var numCorrect = 0;

  function showResults() {
    var answerContainers = quizContainer.querySelectorAll(".answers");
    quizQuestions.forEach(function (currentQuestion, questionNumber) {
      var answerContainer = answerContainers[questionNumber];
      var selector = "input[name=question".concat(questionNumber, "]:checked");
      var userAnswer = (answerContainer.querySelector(selector) || {}).value;

      if (userAnswer !== currentQuestion.correctAnswer) {
        totalTime = totalTime - 10;
        console.log("totalTime", totalTime);
        timeLeft.textContent = `Score: ${totalTime}`;
      }
    });
    resultsContainer.innerHTML = ""
      .concat(numCorrect, " out of ")
      .concat(quizQuestions.length);
  }

  function slideShow(n) {
    slides[currentSlide].classList.remove("active--slide");
    slides[n].classList.add("active--slide");
    currentSlide = n;

    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }

    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNext() {
    slideShow(currentSlide + 1);
  }

  function showPrevious() {
    slideShow(currentSlide - 1);
  }

  var quizContainer = document.getElementById("quiz");
  var resultsContainer = document.getElementById("results");
  var submitButton = document.getElementById("submit");

  makeQuiz();

  var previousButton = document.getElementById("previous");
  var nextButton = document.getElementById("next");
  var slides = document.querySelectorAll(".slide");

  var highScoreButton = document.getElementById("highScores");

  slideShow(currentSlide);

  highScoreButton.addEventListener("click", highScores);
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPrevious);
  nextButton.addEventListener("click", showNext);
  startButton.addEventListener("click", beginQuiz);

  function highScores() {
    var scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push(totalTime);
    var highScore = JSON.stringify(scores);
    localStorage.setItem("scores", highScore);

    for (var i = 0; i < scores.length; i++) {
      var pTag = document.createElement("p");

      pTag.append(`Score: ${scores[i]}`);
      document.getElementById("results").append(pTag);
    }
  }
})();
