// ===================================================================
// PROGRAM CONFIGURATION — 13-Week Periodized Program
// ===================================================================
// Day 1: Cleans, Back Squats
// Day 2: Overhead Press, Weighted Strict Pull-Ups, Bent Over Barbell Row, Dips
// Day 3: Conventional Deadlifts, Bulgarian Split Squats
// Day 4: Bench Press, Rows (Chest Supported T-Bar or Seal Row), Weighted Strict Pull-Ups, Dips
// ===================================================================

const PROGRAM_START = new Date('2026-09-21T00:00:00'); // Monday
const TOTAL_WEEKS = 13;
const DAYS_PER_WEEK = 4;
// Days are numbered 1-4, no specific weekday assignment
const SCHEDULE_OFFSETS = [0, 1, 2, 3]; // just sequential for date display

const PHASES = [
  { name: "Hypertrophy Base", weeks: [1,2,3,4], mainReps: "8-9", mainSets: 4, accReps: "10-12", accSets: 3, color: "var(--phase-hyp)", dim: "var(--phase-hyp-dim)" },
  { name: "Strength Building", weeks: [5,6,7,8], mainReps: "7-8", mainSets: 4, accReps: "8-10", accSets: 3, color: "var(--phase-str)", dim: "var(--phase-str-dim)" },
  { name: "Strength Peak", weeks: [9,10,11,12], mainReps: "6-7", mainSets: 4, accReps: "6-8", accSets: 3, color: "var(--phase-peak)", dim: "var(--phase-peak-dim)" },
  { name: "Deload", weeks: [13], mainReps: "8-10", mainSets: 3, accReps: "10-12", accSets: 2, color: "var(--phase-deload)", dim: "var(--phase-deload-dim)", note: "Use 60–70% of working weight. Focus on form & recovery." },
];

const DAY_TEMPLATES = [
  {
    name: "Day 1 — Cleans & Back Squats",
    shortName: "Clean & Squat",
    exercises: [
      { name: "Cleans", rank: null, type: "main" },
      { name: "Back Squats", rank: 1, type: "main" },
    ]
  },
  {
    name: "Day 2 — Press, Pulls & Dips",
    shortName: "Press & Pull",
    exercises: [
      { name: "Bench Press", rank: 4, type: "main" },
      { name: "Overhead Press", rank: 5, type: "main" },
      { name: "Weighted Strict Pull-Ups", rank: 2, type: "main" },
      { name: "Bent Over Barbell Row", rank: 7, type: "main" },
      { name: "Dips", rank: 6, type: "main" },
    ]
  },
  {
    name: "Day 3 — Deadlifts & Bulgarian Split Squats",
    shortName: "DL & Split",
    exercises: [
      { name: "Conventional Deadlifts", rank: 3, type: "main" },
      { name: "Bulgarian Split Squats", rank: 10, type: "main" },
    ]
  },
  {
    name: "Day 4 — Incline, Rows, Pull-Ups & Dips",
    shortName: "Incline & Rows",
    exercises: [
      { name: "Incline Bench Press", rank: 18, type: "main" },
      { name: "Rows (Chest Supported T-Bar or Seal Row)", rank: 13, type: "main" },
      { name: "Weighted Strict Pull-Ups", rank: 2, type: "main" },
      { name: "Dips", rank: 6, type: "main" },
    ]
  },
];

// Full exercise pool for swaps
const ALL_EXERCISES = [
  { name: "Back Squats", rank: 1, category: "Lower" },
  { name: "Weighted Strict Pull-Ups", rank: 2, category: "Upper Pull" },
  { name: "Conventional Deadlifts", rank: 3, category: "Lower" },
  { name: "Bench Press", rank: 4, category: "Upper Push" },
  { name: "Overhead Press", rank: 5, category: "Upper Push" },
  { name: "Dips", rank: 6, category: "Upper Push" },
  { name: "Bent Over Barbell Row", rank: 7, category: "Upper Pull" },
  { name: "Front Squat", rank: 8, category: "Lower" },
  { name: "Standing Ab Wheel", rank: 9, category: "Core" },
  { name: "Bulgarian Split Squats", rank: 10, category: "Lower" },
  { name: "Deficit Snatch Grip Deadlift", rank: 11, category: "Lower" },
  { name: "Strict Muscle Up", rank: 12, category: "Upper Body" },
  { name: "Rows (Chest Supported T-Bar or Seal Row)", rank: 13, category: "Upper Pull" },
  { name: "Nordic Curl", rank: 14, category: "Lower" },
  { name: "Romanian Deadlift", rank: 15, category: "Lower" },
  { name: "Legless Rope Climb", rank: 16, category: "Upper Pull" },
  { name: "Barbell Z Press", rank: 17, category: "Upper Push" },
  { name: "Incline Bench Press", rank: 18, category: "Upper Push" },
  { name: "L-Sit", rank: 19, category: "Core" },
  { name: "Kettlebell Towel Curls", rank: 20, category: "Upper Pull" },
  { name: "Incline EZ Bar Skull Crushers", rank: 21, category: "Upper Push" },
  { name: "Standing Calf Raise", rank: 22, category: "Lower" },
  { name: "Weighted Back Extensions", rank: 23, category: "Lower" },
  { name: "Barbell Lunges", rank: 24, category: "Lower" },
  { name: "Trap Bar Squat or Zercher Squat", rank: 25, category: "Lower" },
  { name: "Cleans", rank: null, category: "Full Body" },
];

