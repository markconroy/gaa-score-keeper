const scores = document.querySelectorAll('.score');
const result = document.querySelector('.result p');
const clockButton = document.querySelector('.time__button');
const clockTime = document.querySelector('.time__time');
const resetAllButton = document.querySelector('.action__button--reset-all');
const pointsForGoal = 3;
let team1ScoreAmount = 0;
let team2ScoreAmount = 0;
let team1Name = 'Team 1';
let team2Name = 'Team 2';

scores.forEach(score => {
  const addGoalButton = score.querySelector('.score__item--goals .score__button--add');
  const addPointButton = score.querySelector('.score__item--points .score__button--add');
  const removeGoalButton = score.querySelector('.score__item--goals .score__button--remove');
  const removePointButton = score.querySelector('.score__item--points .score__button--remove');
  const totalPointsContainer = score.querySelector('.score__total-points-amount');
  let goalsPlusPointsCombinedAmount = parseInt(score.querySelector('.score__total-points-amount').textContent);

  const numberOfGoalsContainer = score.querySelector('.score__item--goals');
  let numberOfGoals = parseInt(numberOfGoalsContainer.querySelector('.score__number').textContent);

  const numberOfPointsContainer = score.querySelector('.score__item--points');
  let numberOfPoints = parseInt(numberOfPointsContainer.querySelector('.score__number').textContent);

  let teamContainer = score.closest('.team');
  const team = teamContainer.dataset.teamIndex;
  let teamNameTextArea = teamContainer.querySelector('.team__name');


  teamNameTextArea.addEventListener('input', () => {
    if (team == 1) {
      team1Name = teamContainer.querySelector('.team__name').textContent;
      document.querySelector('.game-title__team--1').textContent = team1Name;
    } else {
      team2Name = teamContainer.querySelector('.team__name').textContent;
      document.querySelector('.game-title__team--2').textContent = team2Name;
    }
  });

  function updateTeamScoreAmount() {
    if (team == 1) {
      team1ScoreAmount = goalsPlusPointsCombinedAmount;
    } else {
      team2ScoreAmount = goalsPlusPointsCombinedAmount;
    }
    if (team1ScoreAmount == team2ScoreAmount) {
      result.textContent = 'Draw Match';
    }
    else if (team1ScoreAmount > team2ScoreAmount) {
      result.textContent = `${team1Name} is winning by ${team1ScoreAmount - team2ScoreAmount} points.`;
    }
    else {
      result.textContent = `${team2Name} is winning by ${team2ScoreAmount - team1ScoreAmount} points.`;
    }
  }

  function goalOrGoalsText() {
    if (numberOfGoals == 1) {
      numberOfGoalsContainer.querySelector('.score__text').textContent = "Goal";
    } else {
      numberOfGoalsContainer.querySelector('.score__text').textContent = "Goals";
    }
  }

  function pointOrPointsText() {
    if (numberOfPoints == 1) {
      numberOfPointsContainer.querySelector('.score__text').textContent = "Point";
    } else {
      numberOfPointsContainer.querySelector('.score__text').textContent = "Points";
    }
  }

  addGoalButton.addEventListener('click', () => {
    numberOfGoals = numberOfGoals + 1;
    numberOfGoalsContainer.querySelector('.score__number').textContent = numberOfGoals;

    goalsPlusPointsCombinedAmount = goalsPlusPointsCombinedAmount + pointsForGoal;
    totalPointsContainer.textContent = goalsPlusPointsCombinedAmount;

    // Once a goal has been scored, remove the disabled attribute from the remove goal button.
    if (score.querySelector('.score__item--goals .score__number').textContent > 0) {
      score.querySelector('.score__item--goals .score__button--remove').removeAttribute('disabled');
    }

    updateTeamScoreAmount();
    goalOrGoalsText();

  });

  addPointButton.addEventListener('click', () => {
    numberOfPoints = numberOfPoints + 1;
    numberOfPointsContainer.querySelector('.score__number').textContent = numberOfPoints;

    goalsPlusPointsCombinedAmount = goalsPlusPointsCombinedAmount + 1;
    totalPointsContainer.textContent = goalsPlusPointsCombinedAmount;
    // Once a point has been scored, remove the disabled attribute from the remove points button.
    if (score.querySelector('.score__item--points .score__number').textContent > 0) {
      score.querySelector('.score__item--points .score__button--remove').removeAttribute('disabled');
    }

    updateTeamScoreAmount();
    pointOrPointsText();

  });

  removeGoalButton.addEventListener('click', () => {
    if (parseInt(score.querySelector('.score__item--goals .score__number').textContent) > 0) {
      numberOfGoals = numberOfGoals - 1;
      numberOfGoalsContainer.querySelector('.score__number').textContent = numberOfGoals;
    }

    if (goalsPlusPointsCombinedAmount < 3) {
      totalPointsContainer.textContent = 0;
    } else {
      goalsPlusPointsCombinedAmount = goalsPlusPointsCombinedAmount - pointsForGoal;
      totalPointsContainer.textContent = goalsPlusPointsCombinedAmount;
    }

    // If no goals have been scored, disable the remove goal button.
    if (score.querySelector('.score__item--goals .score__number').textContent == 0) {
      score.querySelector('.score__item--goals .score__button--remove').setAttribute('disabled', true);
    }

    updateTeamScoreAmount();
    goalOrGoalsText();

  });

  removePointButton.addEventListener('click', () => {
    if (parseInt(score.querySelector('.score__item--points .score__number').textContent) > 0) {
      numberOfPoints = numberOfPoints - 1;
      numberOfPointsContainer.querySelector('.score__number').textContent = numberOfPoints;
    }

    if (goalsPlusPointsCombinedAmount == 0) {
      totalPointsContainer.textContent = 0;
    } else {
      goalsPlusPointsCombinedAmount = goalsPlusPointsCombinedAmount - 1;
      totalPointsContainer.textContent = goalsPlusPointsCombinedAmount;
    }

    // If no points have been scored, disable the remove points button.
    if (score.querySelector('.score__item--points .score__number').textContent == 0) {
      score.querySelector('.score__item--points .score__button--remove').setAttribute('disabled', true);
    }

    updateTeamScoreAmount();
    pointOrPointsText();

  });
});

