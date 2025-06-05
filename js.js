document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const startScreen = document.getElementById("start-screen");
  const quizScreen = document.getElementById("quiz-screen");
  const resultScreen = document.getElementById("result-screen");
  const startButton = document.getElementById("start-btn");
  const restartButton = document.getElementById("restart-btn");
  const shareButton = document.getElementById("share-btn");
  const backButton = document.getElementById("back-btn");

  const questionText = document.getElementById("question-text");
  const answersContainer = document.getElementById("answers-container");
  const currentQuestionSpan = document.getElementById("current-question");
  const totalQuestionsSpan = document.getElementById("total-questions");
  const scoreSpan = document.getElementById("score");
  const finalScoreSpan = document.getElementById("final-score");
  const resultMessage = document.getElementById("result-message");
  const progressBar = document.getElementById("progress");
  const timerElement = document.getElementById("time-left");

  // Modal logic
  const modal = document.getElementById("info-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");
  const closeModal = document.getElementById("close-modal");

  // High Score Modal logic
  const showHighscoreBtn = document.getElementById("show-highscore-btn");
  const highscoreModal = document.getElementById("highscore-modal");
  const closeHighscoreModal = document.getElementById("close-highscore-modal");
  const modalLeaderboardList = document.getElementById("modal-leaderboard-list");

  // Mechanics and Rules modal
  document.getElementById("mechanics-btn").onclick = function() {
    modalTitle.textContent = "Game Mechanics";
    modalBody.innerHTML = `
      <ul style="padding-left:1.2em;">
        <li>Make two groups to perform the game.</li>
        <li>Choose the correct answer in the game provided.</li>
        <li>Each correct answer will recieve a +5 points, while uncorrect answer will recieve a -5 points.</li>
        <li>After the series of answering the question, it shows the correct answer and points in every question.</li>
        <li>The Group who got the highest score will recognize as a winner.</li>
      </ul>
    `;
    modal.classList.add("active");
  };
  document.getElementById("rules-btn").onclick = function() {
    modalTitle.textContent = "Rules";
    modalBody.innerHTML = `
      <ul style="padding-left:1.2em;">
        <li>There are two selected categories: Single bulb and RGB bulb.</li>
        <li>Each category has 3 levels: EASY, AVERAGE, and HARD.</li>
        <li>Each level contains 5 questions.</li>
        <li>You must answer and complete the EASY level first to unlock and proceed to the next levels.</li>
        <li>10 seconds to answer each question.</li>
        <li>If the other group cannot answer the question, it can be passed to another group.</li>
      </ul>
    `;
    modal.classList.add("active");
  };
  closeModal.onclick = function() {
    modal.classList.remove("active");
  };
  window.onclick = function(event) {
    if (event.target === modal) modal.classList.remove("active");
  };

  // High Score Modal logic
  if (showHighscoreBtn && highscoreModal && closeHighscoreModal && modalLeaderboardList) {
    showHighscoreBtn.onclick = function() {
      // Always load latest scores
      let scores = JSON.parse(localStorage.getItem("groupScores") || "[]");
      modalLeaderboardList.innerHTML = "";
      if (scores.length === 0) {
        modalLeaderboardList.innerHTML = "<li>No scores yet.</li>";
      } else {
        scores.slice(0, 10).forEach(s => {
          const li = document.createElement("li");
          li.textContent = `${s.name} - ${s.score}`;
          modalLeaderboardList.appendChild(li);
        });
      }
      highscoreModal.classList.add("active");
    };
    closeHighscoreModal.onclick = function() {
      highscoreModal.classList.remove("active");
        // Show the reset button if it exists
      const resetBtn = document.getElementById("reset-scores-btn");
      if (resetBtn) resetBtn.style.display = "block";
    };
    window.addEventListener("click", function(event) {
      if (event.target === highscoreModal) highscoreModal.classList.remove("active");
    });
    
    // Add reset logic
    const resetBtn = document.getElementById("reset-scores-btn");
    if (resetBtn) {
      resetBtn.onclick = function() {
        if (confirm("Are you sure you want to reset all group scores?")) {
          localStorage.removeItem("groupScores");
          modalLeaderboardList.innerHTML = "<li>No scores yet.</li>";
          resetBtn.style.display = "none";
          // Also update the leaderboard on the result screen if visible
          const leaderboard = document.getElementById("leaderboard");
          const list = document.getElementById("leaderboard-list");
          if (leaderboard && list) {
            leaderboard.style.display = "none";
            list.innerHTML = "";
          }
        }
      };
    }
  }

  // Only keep your actual quiz questions for Single Bulb and RGB Bulb
  const quizData = {
    singleBulb: [
      // EASY (5 questions)
      //number 1 question
      {
        question: "When you turn on the red bulb in the simulator, what color is projected on the screen?",
        answers: [
          { text: "Blue", correct: false },
          { text: "Red", correct: true },
          { text: "Green", correct: false },
          { text: "White", correct: false },
        ],
        difficulty: "easy",
        category: "Single Bulb"
      },
      //number 2 question
      {
        question: " In the simulator, if you place a red filter in front of a red bulb, what do you see?",
        answers: [
          { text: "The light disappears", correct: false },
          { text: "The light appears dim blue", correct: false },
          { text: "Red light passes through clearly", correct: true },
          { text: "Green light appears", correct: false },
        ],
        difficulty: "easy",
        category: "Single Bulb"
      },
      //number 3 question
      {
        question: "In the eye model of the simulator, which cells respond when red light enters the eye?",
        answers: [
          { text: "Only green cones", correct: false },
          { text: "Only rod cells", correct: false },
          { text: "Only red cones", correct: true },
          { text: "All cone cells equally", correct: false },
        ],
        difficulty: "easy",
        category: "Single Bulb"
      },
      //number 4 question
      {
        question: "When the bulb is turned off in the simulator, what happens to the screen?",
        answers: [
          { text: "It turns white", correct: false },
          { text: "It glows blue", correct: false },
          { text: "It stays lit faintly", correct: false },
          { text: "It becomes completely black", correct: true },
        ],
        difficulty: "easy",
        category: "Single Bulb"
      },
      //number 5 question
      {
        question: "What color appears on the screen when you turn on the green bulb with no filter?",
        answers: [
          { text: "Black", correct: false },
          { text: "Green", correct: true },
          { text: "Blue", correct: false },
          { text: "Yellow", correct: false },
        ],
        difficulty: "easy",
        category: "Single Bulb"
      },

      // MEDIUM (5 questions)
      //number 1 question
      {
        question: "In the simulator, what do you see when a red bulb shines through a green filter?",
        answers: [
          { text: "Red light passes through", correct: false },
          { text: "Green light appears", correct: false },
          { text: "The screen stays black ", correct: true },
          { text: "Purple light appears", correct: false },
        ],
        difficulty: "medium",
        category: "Single Bulb"
      },
      //number 2 question
      {
        question: "What happens in the simulator when a blue filter is placed in front of a green bulb?",
        answers: [
          { text: "Blue light passes through", correct: false },
          { text: "Green light passes through", correct: false },
          { text: "The screen turns yellow", correct: false },
          { text: "No light passes through", correct: true },
        ],
        difficulty: "medium",
        category: "Single Bulb"
      },
      //number 3 question
      {
        question: "hen you use a filter, what does it do in the simulator?",
        answers: [
          { text: "Blocks all light", correct: false },
          { text: "Changes the light to white", correct: false },
          { text: "Let’s only one color of light pass ", correct: true },
          { text: "Makes the light brighter", correct: false },
        ],
        difficulty: "medium",
        category: "Single Bulb"
      },
      //number 4 question
      {
        question: "If you shine a green bulb through a blue filter, what is observed on the screen?",
        answers: [
          { text: "Green light", correct: false },
          { text: "Blue light", correct: false },
          { text: "the screen remains dark", correct: true },
          { text: "Cyan light", correct: false },
        ],
        difficulty: "medium",
        category: "Single Bulb"
      },
      //number 5 question
      {
        question: "What happens when a blue bulb shines on a red object in the simulator?",
        answers: [
          { text: "The object glows red", correct: false },
          { text: "The object looks black", correct: true },
          { text: "The object reflects blue", correct: false },
          { text: "The object turns purple", correct: false },
        ],
        difficulty: "medium",
        category: "Single Bulb"
      },

      // HARD (5 questions)
      //number 1 question
      {
        question: "When red light passes through a cyan filter in the simulator, what happens?",
        answers: [
          { text: "The light turns purple", correct: false },
          { text: "Red light is visible", correct: false },
          { text: "No light reaches the screen", correct: true },
          { text: "The light turns green", correct: false },
        ],
        difficulty: "hard",
        category: "Single Bulb"
      },
      //number 2 question
      {
        question: "In the simulator, which filter blocks red light from a red bulb?",
        answers: [
          { text: "Red filter", correct: false },
          { text: "Green filter", correct: true },
          { text: "Cyan filter", correct: false },
          { text: "No filter can block it", correct: false },
        ],
        difficulty: "hard",
        category: "Single Bulb"
      },
      //number 3 question
      {
        question: " If a person has red-green colorblindness (as shown in the simulator), how would they perceive the red bulb light?",
        answers: [
          { text: "As clearly red", correct: false },
          { text: "As gray or faded", correct: true },
          { text: "As green", correct: false },
          { text: "As yellow", correct: false },
        ],
        difficulty: "hard",
        category: "Single Bulb"
      },
      //number 4 question
      {
        question: "When a green bulb shines through a red filter in the simulator, what do you observe?",
        answers: [
          { text: "Green light shines through", correct: false },
          { text: "Red light appears", correct: false },
          { text: "No light passes through", correct: true },
          { text: "The light becomes yellow", correct: false },
        ],
        difficulty: "hard",
        category: "Single Bulb"
      },
      //number 5 question
      {
        question: "In the simulator, why doesn't a blue filter allow red light from the red bulb to pass?",
        answers: [
          { text: "Because red light is absorbed by the blue filter ", correct: true },
          { text: "Because red light is reflected", correct: false },
          { text: "Because red and blue mix", correct: false },
          { text: "Because the bulb is too dim", correct: false },
        ],
        difficulty: "hard",
        category: "Single Bulb"
      }
    ],

    // RGB Bulb questions
    rgbBulb: [
      // EASY (5 questions)
      //number 1 question
      {
        question: "What color shows when you turn on red and green lights?",
        answers: [
          { text: "Blue", correct: false },
          { text: "Yellow", correct: true },
          { text: "Purple", correct: false },
          { text: "Black", correct: false },
        ],
        difficulty: "easy",
        category: "RGB Bulb"
      },
      //number 2 question
      {
        question: "You turn on red, green, and blue lights. What color do you get?",
        answers: [
          { text: "White", correct: true },
          { text: "Red", correct: false },
          { text: "Black", correct: false },
          { text: "Orange", correct: false },
        ],
        difficulty: "easy",
        category: "RGB Bulb"
      },
      //number 3 question
      {
        question: "What color do you see when only the green light is on?",
        answers: [
          { text: "Green", correct: true },
          { text: "Blue", correct: false },
          { text: "Yellow", correct: false },
          { text: "Red", correct: false },
        ],
        difficulty: "easy",
        category: "RGB Bulb"
      },
      //number 4 question
      {
        question: "If no lights are on, what color is the screen?",
        answers: [
          { text: "Red", correct: false },
          { text: "White", correct: false },
          { text: "Black", correct: true },
          { text: "Blue", correct: false },
        ],
        difficulty: "easy",
        category: "RGB Bulb"
      },
      //number 5 question
      {
        question: "You turn on red and blue lights. What color appears?",
        answers: [
          { text: "Yellow", correct: false },
          { text: "Magenta", correct: true },
          { text: "Cyan", correct: false },
          { text: "Green", correct: false },
        ],
        difficulty: "easy",
        category: "RGB Bulb"
      },

      // MEDIUM (5 questions)
      //number 1 question
      {
        question: "You turn on red and green. The screen is yellow. You want it to look white. What should you do?",
        answers: [
          { text: "Turn off all lights", correct: false },
          { text: "Add blue light", correct: true },
          { text: " Add more red", correct: false },
          { text: "Remove green", correct: false },
        ],
        difficulty: "medium",
        category: "RGB Bulb"
      },
      //number 2 question
      {
        question: "You want to make cyan. Which two lights do you need?",
        answers: [
          { text: "Green and blue", correct: true },
          { text: "Red and green", correct: false },
          { text: "Red and blue", correct: false },
          { text: "Blue and yellow", correct: false },
        ],
        difficulty: "medium",
        category: "RGB Bulb"
      },
      //number 3 question
      {
        question: "You make white light. How can you make it dimmer but keep the color?",
        answers: [
          { text: "Turn off green", correct: false },
          { text: "Make all lights less bright", correct: true },
          { text: "Use only red", correct: false },
          { text: "Add a filter", correct: false },
        ],
        difficulty: "medium",
        category: "RGB Bulb"
      },
      //number 4 question
      {
        question: "You make magenta (red + blue). It looks too red. What can you do?",
        answers: [
          { text: "Turn off red", correct: false },
          { text: "Add more green", correct: false },
          { text: "Add more blue", correct: true },
          { text: "Turn off all lights", correct: false },
        ],
        difficulty: "medium",
        category: "RGB Bulb"
      },
      //number 5 question
      {
        question: "You want the screen to be purple. Which lights do you turn on?",
        answers: [
          { text: "Blue and red", correct: true },
          { text: "Green and blue", correct: false },
          { text: "Red and green", correct: false },
          { text: "Green only", correct: false },
        ],
        difficulty: "medium",
        category: "RGB Bulb"
      },

      // HARD (5 questions)
      //number 1 question
      {
        question: "You turn on red = 100%, green = 100%, and blue = 50%. What does the screen look like?",
        answers: [
          { text: "Blue", correct: false },
          { text: "Warm white", correct: true },
          { text: "Green", correct: false },
          { text: "Yellow", correct: false },
        ],
        difficulty: "hard",
        category: "RGB Bulb"
      },
      //number 2 question
      {
        question: "You turn on red = 0%, green = 100%, blue = 100%. What color do you see?",
        answers: [
          { text: "Yellow", correct: false },
          { text: "White", correct: false },
          { text: "Cyan", correct: true },
          { text: "Pink", correct: false },
        ],
        difficulty: "hard",
        category: "RGB Bulb"
      },
      //number 3 question
      {
        question: "You want a cooler (bluish) white light. What do you change?",
        answers: [
          { text: "Add more red", correct: false },
          { text: "Add more blue ", correct: true },
          { text: "Remove green", correct: false },
          { text: "Turn off all lights", correct: false },
        ],
        difficulty: "hard",
        category: "RGB Bulb"
      },
      //number 4 question
      {
        question: "You mix red and green. You place a blue filter in front. What do you see?",
        answers: [
          { text: "Blue", correct: false },
          { text: "Red", correct: false },
          { text: "Green", correct: false },
          { text: "Black ", correct: true },
        ],
        difficulty: "hard",
        category: "RGB Bulb"
      },
      //number 5 question
      {
        question: "You use red, green, and blue to make white. Then you turn off green. What color do you see now?",
        answers: [
          { text: "Cyan", correct: false },
          { text: "Blue", correct: false },
          { text: "Magenta", correct: true },
          { text: "White", correct: false },
        ],
        difficulty: "hard",
        category: "RGB Bulb"
      }
    ]
  };

  // Combine all questions into a single array for now
  let quizQuestions = [
    ...quizData.singleBulb,
    ...quizData.rgbBulb
  ];

  // Analytics object
  let analytics = {
    categoryPerformance: {},
    difficultyPerformance: {},
    timePerQuestion: [],
    averageTimePerQuestion: 0,
    totalTimeTaken: 0,
    questionsAnswered: 0,
    correctByCategory: {},
    totalByCategory: {},
    correctByDifficulty: {},
    totalByDifficulty: {},
  };

  // QUIZ STATE VARS
  let currentQuestionIndex = 0;
  let score = 0;
  let answersDisabled = false;
  let timerInterval;
  let timeLeft = 15;
  let questionStartTime = 0;

  // Set initial values safely
  if (totalQuestionsSpan) totalQuestionsSpan.textContent = quizQuestions.length;
  const maxScoreSpan = document.getElementById("max-score");
  if (maxScoreSpan) maxScoreSpan.textContent = quizQuestions.length;

  // Track selected category and difficulty
  let selectedCategory = "singleBulb";
  let selectedDifficulty = "all";

  // Listen for category radio changes
  document.querySelectorAll('input[name="category"]').forEach(radio => {
    radio.addEventListener("change", function (e) {
      selectedCategory = e.target.value;
    });
  });

  // Listen for difficulty radio changes
  document.querySelectorAll('input[name="difficulty"]').forEach(radio => {
    radio.addEventListener("change", function (e) {
      selectedDifficulty = e.target.value;
    });
  });

  function getQuestionsByCategoryAndDifficulty(category, difficulty) {
    let questions = quizData[category] || [];
    if (difficulty === "all") return questions;
    return questions.filter(q => q.difficulty === difficulty);
  }

  function startQuiz() {
    analytics = {
      categoryPerformance: {},
      difficultyPerformance: {},
      timePerQuestion: [],
      averageTimePerQuestion: 0,
      totalTimeTaken: 0,
      questionsAnswered: 0,
      correctByCategory: {},
      totalByCategory: {},
      correctByDifficulty: {},
      totalByDifficulty: {},
    };

    currentQuestionIndex = 0;
    score = 0;
    if (scoreSpan) scoreSpan.textContent = 0;

    // Use the new filter
    quizQuestions = getQuestionsByCategoryAndDifficulty(selectedCategory, selectedDifficulty);

    if (totalQuestionsSpan) totalQuestionsSpan.textContent = quizQuestions.length;
    const maxScoreSpan = document.getElementById("max-score");
    if (maxScoreSpan) maxScoreSpan.textContent = quizQuestions.length;

    startScreen.classList.remove("active");
    setTimeout(() => {
      quizScreen.classList.add("active");
      showQuestion();
    }, 300);
  }

  function showQuestion() {
    answersDisabled = false;
    resetTimer();

    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (currentQuestionSpan) currentQuestionSpan.textContent = currentQuestionIndex + 1;
    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    if (progressBar) progressBar.style.width = progressPercent + "%";
    if (questionText) questionText.textContent = currentQuestion.question;

    // Update category badge
    const categoryBadge = document.getElementById("current-category");
    if (categoryBadge) {
      categoryBadge.textContent = currentQuestion.category || "";
    }

    if (answersContainer) answersContainer.innerHTML = "";

    currentQuestion.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("answer-btn");
      button.dataset.correct = answer.correct;
      button.dataset.index = index;

      // Add letter indicators (A, B, C, D)
      const letterIndicator = document.createElement("span");
      letterIndicator.textContent = String.fromCharCode(65 + index) + ": ";
      letterIndicator.style.marginRight = "8px";
      letterIndicator.style.opacity = "0.7";
      button.prepend(letterIndicator);

      button.addEventListener("click", selectAnswer);

      button.style.opacity = "0";
      button.style.transform = "translateY(20px)";
      answersContainer.appendChild(button);

      setTimeout(() => {
        button.style.transition = "all 0.3s ease";
        button.style.opacity = "1";
        button.style.transform = "translateY(0)";
      }, 100 * index);
    });

    questionStartTime = Date.now();

    const category = currentQuestion.category || "";
    const difficulty = currentQuestion.difficulty || "easy";

    if (!analytics.totalByCategory[category]) {
      analytics.totalByCategory[category] = 0;
      analytics.correctByCategory[category] = 0;
    }
    if (!analytics.totalByDifficulty[difficulty]) {
      analytics.totalByDifficulty[difficulty] = 0;
      analytics.correctByDifficulty[difficulty] = 0;
    }
    analytics.totalByCategory[category]++;
    analytics.totalByDifficulty[difficulty]++;

    startTimer();
  }

  function startTimer() {
    timeLeft = 15;
    if (timerElement) timerElement.textContent = timeLeft;
    timerInterval = setInterval(() => {
      timeLeft--;
      if (timerElement) timerElement.textContent = timeLeft;
      if (timeLeft <= 5 && timerElement) {
        timerElement.style.color = "#f72585";
      } else if (timerElement) {
        timerElement.style.color = "";
      }
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timeOut();
      }
    }, 1000);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    if (timerElement) timerElement.style.color = "";
  }

  function timeOut() {
    answersDisabled = true;
    Array.from(answersContainer.children).forEach((button) => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
    });
    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
      } else {
        showResults();
      }
    }, 1500);
  }

  function selectAnswer(event) {
    if (answersDisabled) return;
    answersDisabled = true;
    resetTimer();

    const selectedButton = event.target.closest(".answer-btn");
    const isCorrect = selectedButton.dataset.correct === "true";

    answersContainer.querySelectorAll(".answer-btn").forEach((button) => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      } else if (button === selectedButton) {
        button.classList.add("incorrect");
      }
      button.style.pointerEvents = "none";
    });

    const timeSpent = (Date.now() - questionStartTime) / 1000;
    analytics.timePerQuestion.push(timeSpent);
    analytics.totalTimeTaken += timeSpent;
    analytics.questionsAnswered++;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const category = currentQuestion.category || "";
    const difficulty = currentQuestion.difficulty || "easy";

    if (isCorrect) {
      score += 5;
      if (scoreSpan) scoreSpan.textContent = score;
      analytics.correctByCategory[category]++;
      analytics.correctByDifficulty[difficulty]++;
      createConfetti(selectedButton);
    } else {
      score -= 5;
      if (score < 0) score = 0;
      if (scoreSpan) scoreSpan.textContent = score;
    }

    setTimeout(() => {
      currentQuestionIndex++;
      const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
      if (progressBar) progressBar.style.width = progressPercent + "%";
      if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
      } else {
        showResults();
      }
    }, 1500);
  }

  function createConfetti(button) {
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement("div");
      const size = Math.random() * 8 + 4;
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      confetti.style.backgroundColor = getRandomColor();
      confetti.style.position = "absolute";
      confetti.style.borderRadius = "50%";
      confetti.style.zIndex = "1000";
      const rect = button.getBoundingClientRect();
      const containerRect = quizScreen.getBoundingClientRect();
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;
      confetti.style.left = `${x}px`;
      confetti.style.top = `${y}px`;
      quizScreen.appendChild(confetti);
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 5 + 3;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      animate(confetti, vx, vy, 0, 0.1, 1);
    }
  }

  function animate(confetti, vx, vy, rotation, gravity, opacity) {
    let x = parseInt(confetti.style.left);
    let y = parseInt(confetti.style.top);
    x += vx;
    y += vy;
    vy += gravity;
    opacity -= 0.02;
    rotation += 5;
    confetti.style.left = `${x}px`;
    confetti.style.top = `${y}px`;
    confetti.style.opacity = opacity;
    confetti.style.transform = `rotate(${rotation}deg)`;
    if (opacity > 0) {
      requestAnimationFrame(() =>
        animate(confetti, vx, vy, rotation, gravity, opacity)
      );
    } else {
      confetti.remove();
    }
  }

  function getRandomColor() {
    const colors = [
      "#4361ee",
      "#3f8efc",
      "#4cc9f0",
      "#f72585",
      "#7209b7",
      "#3a0ca3",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function showResults() {
    resetTimer();
    if (analytics.questionsAnswered > 0) {
      analytics.averageTimePerQuestion =
        analytics.totalTimeTaken / analytics.questionsAnswered;
    }
    Object.keys(analytics.totalByCategory).forEach((category) => {
      analytics.categoryPerformance[category] =
        (analytics.correctByCategory[category] /
          analytics.totalByCategory[category]) *
        100;
    });
    Object.keys(analytics.totalByDifficulty).forEach((difficulty) => {
      analytics.difficultyPerformance[difficulty] =
        (analytics.correctByDifficulty[difficulty] /
          analytics.totalByDifficulty[difficulty]) *
        100;
    });
    quizScreen.classList.remove("active");
    setTimeout(() => {
      resultScreen.classList.add("active");
      if (finalScoreSpan) finalScoreSpan.textContent = score;
      displayAnalytics();
      const percentage = (score / quizQuestions.length) * 100;
      if (resultMessage) {
        if (percentage === 100) {
          resultMessage.textContent = "Outstanding! You're a true expert!";
        } else if (percentage >= 80) {
          resultMessage.textContent = "Great job! Excellent knowledge!";
        } else if (percentage >= 60) {
          resultMessage.textContent = "Good effort! Keep improving!";
        } else if (percentage >= 40) {
          resultMessage.textContent = "Not bad! More practice will help!";
        } else {
          resultMessage.textContent = "Keep learning! You'll get better!";
        }
      }
    }, 300);
  }

  function displayAnalytics() {
    const categoryAnalyticsEl = document.getElementById("category-analytics");
    const difficultyAnalyticsEl = document.getElementById("difficulty-analytics");
    const timeAnalyticsEl = document.getElementById("time-analytics");
    if (categoryAnalyticsEl) {
      let categoryHTML = "";
      Object.keys(analytics.categoryPerformance).forEach((category) => {
        const percent = Math.round(analytics.categoryPerformance[category]);
        const correct = analytics.correctByCategory[category];
        const total = analytics.totalByCategory[category];
        categoryHTML += `
          <div class="analytics-item">
            <div class="analytics-label">${category}</div>
            <div class="analytics-bar-container">
              <div class="analytics-bar" style="width: ${percent}%"></div>
              <div class="analytics-value">${correct}/${total} (${percent}%)</div>
            </div>
          </div>
        `;
      });
      categoryAnalyticsEl.innerHTML =
        categoryHTML || "No category data available";
    }
    if (difficultyAnalyticsEl) {
      let difficultyHTML = "";
      Object.keys(analytics.difficultyPerformance).forEach((difficulty) => {
        const percent = Math.round(analytics.difficultyPerformance[difficulty]);
        const correct = analytics.correctByDifficulty[difficulty];
        const total = analytics.totalByDifficulty[difficulty];
        difficultyHTML += `
          <div class="analytics-item">
            <div class="analytics-label">${
              difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
            }</div>
            <div class="analytics-bar-container">
              <div class="analytics-bar" style="width: ${percent}%"></div>
              <div class="analytics-value">${correct}/${total} (${percent}%)</div>
            </div>
          </div>
        `;
      });
      difficultyAnalyticsEl.innerHTML =
        difficultyHTML || "No difficulty data available";
    }
    if (timeAnalyticsEl) {
      const avgTime = analytics.averageTimePerQuestion.toFixed(1);
      const fastestTime = Math.min(...analytics.timePerQuestion).toFixed(1);
      const slowestTime = Math.max(...analytics.timePerQuestion).toFixed(1);
      timeAnalyticsEl.innerHTML = `
        <div class="analytics-card">
          <div class="analytics-title">Time Performance</div>
          <div class="time-stats">
            <div class="time-stat">
              <div class="time-value">${avgTime}s</div>
              <div class="time-label">Average</div>
            </div>
            <div class="time-stat">
              <div class="time-value">${fastestTime}s</div>
              <div class="time-label">Fastest</div>
            </div>
            <div class="time-stat">
              <div class="time-value">${slowestTime}s</div>
              <div class="time-label">Slowest</div>
            </div>
          </div>
        </div>
     `;
    }
  }

  function restartQuiz() {
    resultScreen.classList.remove("active");
    setTimeout(() => {
      startQuiz();
    }, 300);
  }

  function shareResults() {
    const text = `I scored ${score} out of ${quizQuestions.length} on Color Vision Simulator Quizzes! Can you beat my score?`;
    if (navigator.share) {
      navigator
        .share({
          title: "My Quiz Results",
          text: text,
          url: window.location.href,
        })
        .catch((err) => {
          fallbackShare(text);
        });
    } else {
      fallbackShare(text);
    }
  }

  function fallbackShare(text) {
    alert("Share this result:\n\n" + text);
  }

  // Save group score
  function saveGroupScore() {
    const groupNameInput = document.getElementById("group-name");
    const saveMsg = document.getElementById("save-score-msg");
    let groupName = groupNameInput.value.trim();
    if (!groupName) {
      saveMsg.textContent = "Please enter a group name!";
      saveMsg.style.color = "red";
      return;
    }
    // Get scores from localStorage
    let scores = JSON.parse(localStorage.getItem("groupScores") || "[]");
    // Add or update score for this group
    let found = false;
    scores = scores.map(s => {
      if (s.name.toLowerCase() === groupName.toLowerCase()) {
        found = true;
        if (score > s.score) s.score = score; // Only update if higher
        return s;
      }
      return s;
    });
    if (!found) scores.push({ name: groupName, score: score });
    // Sort descending
    scores.sort((a, b) => b.score - a.score);
    // Save back
    localStorage.setItem("groupScores", JSON.stringify(scores));
    saveMsg.textContent = "Score saved!";
    saveMsg.style.color = "green";
    groupNameInput.value = "";
  }

  // Show leaderboard on start screen
  function showLeaderboard() {
    const leaderboard = document.getElementById("leaderboard");
    const list = document.getElementById("leaderboard-list");
    let scores = JSON.parse(localStorage.getItem("groupScores") || "[]");
    if (scores.length === 0) {
      leaderboard.style.display = "none";
      return;
    }
    leaderboard.style.display = "block";
    list.innerHTML = "";
    scores.slice(0, 5).forEach((s, i) => {
      const li = document.createElement("li");
      li.textContent = `${s.name} - ${s.score}`;
      list.appendChild(li);
    });
  }

  if (startButton) startButton.addEventListener("click", startQuiz);
  if (restartButton) restartButton.addEventListener("click", restartQuiz);
  if (shareButton) shareButton.addEventListener("click", shareResults);
  if (backButton) {
    backButton.addEventListener("click", function () {
      resultScreen.classList.remove("active");
      setTimeout(() => {
        startScreen.classList.add("active");
        showLeaderboard();
      }, 300);
    });
  }

  // Add event listener for save score button (only once)
  const saveScoreBtn = document.getElementById("save-score-btn");
  if (saveScoreBtn) {
    saveScoreBtn.addEventListener("click", saveGroupScore);
  }

  // Show leaderboard on start screen load
  showLeaderboard();
});