// Exercises that must NEVER share a day
const CONFLICT_GROUPS = [
  ["Back Squats", "Conventional Deadlifts"],
  ["Cleans", "Conventional Deadlifts"],
  ["Back Squat", "Conventional Deadlift"],
  ["Cleans", "Conventional Deadlift"],
];

function getWorkout(week, dayIdx) {
  const phase = PHASES.find(p => p.weeks.includes(week));
  const template = DAY_TEMPLATES[dayIdx];

  // Check for user customizations first
  const customKey = `ironlog_custom_w${week}_d${dayIdx}`;
  const customized = localStorage.getItem(customKey);
  if (customized) {
    try {
      const customExercises = JSON.parse(customized);
      // Reapply current phase's sets/reps
      const exercises = customExercises.map(ex => ({
        ...ex,
        sets: ex.type === 'main' ? phase.mainSets : phase.accSets,
        repsRange: ex.type === 'main' ? phase.mainReps : phase.accReps,
      }));
      return {
        week, dayIdx, dayName: template.name, shortName: template.shortName,
        phase: phase.name, phaseNote: phase.note || null, exercises, customized: true
      };
    } catch(e) { /* fall through to default */ }
  }

  const exercises = template.exercises.map(ex => ({
    name: ex.name,
    rank: ex.rank,
    type: ex.type || "main",
    sets: (ex.type === "accessory") ? phase.accSets : phase.mainSets,
    repsRange: (ex.type === "accessory") ? phase.accReps : phase.mainReps,
  }));

  return {
    week, dayIdx, dayName: template.name, shortName: template.shortName,
    phase: phase.name, phaseNote: phase.note || null, exercises
  };
}

// Get the date for a specific week + day
function getWorkoutDate(week, dayIdx) {
  const d = new Date(PROGRAM_START);
  d.setDate(d.getDate() + (week - 1) * 7 + SCHEDULE_OFFSETS[dayIdx]);
  return d;
}

// ===================================================================
// ESTIMATED 1RM (Epley Formula)
// ===================================================================
function calcE1RM(weight, reps) {
  if (!weight || !reps || reps <= 0 || weight <= 0) return null;
  if (reps === 1) return weight;
  return Math.round(weight * (1 + reps / 30));
}

// ===================================================================
// STATE
// ===================================================================
let currentWeek = 1;
let currentDay = 0;
let currentView = 'workout';
let workoutData = {};
let timerInterval = null;
let timerSeconds = 0;

// Synced data from Google Sheets — flat array of row objects
let sheetData = [];

const ROUTINE_VERSION = 'v2_fixed_user_routine';

// ===================================================================
// GOOGLE SHEETS DATABASE
// ===================================================================
const DB_URL = "https://script.google.com/macros/s/AKfycbwyj2pbO4NWWbawqIBNFNyzVwNM9cQvrCLXsKOcYkgEuFpndYycSrsiS-OSuKAIxwsu/exec";

// ===================================================================
// INIT
// ===================================================================
async function init() {
  if (localStorage.getItem('ironlog_routine_version') !== ROUTINE_VERSION) {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('ironlog_custom_') || key.startsWith('ironlog_autosave_')) {
        localStorage.removeItem(key);
      }
    });
    localStorage.setItem('ironlog_routine_version', ROUTINE_VERSION);
  }
  
  detectCurrentWeek();
  
  // Load data from Google Sheets if configured
  if (DB_URL !== "YOUR_WEBHOOK_URL_HERE") {
    try {
      showToast("Syncing with Google Sheets...");
      const response = await fetch(DB_URL);
      if (response.ok) {
        const data = await response.json();
        sheetData = data; // flat array of row objects: {date, week, day, phase, exercise, set, weight, reps, e1rm}
        // Also rebuild localStorage history for calendar/history views
        rebuildHistoryFromSheetData();
        showToast("Database synced!");
      }
    } catch (e) {
      console.error("Failed to fetch from DB:", e);
      showToast("Offline mode. Using local data.");
    }
  }

  renderWeekSelector();
  renderPhase();
  renderDayTabs();
  renderWorkout();
  loadAutoSave();
  setupViewToggle();
}

// Rebuild the ironlog_history structure from flat sheetData for calendar/history views
function rebuildHistoryFromSheetData() {
  if (!sheetData || sheetData.length === 0) return;
  
  // Group by date+day to form workout sessions
  const sessions = {};
  sheetData.forEach(row => {
    const key = `${row.date}_${row.day}`;
    if (!sessions[key]) {
      sessions[key] = {
        id: new Date(row.date).getTime(),
        date: row.date,
        week: row.week,
        dayName: row.day,
        dayIndex: getDayIndexFromName(row.day),
        phase: row.phase,
        exercises: {}
      };
    }
    const session = sessions[key];
    if (!session.exercises[row.exercise]) {
      session.exercises[row.exercise] = { name: row.exercise, sets: {} };
    }
    session.exercises[row.exercise].sets[row.set - 1] = {
      weight: row.weight,
      reps: row.reps
    };
  });

  // Convert exercises object to array
  const history = Object.values(sessions).map(s => ({
    ...s,
    exercises: Object.values(s.exercises)
  }));

  // Sort by date
  history.sort((a, b) => new Date(a.date) - new Date(b.date));
  localStorage.setItem('ironlog_history', JSON.stringify(history));
}