// Timer
let time = 0;
let isClockRunning = false;
let timer;

function convertTimeToHMS(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  const secondsLeft = seconds % 60;
  return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes }:${secondsLeft < 10 ? '0' + secondsLeft : secondsLeft}`;
}

clockButton.addEventListener('click', () => {
  if (isClockRunning) {
    clearInterval(timer);
    isClockRunning = false;
    clockButton.textContent = 'Start Timer';
    clockButton.style.backgroundColor = 'var(--color-success)';
  } else {
    timer = setInterval(() => {
      time++;
      clockTime.textContent = convertTimeToHMS(time);
    }, 1000);
    isClockRunning = true;
    clockButton.textContent = 'Stop Timer';
    clockButton.style.backgroundColor = 'var(--color-danger)';
  }
});

// Reset all
function resetAll() {
  scores.forEach(score => {
    score.querySelector('.score__item--goals .score__number').textContent = 0;
    score.querySelector('.score__item--points .score__number').textContent = 0;
    score.querySelector('.score__total-points-amount').textContent = 0;
    score.querySelector('.score__item--goals .score__button--remove').setAttribute('disabled', true);
    score.querySelector('.score__item--points .score__button--remove').setAttribute('disabled', true);
    score.querySelector('.score__item--goals .score__text').textContent = 'Goals';
    score.querySelector('.score__item--points .score__text').textContent = 'Points';
  });
  team1ScoreAmount = 0;
  team2ScoreAmount = 0;
  result.textContent = 'No scores yet!';
  time = 0;
  clockTime.textContent = '00:00:00';
  clearInterval(timer);
  isClockRunning = false;
  clockButton.textContent = 'Start Timer';
}
resetAllButton.addEventListener('click', () => {
  // Ask for confirmation before resetting all scores, just in case.
  if (confirm('Are you sure?')) {
    resetAll();
  }
});
