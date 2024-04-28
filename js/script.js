const scores = document.querySelectorAll('.score');
const result = document.querySelector('.result p');
const clockButton = document.querySelector('.time__button--start');
const clockResetButton = document.querySelector('.time__button--reset');
const clockTime = document.querySelector('.time__time');
const resetAllButton = document.querySelector('.action__button--reset-all');
const pointsForGoal = 3;
let team1NumberOfGoals = 0;
let team2NumberOfGoals = 0;
let team1NumberOfPoints = 0;
let team2NumberOfPoints = 0;
let team1TotalPoints = 0;
let team2TotalPoints = 0;
let team1Name = 'Team 1';
let team2Name = 'Team 2';

scores.forEach(score => {
  const addGoalButton = score.querySelector('.score__item--goals .score__button--add');
  const addPointButton = score.querySelector('.score__item--points .score__button--add');
  const removeGoalButton = score.querySelector('.score__item--goals .score__button--remove');
  const removePointButton = score.querySelector('.score__item--points .score__button--remove');
  const totalPointsContainer = score.querySelector('.score__total-points-amount');

  const numberOfGoalsContainer = score.querySelector('.score__item--goals');
  let numberOfGoals = 0;

  const numberOfPointsContainer = score.querySelector('.score__item--points');
  let numberOfPoints = 0;

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

  function updateAddAGoal() {
    if (team == 1) {
      team1NumberOfGoals = team1NumberOfGoals + 1;
      numberOfGoals = team1NumberOfGoals;
    } else {
      team2NumberOfGoals = team2NumberOfGoals + 1;
      numberOfGoals = team2NumberOfGoals;
    }
  }

  function updateAddAPoint() {
    if (team == 1) {
      team1NumberOfPoints = team1NumberOfPoints + 1;
      numberOfPoints = team1NumberOfPoints;
    } else {
      team2NumberOfPoints = team2NumberOfPoints + 1;
      numberOfPoints = team2NumberOfPoints;
    }
  }

  function updateRemoveAGoal() {
    if (team == 1) {
      team1NumberOfGoals = team1NumberOfGoals - 1;
      numberOfGoals = team1NumberOfGoals;
    } else {
      team2NumberOfGoals = team2NumberOfGoals - 1;
      numberOfGoals = team2NumberOfGoals;
    }
  }

  function updateRemoveAPoint() {
    if (team == 1) {
      team1NumberOfPoints = team1NumberOfPoints - 1;
      numberOfPoints = team1NumberOfPoints;
    } else {
      team2NumberOfPoints = team2NumberOfPoints - 1;
      numberOfPoints = team2NumberOfPoints;
    }
  }

  function updateTeamTotalPoints() {
    if (team == 1) {
      team1TotalPoints = (team1NumberOfGoals * pointsForGoal) + team1NumberOfPoints;
      totalPointsContainer.textContent = team1TotalPoints;
    } else {
      team2TotalPoints = (team2NumberOfGoals * pointsForGoal) + team2NumberOfPoints;
      totalPointsContainer.textContent = team2TotalPoints;
    }
    if (team1TotalPoints == team2TotalPoints) {
      result.textContent = 'Draw Match';
    }
    else if (team1TotalPoints > team2TotalPoints) {
      result.textContent = `${team1Name} is winning by ${team1TotalPoints - team2TotalPoints} points.`;
    }
    else {
      result.textContent = `${team2Name} is winning by ${team2TotalPoints - team1TotalPoints} points.`;
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
    updateAddAGoal();
    numberOfGoalsContainer.querySelector('.score__number').textContent = numberOfGoals;

    // Once a goal has been scored, remove the disabled attribute from the remove goal button.
    if (score.querySelector('.score__item--goals .score__number').textContent > 0) {
      score.querySelector('.score__item--goals .score__button--remove').removeAttribute('disabled');
    }

    updateTeamTotalPoints();
    goalOrGoalsText();

  });

  addPointButton.addEventListener('click', () => {
    updateAddAPoint();
    numberOfPointsContainer.querySelector('.score__number').textContent = numberOfPoints;

    // Once a point has been scored, remove the disabled attribute from the remove points button.
    if (score.querySelector('.score__item--points .score__number').textContent > 0) {
      score.querySelector('.score__item--points .score__button--remove').removeAttribute('disabled');
    }

    updateTeamTotalPoints();
    pointOrPointsText();

  });

  removeGoalButton.addEventListener('click', () => {
    if (parseInt(score.querySelector('.score__item--goals .score__number').textContent) > 0) {
      updateRemoveAGoal();
      numberOfGoalsContainer.querySelector('.score__number').textContent = numberOfGoals;
    }

    // If no goals have been scored, disable the remove goal button.
    if (score.querySelector('.score__item--goals .score__number').textContent == 0) {
      score.querySelector('.score__item--goals .score__button--remove').setAttribute('disabled', true);
    }

    updateTeamTotalPoints();
    goalOrGoalsText();

  });

  removePointButton.addEventListener('click', () => {
    if (parseInt(score.querySelector('.score__item--points .score__number').textContent) > 0) {
      updateRemoveAPoint();
      numberOfPointsContainer.querySelector('.score__number').textContent = numberOfPoints;
    }

    // If no points have been scored, disable the remove points button.
    if (score.querySelector('.score__item--points .score__number').textContent == 0) {
      score.querySelector('.score__item--points .score__button--remove').setAttribute('disabled', true);
    }

    updateTeamTotalPoints();
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

function resetTimer() {
  time = 0;
  clockTime.textContent = '00:00:00';
  clearInterval(timer);
  isClockRunning = false;
  clockButton.textContent = 'Start Timer';
  clockButton.style.backgroundColor = 'var(--color-success)';
}

clockResetButton.addEventListener('click', () => {
  if (confirm('Are you sure?')) {
    resetTimer();
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
    team1NumberOfGoals = 0;
    team1NumberOfPoints = 0;
    team2NumberOfGoals = 0;
    team2NumberOfPoints = 0;
    team1TotalPoints = 0;
    team2TotalPoints = 0;
  });
  team1TotalPoints = 0;
  team2TotalPoints = 0;
  result.textContent = 'No scores yet!';
  resetTimer();
}

resetAllButton.addEventListener('click', () => {
  // Ask for confirmation before resetting all scores, just in case.
  if (confirm('Are you sure?')) {
    resetAll();
  }
});