function getDayIndexFromName(dayName) {
  for (let i = 0; i < DAY_TEMPLATES.length; i++) {
    if (DAY_TEMPLATES[i].name === dayName) return i;
  }
  return 0;
}

// Get previous session data for an exercise from sheetData (from Google Sheets)
function getPreviousSessionData(exerciseName, setIdx) {
  if (sheetData && sheetData.length > 0) {
    // Filter to this exercise, sort by date descending, find the latest set matching setIdx
    const matching = sheetData
      .filter(r => r.exercise === exerciseName && r.set === (setIdx + 1))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    if (matching.length > 0) {
      return { weight: matching[0].weight, reps: matching[0].reps };
    }
  }

  // Fallback to localStorage history
  const history = getHistory();
  for (let i = history.length - 1; i >= 0; i--) {
    const session = history[i];
    if (session.exercises) {
      const ex = session.exercises.find(e => e.name === exerciseName);
      if (ex && ex.sets && ex.sets[setIdx]) return ex.sets[setIdx];
    }
  }
  return null;
}

// Get the most recent session's data for an exercise (all sets)
function getLastSessionForExercise(exerciseName) {
  if (sheetData && sheetData.length > 0) {
    // Find the most recent date this exercise was logged
    const matching = sheetData
      .filter(r => r.exercise === exerciseName)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    if (matching.length > 0) {
      const latestDate = matching[0].date;
      const latestSets = matching.filter(r => r.date === latestDate);
      // Find the heaviest weight used in that session
      let maxWeight = 0;
      let maxReps = 0;
      latestSets.forEach(s => {
        if (s.weight > maxWeight) {
          maxWeight = s.weight;
          maxReps = s.reps;
        }
      });
      const dateObj = new Date(latestDate);
      const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return { maxWeight, maxReps, dateStr, sets: latestSets };
    }
  }
  return null;
}

function detectCurrentWeek() {
  const now = new Date();
  const diffMs = now - PROGRAM_START;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const w = Math.floor(diffDays / 7) + 1;
  currentWeek = Math.max(1, Math.min(TOTAL_WEEKS, w));
  // Default to Day 1; user picks which day to do
  currentDay = 0;
}

// ===================================================================
// WEEK SELECTOR
// ===================================================================
function renderWeekSelector() {
  document.getElementById('weekNumber').textContent = `Week ${currentWeek} of ${TOTAL_WEEKS}`;

  const mon = getWorkoutDate(currentWeek, 0);
  const fri = getWorkoutDate(currentWeek, 3);
  const opts = { month: 'short', day: 'numeric' };
  document.getElementById('weekDates').textContent =
    `${mon.toLocaleDateString('en-US', opts)} – ${fri.toLocaleDateString('en-US', opts)}, ${fri.getFullYear()}`;

  document.getElementById('prevWeek').disabled = currentWeek <= 1;
  document.getElementById('nextWeek').disabled = currentWeek >= TOTAL_WEEKS;
}

window.changeWeek = function(delta) {
  saveAutoSave();
  currentWeek = Math.max(1, Math.min(TOTAL_WEEKS, currentWeek + delta));
  workoutData = {};
  renderWeekSelector();
  renderPhase();
  renderDayTabs();
  renderWorkout();
  loadAutoSave();
};

// ===================================================================
// PHASE
// ===================================================================
function renderPhase() {
  const phase = PHASES.find(p => p.weeks.includes(currentWeek));
  const badge = document.getElementById('phaseBadge');
  const dot = badge.querySelector('.phase-dot');
  const nameEl = document.getElementById('phaseName');
  const noteEl = document.getElementById('phaseNote');

  nameEl.textContent = phase.name;
  badge.style.background = phase.dim;
  badge.style.color = phase.color;
  badge.style.borderColor = phase.color;
  dot.style.background = phase.color;

  noteEl.textContent = phase.note || '';
  noteEl.style.display = phase.note ? 'block' : 'none';
}

// ===================================================================
// DAY TABS
// ===================================================================
function renderDayTabs() {
  const container = document.getElementById('dayTabs');
  container.innerHTML = DAY_TEMPLATES.map((tmpl, i) => {
    return `
      <button class="nav-tab ${i === currentDay ? 'active' : ''}" data-day="${i}" onclick="switchDay(${i})">
        <span class="tab-label">Day ${i + 1}</span>
        <span class="tab-sub">${tmpl.shortName}</span>
      </button>
    `;
  }).join('');
}

window.switchDay = function(dayIdx) {
  saveAutoSave();
  currentDay = dayIdx;
  workoutData = {};
  renderDayTabs();
  renderWorkout();
  loadAutoSave();
};

