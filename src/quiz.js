let questions = [];
let qsIndex = 0;
let score = 0;
let maxScore = 30;

const $ = (id) => document.getElementById(id);

const startScreen = $("start-screen");
const quizScreen = $("quiz-screen");
const resultScreen = $("result-screen");

const questionElement = $("question");
const optionsElement = $("options");

const nextBtn = $("next-btn");
const startBtn = $("start-btn");
const restartBtn = $("restart-btn");

const resultScore = $("result-score");
const resultAdvice = $("result-advice");

// function to toggle different screens
function showScreen(screen) {
  let screens = [startScreen, quizScreen, resultScreen];
  screens.forEach((s) => {
    s.classList.add("hidden");
  });
  screen.classList.remove("hidden");
}

function showQuestions() {
  const qs = questions[qsIndex];
  nextBtn.classList.add("hidden");

  questionElement.textContent = qs.text;
  optionsElement.innerHTML = "";

  optionsElement.classList.add("btn btn-option");
  qs.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.textContent = option.text;
    btn.addEventListener("click", () => handleAnswer(btn, option.points));
    optionsElement.appendChild(btn);
  });
}

function handleAnswer(selectedButton, points) {
  score = score + points;
  optionsElement.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });
  selectedButton.classList.add("text-accent");
  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  qsIndex++;
  qsIndex < questions.length ? showQuestions() : showResult();
});

function getAdvice(score) {
  const advices = {
    worst:
      "You're leaving digital footprints everywhere. Time to level up your privacy habits!",
    okay: "You dodge the obvious traps, but there's still a lot you can tighten up.",
    good: "Solid habits. A few more steps and you'll be nearly invisible online.",
    best: "You're a privacy powerhouse. Keep spreading the gospel to your less-careful friends.",
  };

  if (score <= 3) return advices.worst;
  else if (score <= 5) return advices.okay;
  else if (score <= 8) return advices.good;
  else return advices.best;
}

function showResult() {
  const advice = getAdvice(score);
  resultScore.textContent = `Yea! You got ${score} out of ${maxScore}.`;
  resultAdvice.textContent = advice;
  showScreen(resultScreen);
}

function startQuiz() {
  qsIndex = 0;
  score = 0;
  showScreen(quizScreen);
  showQuestions();
}

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", startQuiz);

async function loadQuestions() {
  try {
    const response = await fetch("/questions.json");
    const data = await response.json();

    questions = data;

    showScreen(startScreen);
  } catch (error) {
    console.error(error);
    showLoadError();
  }
}

function showLoadError() {
  console.log("Could not load questions. Please refresh.");
  startScreen.querySelector("p").textContent =
    "Could not load questions. Please refresh.";
}

loadQuestions();
