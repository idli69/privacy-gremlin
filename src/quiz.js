let questions = [];
let questionIndex = 0;
let score = 0;
let maxScore = 30;
// to make changing option
let selectedPoints = null;
let selectedButton = null;

const $ = (id) => document.getElementById(id);

// get screens
const startScreen = $("start-screen");
const quizScreen = $("quiz-screen");
const resultScreen = $("result-screen");

// get quiz elements
const questionElement = $("question");
const optionsElement = $("options");
const nextBtn = $("next-btn");
const startBtn = $("start-btn");

// get results
const resultScore = $("result-score");
const resultAdvice = $("result-advice");

// Toggle the hidden class so only one screen is shown
function showScreen(screenToShow) {
  const screens = [startScreen, quizScreen, resultScreen];
  screens.forEach((screen) => {
    screen.classList.add("hidden");
  });
  screenToShow.classList.remove("hidden");
}

// change selection
function resetSelection() {
  selectedPoints = null;
  selectedButton = null;
  nextBtn.classList.add("hidden");
}

// Show the current question
function showQuestion() {
  resetSelection();
  const currentQuestion = questions[questionIndex];

  questionElement.textContent = currentQuestion.text;
  optionsElement.innerHTML = "";

  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");

    button.textContent = option.text;
    button.classList.add("btn", "btn-option");

    button.addEventListener("click", () => {
      selectAnswer(button, option.points);
    });

    optionsElement.appendChild(button);
  });
}

// select answer
function selectAnswer(button, points) {
  if (selectedButton) {
    selectedButton.classList.remove("text-accent", "border-accent");
  }

  selectedButton = button;
  selectedPoints = points;

  selectedButton.classList.add("text-accent", "border-accent");
  nextBtn.classList.remove("hidden");
}

// next question
function goToNextQuestion() {
  score += selectedPoints;
  questionIndex++;

  if (questionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// Score advice
function getAdvice(score) {
  const advices = {
    worst:
      "You're leaving digital footprints everywhere. Time to level up your privacy habits!",
    okay: "You dodge the obvious traps, but there's still a lot you can tighten up.",
    good: "Solid habits. A few more steps and you'll be nearly invisible online.",
    best: "You're a privacy powerhouse. Keep spreading the gospel to your less-careful friends.",
  };

  if (score <= 9) return advices.worst;
  if (score <= 17) return advices.okay;
  if (score <= 24) return advices.good;
  return advices.best;
}

// show final result
function showResult() {
  resultScore.textContent = `You got ${score} out of ${maxScore}.`;
  resultAdvice.textContent = getAdvice(score);

  showScreen(resultScreen);
}

// start quiz
function startQuiz() {
  questionIndex = 0;
  score = 0;

  showScreen(quizScreen);
  showQuestion();
}

// load questions from JSON file
async function loadQuestions() {
  try {
    const response = await fetch("/questions.json");
    if (!response.ok) {
      throw new Error("Could not find questions.json");
    }
    questions = await response.json();

    showScreen(startScreen);
  } catch (error) {
    console.error(error);
    showLoadError();
  }
}

// Show loading error on start screen
function showLoadError() {
  startScreen.querySelector("p").textContent =
    "Could not load questions. Please refresh.";
}

// Event listeners
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", goToNextQuestion);

// Init
loadQuestions();