// ===================================================================
// VIEW TOGGLE
// ===================================================================
function setupViewToggle() {
  document.getElementById('workoutViewBtn').addEventListener('click', () => setView('workout'));
  document.getElementById('calendarViewBtn').addEventListener('click', () => setView('calendar'));
  document.getElementById('historyViewBtn').addEventListener('click', () => setView('history'));
}

function setView(view) {
  currentView = view;
  document.getElementById('workoutViewBtn').classList.toggle('active', view === 'workout');
  document.getElementById('calendarViewBtn').classList.toggle('active', view === 'calendar');
  document.getElementById('historyViewBtn').classList.toggle('active', view === 'history');
  document.getElementById('workoutView').classList.toggle('active', view === 'workout');
  document.getElementById('calendarView').classList.toggle('active', view === 'calendar');
  document.getElementById('historyView').classList.toggle('active', view === 'history');
  if (view === 'history') renderHistory();
  if (view === 'calendar') renderCalendar();
}

// ===================================================================
// RENDER WORKOUT
// ===================================================================
function renderWorkout() {
  const workout = getWorkout(currentWeek, currentDay);
  const container = document.getElementById('exerciseList');
  const dayColorVar = `var(--day${currentDay + 1})`;
  document.getElementById('progressFill').style.background = dayColorVar;

  container.innerHTML = workout.exercises.map((ex, exIdx) => {
    const rankClass = getRankBadgeClass(ex.rank);
    const cardClass = ex.type === 'main' ? (ex.rank && ex.rank <= 7 ? 'top-7' : 'main-lift') : '';
    const rankDisplay = ex.rank ? `#${ex.rank}` : '⚡';

    // Get last session data for this exercise
    const lastSession = getLastSessionForExercise(ex.name);
    let lastSessionHtml = '';
    if (lastSession) {
      const e1rm = calcE1RM(lastSession.maxWeight, lastSession.maxReps);
      lastSessionHtml = `
        <div class="last-session">
          <span class="last-session-label">Last:</span>
          <span class="last-session-value">${lastSession.maxWeight}lbs × ${lastSession.maxReps}</span>
          <span class="last-session-date">${lastSession.dateStr}</span>
          ${e1rm ? `<span class="last-session-e1rm">Est 1RM: ${e1rm}lbs</span>` : ''}
        </div>
      `;
    }

    return `
      <div class="exercise-card ${cardClass}" id="card-${exIdx}">
        <div class="exercise-header">
          <div class="exercise-info">
            <div class="rank-badge ${rankClass}">${rankDisplay}</div>
            <div>
              <div class="exercise-name">${ex.name}</div>
              <div class="exercise-meta">${ex.type === 'main' ? 'Main Lift' : 'Accessory'} · ${ex.sets} × ${ex.repsRange}</div>
            </div>
          </div>
          <div class="exercise-status">
            <span class="sets-completed" id="status-${exIdx}">0/${ex.sets}</span>
            <div class="check-icon" id="check-${exIdx}">✓</div>
            <div class="exercise-actions">
              <button class="ex-action-btn swap" onclick="openSwapModal(${exIdx})" title="Swap exercise">⇄</button>
              <button class="ex-action-btn delete" onclick="deleteExercise(${exIdx})" title="Remove exercise">✕</button>
            </div>
          </div>
        </div>
        ${lastSessionHtml}
        <div class="exercise-body">
          <div class="sets-grid">
            ${Array.from({ length: ex.sets }, (_, sIdx) => renderSetRow(exIdx, sIdx, ex)).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderSetRow(exIdx, setIdx, ex) {
  const prev = getPreviousSessionData(ex.name, setIdx);
  const prevW = prev ? prev.weight : 'lbs';
  const prevR = prev ? prev.reps : ex.repsRange;
  return `
    <div class="set-row" id="set-${exIdx}-${setIdx}">
      <span class="set-label">S${setIdx + 1}</span>
      <div class="set-input-group">
        <input type="number" class="set-input" id="weight-${exIdx}-${setIdx}"
          placeholder="${prevW}" inputmode="decimal"
          onchange="onSetChange(${exIdx}, ${setIdx})" oninput="onSetInput(${exIdx}, ${setIdx})" onfocus="this.select()">
        <span class="set-unit">lbs</span>
      </div>
      <span class="set-divider">×</span>
      <div class="set-input-group">
        <input type="number" class="set-input" id="reps-${exIdx}-${setIdx}"
          placeholder="${prevR}" inputmode="numeric"
          onchange="onSetChange(${exIdx}, ${setIdx})" oninput="onSetInput(${exIdx}, ${setIdx})" onfocus="this.select()">
        <span class="set-unit">reps</span>
      </div>
      <div class="e1rm-display" id="e1rm-${exIdx}-${setIdx}"></div>
      <button class="quick-fill-btn" onclick="quickFill(${exIdx}, ${setIdx})" title="Fill from previous">↑</button>
    </div>
  `;
}

function getRankBadgeClass(rank) {
  if (rank === null) return 'clean';
  if (rank <= 3) return 'elite';
  if (rank <= 10) return 'top';
  return 'acc';
}

// ===================================================================
// SET INPUT HANDLING
// ===================================================================

// Live update E1RM as user types
window.onSetInput = function(exIdx, setIdx) {
  const weightEl = document.getElementById(`weight-${exIdx}-${setIdx}`);
  const repsEl = document.getElementById(`reps-${exIdx}-${setIdx}`);
  const e1rmEl = document.getElementById(`e1rm-${exIdx}-${setIdx}`);
  const weight = parseFloat(weightEl.value);
  const reps = parseInt(repsEl.value);
  const e1rm = calcE1RM(weight, reps);
  if (e1rm && e1rmEl) {
    e1rmEl.textContent = `≈ ${e1rm}lb 1RM`;
    e1rmEl.classList.add('visible');
  } else if (e1rmEl) {
    e1rmEl.textContent = '';
    e1rmEl.classList.remove('visible');
  }
};

window.onSetChange = function(exIdx, setIdx) {
  const weightEl = document.getElementById(`weight-${exIdx}-${setIdx}`);
  const repsEl = document.getElementById(`reps-${exIdx}-${setIdx}`);
  const weight = weightEl.value;
  const reps = repsEl.value;

  if (!workoutData[exIdx]) workoutData[exIdx] = {};

  if (weight !== '' || reps !== '') {
    workoutData[exIdx][setIdx] = {
      weight: weight !== '' ? parseFloat(weight) : null,
      reps: reps !== '' ? parseInt(reps) : null
    };
  } else {
    delete workoutData[exIdx][setIdx];
    if (Object.keys(workoutData[exIdx]).length === 0) delete workoutData[exIdx];
  }

  updateSetRowStatus(exIdx, setIdx);
  updateExerciseStatus(exIdx);
  updateProgress();
  saveAutoSave();

  // Also trigger the E1RM display update
  window.onSetInput(exIdx, setIdx);

  if (weight !== '' && reps !== '') startRestTimer();
};

function updateSetRowStatus(exIdx, setIdx) {
  const row = document.getElementById(`set-${exIdx}-${setIdx}`);
  if (!row) return;
  const data = workoutData[exIdx]?.[setIdx];
  row.classList.toggle('completed', !!(data && data.weight != null && data.reps != null));
}

function updateExerciseStatus(exIdx) {
  const workout = getWorkout(currentWeek, currentDay);
  const ex = workout.exercises[exIdx];
  if (!ex) return;
  let completed = 0;
  for (let s = 0; s < ex.sets; s++) {
    const data = workoutData[exIdx]?.[s];
    if (data && data.weight != null && data.reps != null) completed++;
  }
  const statusEl = document.getElementById(`status-${exIdx}`);
  const checkEl = document.getElementById(`check-${exIdx}`);
  if (statusEl) statusEl.textContent = `${completed}/${ex.sets}`;
  if (checkEl) checkEl.classList.toggle('visible', completed === ex.sets);
}

function updateProgress() {
  const workout = getWorkout(currentWeek, currentDay);
  let total = 0, done = 0;
  workout.exercises.forEach((ex, exIdx) => {
    total += ex.sets;
    for (let s = 0; s < ex.sets; s++) {
      const data = workoutData[exIdx]?.[s];
      if (data && data.weight != null && data.reps != null) done++;
    }
  });
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  document.getElementById('progressValue').textContent = `${pct}%`;
  document.getElementById('progressFill').style.width = `${pct}%`;
}

// ===================================================================
// QUICK FILL
// ===================================================================
window.quickFill = function(exIdx, setIdx) {
  const workout = getWorkout(currentWeek, currentDay);
  const ex = workout.exercises[exIdx];
  const prev = getPreviousSessionData(ex.name, setIdx);

  if (prev) {
    const wEl = document.getElementById(`weight-${exIdx}-${setIdx}`);
    const rEl = document.getElementById(`reps-${exIdx}-${setIdx}`);
    if (prev.weight) wEl.value = prev.weight;
    if (prev.reps) rEl.value = prev.reps;
    window.onSetChange(exIdx, setIdx);
    showToast('Filled from last session');
  } else if (setIdx > 0 && workoutData[exIdx]?.[setIdx - 1]) {
    const above = workoutData[exIdx][setIdx - 1];
    const wEl = document.getElementById(`weight-${exIdx}-${setIdx}`);
    const rEl = document.getElementById(`reps-${exIdx}-${setIdx}`);
    if (above.weight) wEl.value = above.weight;
    if (above.reps) rEl.value = above.reps;
    window.onSetChange(exIdx, setIdx);
    showToast('Copied from set above');
  } else {
    showToast('No previous data');
  }
};

// ===================================================================
// REST TIMER
// ===================================================================
function startRestTimer(seconds = 120) {
  if (timerInterval) clearInterval(timerInterval);
  timerSeconds = seconds;
  document.getElementById('restTimer').classList.add('active');
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timerSeconds--;
    if (timerSeconds <= 0) {
      skipTimer();
      showToast('Rest complete — next set!');
      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
    } else {
      updateTimerDisplay();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const m = Math.floor(timerSeconds / 60);
  const s = timerSeconds % 60;
  document.getElementById('timerDisplay').textContent = `${m}:${s.toString().padStart(2, '0')}`;
}

window.addRestTime = function(sec) { timerSeconds += sec; updateTimerDisplay(); };

window.skipTimer = function() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = null;
  document.getElementById('restTimer').classList.remove('active');
};
// local alias
const skipTimer = window.skipTimer;

// ===================================================================
// SAVE / LOAD
// ===================================================================
window.saveWorkout = async function() {
  const workout = getWorkout(currentWeek, currentDay);
  const exercises = [];
  let hasData = false;

  workout.exercises.forEach((ex, exIdx) => {
    const sets = {};
    for (let s = 0; s < ex.sets; s++) {
      const data = workoutData[exIdx]?.[s];
      if (data && (data.weight != null || data.reps != null)) { sets[s] = data; hasData = true; }
    }
    if (Object.keys(sets).length > 0) exercises.push({ name: ex.name, sets });
  });

  if (!hasData) { showToast('Nothing to save — log some sets first'); return; }
  if (!confirm('Save this workout?')) return;

  // Build flat rows for Google Sheets (one row per set)
  const dateStr = new Date().toISOString();
  const rows = [];
  exercises.forEach(ex => {
    Object.entries(ex.sets).forEach(([setNum, data]) => {
      const weight = data.weight || 0;
      const reps = data.reps || 0;
      const e1rm = calcE1RM(weight, reps) || 0;
      rows.push({
        date: dateStr,
        week: currentWeek,
        day: workout.dayName,
        phase: workout.phase,
        exercise: ex.name,
        set: parseInt(setNum) + 1,
        weight: weight,
        reps: reps,
        e1rm: e1rm
      });
    });
  });

  const entry = {
    id: Date.now(),
    date: dateStr,
    week: currentWeek,
    dayIndex: currentDay,
    dayName: workout.dayName,
    phase: workout.phase,
    exercises,
    rows // flat rows for Sheets
  };

  // Always save locally as backup/history
  const history = getHistory();
  const localEntry = { ...entry };
  delete localEntry.rows; // don't store flat rows locally
  history.push(localEntry);
  localStorage.setItem('ironlog_history', JSON.stringify(history));
  localStorage.removeItem(autoSaveKey());

  // Also add the new rows to the in-memory sheetData cache
  rows.forEach(r => sheetData.push(r));

  const btn = document.getElementById('saveBtn');

  if (DB_URL === "YOUR_WEBHOOK_URL_HERE") {
    btn.textContent = '✓ Saved Locally';
    btn.classList.add('saved');
    showToast('Saved locally. (Add your Webhook URL to sync to Google Sheets!)');
  } else {
    btn.textContent = 'Saving to Sheets...';
    try {
      await fetch(DB_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify({ rows })
      });
      btn.textContent = '✓ Saved to Sheets';
      btn.classList.add('saved');
      showToast('Workout saved to Google Sheets!');
    } catch (e) {
      console.error(e);
      btn.textContent = 'Save Workout';
      showToast('Error saving to Sheets. Saved locally.');
    }
  }

  setTimeout(() => { btn.textContent = 'Save Workout'; btn.classList.remove('saved'); }, 2000);
};

window.clearCurrentWorkout = function() {
  if (!confirm('Clear all entries for this workout?')) return;
  workoutData = {};
  localStorage.removeItem(autoSaveKey());
  renderWorkout();
  updateProgress();
  showToast('Entries cleared');
};

function autoSaveKey() { return `ironlog_autosave_w${currentWeek}_d${currentDay}`; }

function saveAutoSave() {
  if (Object.keys(workoutData).length > 0) {
    localStorage.setItem(autoSaveKey(), JSON.stringify(workoutData));
  }
}

function loadAutoSave() {
  const saved = localStorage.getItem(autoSaveKey());
  if (saved) {
    workoutData = JSON.parse(saved);
    applyWorkoutDataToUI();
    return;
  }

  // If no autosave, check if this workout was already completed (loaded from Sheets)
  loadFromSheetData();
}

// Load previously saved workout data from Google Sheets for the current week+day
function loadFromSheetData() {
  if (!sheetData || sheetData.length === 0) return;
  const workout = getWorkout(currentWeek, currentDay);

  // Find rows in sheetData matching this week + day
  const matchingRows = sheetData.filter(r => r.week === currentWeek && r.day === workout.dayName);
  if (matchingRows.length === 0) return;

  // Build workoutData from sheet rows
  workoutData = {};
  workout.exercises.forEach((ex, exIdx) => {
    const exRows = matchingRows.filter(r => r.exercise === ex.name);
    if (exRows.length > 0) {
      workoutData[exIdx] = {};
      exRows.forEach(r => {
        workoutData[exIdx][r.set - 1] = {
          weight: r.weight,
          reps: r.reps
        };
      });
    }
  });

  if (Object.keys(workoutData).length > 0) {
    applyWorkoutDataToUI();
  }
}

function applyWorkoutDataToUI() {
  const workout = getWorkout(currentWeek, currentDay);
  workout.exercises.forEach((ex, exIdx) => {
    for (let s = 0; s < ex.sets; s++) {
      const data = workoutData[exIdx]?.[s];
      if (data) {
        const wEl = document.getElementById(`weight-${exIdx}-${s}`);
        const rEl = document.getElementById(`reps-${exIdx}-${s}`);
        if (wEl && data.weight != null) wEl.value = data.weight;
        if (rEl && data.reps != null) rEl.value = data.reps;
        updateSetRowStatus(exIdx, s);
        window.onSetInput(exIdx, s);
      }
    }
    updateExerciseStatus(exIdx);
  });
  updateProgress();
}

function getHistory() {
  try { return JSON.parse(localStorage.getItem('ironlog_history') || '[]'); }
  catch { return []; }
}

// ===================================================================
// CALENDAR VIEW
// ===================================================================
function renderCalendar() {
  const container = document.getElementById('calendarView');
  const history = getHistory();
  const today = new Date();
  today.setHours(0,0,0,0);

  let html = '';
  for (const phase of PHASES) {
    html += `<div class="calendar-phase-block">`;
    html += `<div class="calendar-phase-title" style="background:${phase.dim};color:${phase.color}">${phase.name}</div>`;

    for (const week of phase.weeks) {
      html += `<div class="calendar-week-row">`;
      html += `<div class="calendar-week-label">Week ${week}</div>`;
      html += `<div class="calendar-days">`;

      for (let d = 0; d < 4; d++) {
        const dt = getWorkoutDate(week, d);
        const isToday = dt.getTime() === today.getTime();
        const hasLog = history.some(h => h.week === week && h.dayIndex === d);
        const isPast = dt < today;

        const dayName = DAY_TEMPLATES[d].shortName;
        const dateStr = dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const todayClass = isToday ? 'today' : '';
        const dataClass = hasLog ? 'has-data' : '';
        const statusClass = hasLog ? 'done' : 'pending';
        const statusText = hasLog ? '✓ Done' : (isPast ? 'Missed' : '—');

        html += `
          <div class="calendar-day-card ${todayClass} ${dataClass}" onclick="jumpTo(${week},${d})">
            <div class="calendar-day-name">${dayName}</div>
            <div class="calendar-day-date">${dateStr}</div>
            <div class="calendar-day-status ${statusClass}">${statusText}</div>
          </div>
        `;
      }

      html += `</div></div>`;
    }
    html += `</div>`;
  }

  container.innerHTML = html;
}

window.jumpTo = function(week, day) {
  saveAutoSave();
  currentWeek = week;
  currentDay = day;
  workoutData = {};
  renderWeekSelector();
  renderPhase();
  renderDayTabs();
  renderWorkout();
  loadAutoSave();
  setView('workout');
};

// ===================================================================
// HISTORY VIEW
// ===================================================================
function renderHistory() {
  const container = document.getElementById('historyView');
  const history = getHistory();

  if (history.length === 0) {
    container.innerHTML = `
      <div class="history-empty">
        <div class="empty-icon">📋</div>
        <p>No workouts logged yet.<br>Complete your first session!</p>
      </div>`;
    return;
  }

  const sorted = [...history].reverse();
  container.innerHTML = sorted.map(entry => {
    const date = new Date(entry.date);
    const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const dayColor = `var(--day${(entry.dayIndex || 0) + 1})`;
    const dayDim = `var(--day${(entry.dayIndex || 0) + 1}-dim)`;

    return `
      <div class="history-card" onclick="this.classList.toggle('expanded')">
        <div class="history-card-header">
          <div>
            <div class="history-date">${dateStr}</div>
            <div class="history-week-info">Week ${entry.week} · ${entry.phase}</div>
          </div>
          <span class="history-day-tag" style="background:${dayDim};color:${dayColor}">
            ${entry.dayName}
          </span>
        </div>
        <div class="history-summary">
          ${entry.exercises.map(ex => `<span class="history-exercise-tag">${ex.name}</span>`).join('')}
        </div>
        <div class="history-detail">
          ${entry.exercises.map(ex => `
            <div>
              <div class="history-exercise-name">${ex.name}</div>
              <div class="history-sets-row">
                ${Object.entries(ex.sets).map(([s, d]) => {
                  const e1rm = calcE1RM(d.weight, d.reps);
                  return `<span class="history-set-chip">S${parseInt(s)+1}: ${d.weight||'—'}lbs × ${d.reps||'—'}${e1rm ? ` (≈${e1rm})` : ''}</span>`;
                }).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

// ===================================================================
// TOAST
// ===================================================================
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('visible');
  setTimeout(() => t.classList.remove('visible'), 2200);
}

// ===================================================================
// DELETE / SWAP EXERCISES
// ===================================================================
let swapTargetIdx = null;

window.deleteExercise = function(exIdx) {
  const workout = getWorkout(currentWeek, currentDay);
  if (workout.exercises.length <= 1) {
    showToast('Cannot remove the last exercise');
    return;
  }
  const exName = workout.exercises[exIdx].name;
  if (!confirm(`Remove ${exName} from this workout?`)) return;

  const updated = workout.exercises.filter((_, i) => i !== exIdx);
  saveCustomization(updated);

  // Clear workout data and re-render
  workoutData = {};
  localStorage.removeItem(autoSaveKey());
  renderWorkout();
  updateProgress();
  showToast(`${exName} removed`);
};

window.openSwapModal = function(exIdx) {
  swapTargetIdx = exIdx;
  const workout = getWorkout(currentWeek, currentDay);
  const current = workout.exercises[exIdx];
  document.getElementById('swapModalTitle').textContent = `Replace ${current.name}`;
  document.getElementById('swapSearch').value = '';
  renderSwapOptions();
  document.getElementById('swapModal').classList.add('active');
  setTimeout(() => document.getElementById('swapSearch').focus(), 100);
};

window.closeSwapModal = function() {
  document.getElementById('swapModal').classList.remove('active');
  swapTargetIdx = null;
};

function renderSwapOptions(filter = '') {
  const workout = getWorkout(currentWeek, currentDay);
  const currentNames = workout.exercises.map(e => e.name);
  const swappingName = workout.exercises[swapTargetIdx]?.name;

  // Build list of exercises that would create conflicts
  const otherExercises = currentNames.filter(n => n !== swappingName);
  const blocked = new Set();
  for (const [a, b] of CONFLICT_GROUPS) {
    if (otherExercises.includes(a)) blocked.add(b);
    if (otherExercises.includes(b)) blocked.add(a);
  }

  const filterLower = filter.toLowerCase();
  const grouped = {};
  ALL_EXERCISES.forEach(ex => {
    if (filterLower && !ex.name.toLowerCase().includes(filterLower) && !ex.category.toLowerCase().includes(filterLower)) return;
    if (!grouped[ex.category]) grouped[ex.category] = [];
    grouped[ex.category].push(ex);
  });

  const container = document.getElementById('swapOptions');
  let html = '';
  for (const [cat, exercises] of Object.entries(grouped)) {
    html += `<div class="swap-category-label">${cat}</div>`;
    exercises.forEach(ex => {
      const isCurrent = ex.name === swappingName;
      const isBlocked = blocked.has(ex.name);
      const isInWorkout = !isCurrent && currentNames.includes(ex.name);
      const disabled = isBlocked || isInWorkout;
      const rankClass = getRankBadgeClass(ex.rank);
      const rankDisplay = ex.rank ? `#${ex.rank}` : '⚡';
      let statusHint = '';
      if (isBlocked) statusHint = ' (conflict)';
      else if (isInWorkout) statusHint = ' (already in workout)';

      html += `
        <div class="swap-option ${isCurrent ? 'current' : ''} ${disabled ? 'disabled' : ''}"
             onclick="${disabled || isCurrent ? '' : `confirmSwap('${ex.name.replace(/'/g, "\\\\'")}')`}">
          <div class="rank-badge ${rankClass}">${rankDisplay}</div>
          <div>
            <div class="swap-option-name">${ex.name}</div>
            <div class="swap-option-meta">${ex.category}${statusHint}</div>
          </div>
        </div>
      `;
    });
  }
  container.innerHTML = html;
}

window.filterSwapOptions = function() {
  renderSwapOptions(document.getElementById('swapSearch').value);
};

window.confirmSwap = function(newExName) {
  const workout = getWorkout(currentWeek, currentDay);
  const oldEx = workout.exercises[swapTargetIdx];
  const newExData = ALL_EXERCISES.find(e => e.name === newExName);
  if (!newExData) return;

  const updated = workout.exercises.map((ex, i) => {
    if (i !== swapTargetIdx) return { name: ex.name, rank: ex.rank, type: ex.type };
    return { name: newExData.name, rank: newExData.rank, type: oldEx.type };
  });

  saveCustomization(updated);
  window.closeSwapModal();

  // Clear workout data and re-render
  workoutData = {};
  localStorage.removeItem(autoSaveKey());
  renderWorkout();
  updateProgress();
  showToast(`Swapped ${oldEx.name} → ${newExData.name}`);
};

function saveCustomization(exerciseList) {
  const customKey = `ironlog_custom_w${currentWeek}_d${currentDay}`;
  const toSave = exerciseList.map(ex => ({ name: ex.name, rank: ex.rank, type: ex.type }));
  localStorage.setItem(customKey, JSON.stringify(toSave));
}

window.resetDayToDefault = function() {
  const customKey = `ironlog_custom_w${currentWeek}_d${currentDay}`;
  if (!localStorage.getItem(customKey)) {
    showToast('Already using default workout');
    window.closeSwapModal();
    return;
  }
  if (!confirm('Reset this day back to the default program?')) return;
  localStorage.removeItem(customKey);
  workoutData = {};
  localStorage.removeItem(autoSaveKey());
  window.closeSwapModal();
  renderWorkout();
  updateProgress();
  showToast('Reset to default');
};

// Close modal on backdrop click
document.getElementById('swapModal').addEventListener('click', function(e) {
  if (e.target === this) window.closeSwapModal();
});

// ===================================================================
// BOOT
// ===================================================================
init();
