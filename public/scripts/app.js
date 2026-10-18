// ===================================================================
// PROGRAM CONFIGURATION — 15-Week Periodized Program
// ===================================================================
// Day 1: Cleans, Back Squats
// Day 2: Overhead Press, Weighted Strict Pull-Ups, Bent Over Barbell Row, Dips
// Day 3: Traditional Deadlift, Bulgarian Split Squats
// Day 4: Bench Press, Rows (Chest Supported T-Bar or Seal Row), Weighted Strict Pull-Ups, Dips
// ===================================================================

const PROGRAM_START = new Date('2026-09-21T00:00:00'); // Monday
const TOTAL_WEEKS = 15;
const DAYS_PER_WEEK = 4;
// Days are numbered 1-4, no specific weekday assignment
const SCHEDULE_OFFSETS = [0, 1, 2, 3]; // just sequential for date display

const PHASES = [
  { name: "Hypertrophy Base", weeks: [1,2,3,4,5], mainReps: "8-9", mainSets: 4, accReps: "10-12", accSets: 3, color: "var(--phase-hyp)", dim: "var(--phase-hyp-dim)" },
  { name: "Strength Building", weeks: [6,7,8,9,10], mainReps: "7-8", mainSets: 4, accReps: "8-10", accSets: 3, color: "var(--phase-str)", dim: "var(--phase-str-dim)" },
  { name: "Strength Peak", weeks: [11,12,13,14], mainReps: "6-7", mainSets: 4, accReps: "6-8", accSets: 3, color: "var(--phase-peak)", dim: "var(--phase-peak-dim)" },
  { name: "Deload", weeks: [15], mainReps: "8-10", mainSets: 3, accReps: "10-12", accSets: 2, color: "var(--phase-deload)", dim: "var(--phase-deload-dim)", note: "Use 60–70% of working weight. Focus on form & recovery." },
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
    name: "Day 3 — Traditional Deadlift & Bulgarian Split Squats",
    shortName: "DL & Split",
    exercises: [
      { name: "Traditional Deadlift", rank: 3, type: "main" },
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

// Full exercise pool for swaps & additions
const ALL_EXERCISES = [
  { name: "Back Squats", rank: 1, category: "Lower" },
  { name: "Weighted Strict Pull-Ups", rank: 2, category: "Upper Pull" },
  { name: "Traditional Deadlift", rank: 3, category: "Lower" },
  { name: "Bench Press", rank: 4, category: "Upper Push" },
  { name: "Overhead Press", rank: 5, category: "Upper Push" },
  { name: "Dips", rank: 6, category: "Upper Push" },
  { name: "Bent Over Barbell Row", rank: 7, category: "Upper Pull" },
  { name: "Front Squats", rank: 8, category: "Lower" },
  { name: "Standing Ab Wheel", rank: 9, category: "Core" },
  { name: "Bulgarian Split Squats", rank: 10, category: "Lower" },
  { name: "Deficit Snatch Grip Deadlift", rank: 11, category: "Lower" },
  { name: "Strict Muscle Up", rank: 12, category: "Upper Body" },
  { name: "Rows (Chest Supported T-Bar or Seal Row)", rank: 13, category: "Upper Pull" },
  { name: "Nordic Curl", rank: 14, category: "Lower" },
  { name: "Romanian Deadlifts", rank: 15, category: "Lower" },
  { name: "Legless Rope Climb", rank: 16, category: "Upper Pull" },
  { name: "Barbell Z Press", rank: 17, category: "Upper Push" },
  { name: "Incline Bench Press", rank: 18, category: "Upper Push" },
  { name: "L-Sit", rank: 19, category: "Core" },
  { name: "Kettlebell Towel Curls", rank: 20, category: "Upper Pull" },
  { name: "Incline EZ Bar Skull Crushers", rank: 21, category: "Upper Push" },
  { name: "Calf Raises", rank: 22, category: "Lower" },
  { name: "Weighted Back Extensions", rank: 23, category: "Lower" },
  { name: "Barbell Lunges", rank: 24, category: "Lower" },
  { name: "Trap Bar Squat or Zercher Squat", rank: 25, category: "Lower" },
  { name: "Hip Thrust Machine", rank: null, category: "Lower" },
  { name: "Cleans", rank: null, category: "Full Body" },
  { name: "Trap Bar Deadlift", rank: null, category: "Lower" },
  { name: "Machine Seated Row", rank: null, category: "Upper Pull" },
  { name: "Cable Assisted Row", rank: null, category: "Upper Pull" },
  { name: "Assisted Pull-Ups", rank: null, category: "Upper Pull" },
  { name: "Machine Chest Flys", rank: null, category: "Upper Push" },
  { name: "Kettlebell Rows", rank: null, category: "Upper Pull" },
  { name: "Lateral Lunges", rank: null, category: "Lower" },
  { name: "Cossack Squats", rank: null, category: "Lower" },
  { name: "Trap Bar Jumps", rank: null, category: "Lower" },
  { name: "Landmine Lunges", rank: null, category: "Lower" },
  { name: "Landmine Curtsy Lunges", rank: null, category: "Lower" },
  { name: "Single Leg RDL", rank: null, category: "Lower" },
  { name: "Skater Squats", rank: null, category: "Lower" },
  { name: "Lateral Step-Up Jumps", rank: null, category: "Lower" },
  { name: "Seated Weighted Jumps", rank: null, category: "Lower" },
];

// Exercises that must NEVER share a day
const CONFLICT_GROUPS = [
  ["Back Squats", "Traditional Deadlift"],
  ["Back Squats", "Traditional Deadlifts"],
  ["Back Squats", "Conventional Deadlifts"],
  ["Cleans", "Traditional Deadlift"],
  ["Cleans", "Traditional Deadlifts"],
  ["Cleans", "Conventional Deadlifts"],
  ["Back Squat", "Traditional Deadlift"],
  ["Cleans", "Traditional Deadlift"],
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
      // Reapply current phase's sets/reps if not custom
      const exercises = customExercises.map(ex => ({
        ...ex,
        sets: (ex.sets != null) ? ex.sets : (ex.type === 'main' ? phase.mainSets : phase.accSets),
        repsRange: ex.repsRange || (ex.type === 'main' ? phase.mainReps : phase.accReps),
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
// ESTIMATED 1RM & STRENGTH CALCULATIONS
// ===================================================================
// Epley Formula for barbell compound lifts: weight * (1 + reps/30)
function calcE1RM(weight, reps) {
  if (!weight || !reps || reps <= 0 || weight <= 0) return null;
  if (reps === 1) return Math.round(weight);
  return Math.round(weight * (1 + reps / 30));
}

// Calisthenics helper (dips, pull-ups, chin-ups)
function isCalisthenicsExercise(name) {
  if (!name) return false;
  const n = name.toLowerCase();
  if (n.includes('assisted')) return false;
  return n.includes('dip') || n.includes('pull-up') || n.includes('pull up') || n.includes('chin-up') || n.includes('chin up');
}

// Inverse Epley formula based on total system load (BW + added weight)
// "for dips and pull ups the goal is not 1rm but quantity of body weight reps.
// if its a decimal round down"
function calcEquivalentBwReps(addedWeight, reps, bw) {
  if (!reps || reps <= 0) return 0;
  bw = bw || (typeof getUserBodyweight === 'function' ? getUserBodyweight() : 185);
  addedWeight = addedWeight || 0;
  if (addedWeight <= 0) return reps;
  const totalLoad = bw + addedWeight;
  const total1RM = totalLoad * (1 + reps / 30);
  const equiv = 30 * (total1RM / bw - 1);
  return Math.max(reps, Math.floor(equiv));
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

  // Render UI immediately so there is zero delay or blank screen
  renderWeekSelector();
  renderPhase();
  renderDayTabs();
  renderWorkout();
  loadAutoSave();
  setupViewToggle();

  // Sync with Google Sheets in the background
  syncWithDatabase();
}

async function syncWithDatabase() {
  const syncLabel = document.getElementById('syncLabel');
  const syncStatus = document.getElementById('syncStatus');

  if (DB_URL !== "YOUR_WEBHOOK_URL_HERE") {
    try {
      if (syncLabel) syncLabel.textContent = "SYNCING...";
      const response = await fetch(DB_URL);
      if (response.ok) {
        const data = await response.json();
        sheetData = data;
        rebuildHistoryFromSheetData();
        if (syncLabel) syncLabel.textContent = "SYNCED";
        if (syncStatus) syncStatus.classList.remove("offline");
        // Re-render workout benchmarks and history if needed without losing inputs
        renderWorkout();
        loadAutoSave();
      }
    } catch (e) {
      console.error("Failed to fetch from DB:", e);
      if (syncLabel) syncLabel.textContent = "OFFLINE";
      if (syncStatus) syncStatus.classList.add("offline");
    }
  } else {
    if (syncLabel) syncLabel.textContent = "LOCAL";
  }
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

function exerciseMatchesName(targetName, candidateName) {
  if (!targetName || !candidateName) return false;
  if (targetName.toLowerCase() === candidateName.toLowerCase()) return true;
  const tNorm = targetName.toLowerCase().replace(/s$/, '').trim();
  const cNorm = candidateName.toLowerCase().replace(/s$/, '').trim();
  if (tNorm === cNorm) return true;
  // Match Traditional Deadlift with Conventional Deadlifts / Deadlift
  const deadliftAliases = ['traditional deadlift', 'conventional deadlift', 'deadlift'];
  if (deadliftAliases.includes(tNorm) && deadliftAliases.includes(cNorm)) {
    return true;
  }
  // Match Back Squat with Squat
  const squatAliases = ['back squat', 'squat'];
  if (squatAliases.includes(tNorm) && squatAliases.includes(cNorm)) {
    return true;
  }
  return false;
}

// Get previous session data for an exercise from sheetData (from Google Sheets)
function getPreviousSessionData(exerciseName, setIdx) {
  if (sheetData && sheetData.length > 0) {
    // Filter to this exercise, sort by date descending, find the latest set matching setIdx
    const matching = sheetData
      .filter(r => exerciseMatchesName(exerciseName, r.exercise) && r.set === (setIdx + 1))
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
      const ex = session.exercises.find(e => exerciseMatchesName(exerciseName, e.name));
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
      .filter(r => exerciseMatchesName(exerciseName, r.exercise))
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

  const timelineEl = document.getElementById('weekTimeline');
  if (timelineEl) {
    let dotsHtml = '';
    for (let w = 1; w <= TOTAL_WEEKS; w++) {
      let cls = 'week-dot';
      if (w < currentWeek) cls += ' completed';
      if (w === currentWeek) cls += ' active';
      dotsHtml += `<span class="${cls}" title="Week ${w}"></span>`;
    }
    timelineEl.innerHTML = dotsHtml;
  }

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
  const targetsEl = document.getElementById('phaseTargets');

  nameEl.textContent = phase.name;
  if (targetsEl) {
    targetsEl.textContent = `Main: ${phase.mainSets}×${phase.mainReps} · Acc: ${phase.accSets}×${phase.accReps}`;
  }
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
        <span class="tab-badge">0${i + 1}</span>
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
  const progBtn = document.getElementById('progressViewBtn');
  if (progBtn) progBtn.addEventListener('click', () => setView('progress'));
}

function setView(view) {
  currentView = view;
  document.getElementById('workoutViewBtn').classList.toggle('active', view === 'workout');
  document.getElementById('calendarViewBtn').classList.toggle('active', view === 'calendar');
  document.getElementById('historyViewBtn').classList.toggle('active', view === 'history');
  const progBtn = document.getElementById('progressViewBtn');
  if (progBtn) progBtn.classList.toggle('active', view === 'progress');

  document.getElementById('workoutView').classList.toggle('active', view === 'workout');
  document.getElementById('calendarView').classList.toggle('active', view === 'calendar');
  document.getElementById('historyView').classList.toggle('active', view === 'history');
  const progView = document.getElementById('progressView');
  if (progView) progView.classList.toggle('active', view === 'progress');

  if (view === 'history') renderHistory();
  if (view === 'calendar') renderCalendar();
  if (view === 'progress') renderProgress();
}

function syncInputsToWorkoutData() {
  const workout = getWorkout(currentWeek, currentDay);
  if (!workout || !workout.exercises) return;
  workout.exercises.forEach((ex, exIdx) => {
    for (let s = 0; s < ex.sets; s++) {
      const wEl = document.getElementById(`weight-${exIdx}-${s}`);
      const rEl = document.getElementById(`reps-${exIdx}-${s}`);
      if (wEl && rEl) {
        const wVal = wEl.value.trim();
        const rVal = rEl.value.trim();
        if (wVal !== '' || rVal !== '') {
          if (!workoutData[exIdx]) workoutData[exIdx] = {};
          workoutData[exIdx][s] = {
            weight: wVal === '' ? 0 : parseFloat(wVal),
            reps: rVal === '' ? 0 : parseInt(rVal, 10)
          };
        }
      }
    }
  });
}

// ===================================================================
// RENDER WORKOUT
// ===================================================================
function renderWorkout() {
  const workout = getWorkout(currentWeek, currentDay);
  const container = document.getElementById('exerciseList');
  if (!container) return;
  const dayColorVar = `var(--day${currentDay + 1})`;
  const progressFill = document.getElementById('progressFill');
  if (progressFill) progressFill.style.background = dayColorVar;

  container.innerHTML = workout.exercises.map((ex, exIdx) => {
    const rankClass = getRankBadgeClass(ex.rank);
    const cardClass = ex.type === 'main' ? (ex.rank && ex.rank <= 7 ? 'top-7' : 'main-lift') : '';
    const rankDisplay = ex.rank ? `#${ex.rank}` : '⚡';

    // Get last session data for this exercise
    const lastSession = getLastSessionForExercise(ex.name);
    let lastSessionHtml = '';
    if (lastSession) {
      const isCal = isCalisthenicsExercise(ex.name);
      let estBadge = '';
      let valText = '';
      if (isCal) {
        const bw = getUserBodyweight();
        const equiv = calcEquivalentBwReps(lastSession.maxWeight, lastSession.maxReps, bw);
        valText = lastSession.maxWeight > 0 ? `+${lastSession.maxWeight} lbs × ${lastSession.maxReps}` : `BW × ${lastSession.maxReps}`;
        estBadge = `<span class="last-session-e1rm">🔥 Est: ${equiv} BW reps</span>`;
      } else {
        const e1rm = calcE1RM(lastSession.maxWeight, lastSession.maxReps);
        valText = `${lastSession.maxWeight} lbs × ${lastSession.maxReps}`;
        if (e1rm) estBadge = `<span class="last-session-e1rm">🔥 Est 1RM: ${e1rm} lbs</span>`;
      }
      lastSessionHtml = `
        <div class="last-session">
          <span class="last-session-label">🎯 Benchmark:</span>
          <span class="last-session-value">${valText}</span>
          <span class="last-session-date">(${lastSession.dateStr})</span>
          ${estBadge}
        </div>
      `;
    }

    return `
      <div class="exercise-card ${cardClass}" id="card-${exIdx}">
        <div class="exercise-header">
          <div class="exercise-info">
            <div class="rank-badge ${rankClass}" title="Tanner Shuck Rank ${ex.rank || 'Explosive'}">${rankDisplay}</div>
            <div>
              <div class="exercise-name">${ex.name}</div>
              <div class="exercise-meta">${ex.type === 'main' ? 'MAIN LIFT' : 'ACCESSORY'} · ${ex.sets} SETS × ${ex.repsRange} REPS</div>
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
          <div class="exercise-sets-controls">
            <button type="button" class="set-ctrl-btn add" onclick="addSet(${exIdx})" title="Add another set">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span>Add Set</span>
            </button>
            <button type="button" class="set-ctrl-btn remove" onclick="removeSet(${exIdx})" title="Remove last set" ${ex.sets <= 1 ? 'disabled' : ''}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span>Remove Set</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  populateAddExerciseDropdown();
  updateProgress();
}

function renderSetRow(exIdx, setIdx, ex) {
  const prev = getPreviousSessionData(ex.name, setIdx);
  const prevW = prev && prev.weight ? prev.weight : '—';
  const prevR = prev && prev.reps ? prev.reps : (ex.repsRange || '—');
  const cur = workoutData[exIdx]?.[setIdx];
  const curW = cur && cur.weight != null ? cur.weight : '';
  const curR = cur && cur.reps != null ? cur.reps : '';
  return `
    <div class="set-row" id="set-${exIdx}-${setIdx}">
      <span class="set-label">S${setIdx + 1}</span>
      <div class="set-input-group">
        <input type="number" class="set-input" id="weight-${exIdx}-${setIdx}"
          placeholder="${prevW}" value="${curW}" inputmode="decimal"
          onchange="onSetChange(${exIdx}, ${setIdx})" oninput="onSetInput(${exIdx}, ${setIdx})" onfocus="this.select()">
        <span class="set-unit">lbs</span>
      </div>
      <span class="set-divider">×</span>
      <div class="set-input-group">
        <input type="number" class="set-input" id="reps-${exIdx}-${setIdx}"
          placeholder="${prevR}" value="${curR}" inputmode="numeric"
          onchange="onSetChange(${exIdx}, ${setIdx})" oninput="onSetInput(${exIdx}, ${setIdx})" onfocus="this.select()">
        <span class="set-unit">reps</span>
      </div>
      <div class="set-row-actions">
        <button type="button" class="quick-fill-btn" onclick="quickFill(${exIdx}, ${setIdx})" title="Fill from previous session" aria-label="Copy previous">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
        </button>
        <button type="button" class="set-delete-btn" onclick="deleteSpecificSet(${exIdx}, ${setIdx})" title="Remove this set" aria-label="Remove set">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>
    <div class="e1rm-row" id="e1rm-${exIdx}-${setIdx}"></div>
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

// Live update E1RM / Equivalent BW reps as user types
window.onSetInput = function(exIdx, setIdx) {
  const weightEl = document.getElementById(`weight-${exIdx}-${setIdx}`);
  const repsEl = document.getElementById(`reps-${exIdx}-${setIdx}`);
  const e1rmEl = document.getElementById(`e1rm-${exIdx}-${setIdx}`);
  if (!weightEl || !repsEl || !e1rmEl) return;

  const rawWeight = weightEl.value.trim();
  const weight = rawWeight === '' ? 0 : parseFloat(rawWeight);
  const reps = parseInt(repsEl.value);

  if (!reps || reps <= 0) {
    e1rmEl.textContent = '';
    e1rmEl.classList.remove('visible');
    return;
  }

  const workout = getWorkout(currentWeek, currentDay);
  const ex = workout && workout.exercises ? workout.exercises[exIdx] : null;
  const isCal = ex && isCalisthenicsExercise(ex.name);

  if (isCal) {
    const bw = getUserBodyweight();
    const equiv = calcEquivalentBwReps(weight, reps, bw);
    if (weight > 0) {
      e1rmEl.textContent = `🔥 ≈ ${equiv} BW reps (+${weight} lbs)`;
    } else {
      e1rmEl.textContent = `🔥 ${equiv} BW reps`;
    }
    e1rmEl.classList.add('visible');
  } else {
    if (weight > 0) {
      const e1rm = calcE1RM(weight, reps);
      if (e1rm) {
        e1rmEl.textContent = `🔥 ≈ ${e1rm} lb 1RM`;
        e1rmEl.classList.add('visible');
      } else {
        e1rmEl.textContent = '';
        e1rmEl.classList.remove('visible');
      }
    } else {
      e1rmEl.textContent = '';
      e1rmEl.classList.remove('visible');
    }
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
  const valEl = document.getElementById('progressValue');
  const fillEl = document.getElementById('progressFill');
  const countEl = document.getElementById('progressCount');

  if (valEl) valEl.textContent = `${pct}%`;
  if (fillEl) fillEl.style.width = `${pct}%`;
  if (countEl) countEl.textContent = `${done} / ${total} sets`;
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
    const exRows = matchingRows.filter(r => exerciseMatchesName(ex.name, r.exercise));
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
        <p>No workouts logged yet.<br>Complete and save your first session!</p>
      </div>`;
    return;
  }

  let totalSets = 0;
  let totalLbs = 0;
  history.forEach(h => {
    (h.exercises || []).forEach(e => {
      Object.values(e.sets || {}).forEach(s => {
        if (s.weight != null && s.reps != null) {
          totalSets++;
          totalLbs += (s.weight * s.reps);
        }
      });
    });
  });

  const formattedLbs = totalLbs > 9999 ? `${(totalLbs / 1000).toFixed(1)}k` : totalLbs.toLocaleString();

  const statsBannerHtml = `
    <div class="history-stats-banner">
      <div class="history-stat-card">
        <div class="history-stat-val">${history.length}</div>
        <div class="history-stat-lbl">Workouts</div>
      </div>
      <div class="history-stat-card">
        <div class="history-stat-val">${totalSets}</div>
        <div class="history-stat-lbl">Sets Logged</div>
      </div>
      <div class="history-stat-card">
        <div class="history-stat-val">${formattedLbs}</div>
        <div class="history-stat-lbl">Total Volume</div>
      </div>
    </div>
  `;

  const sorted = [...history].reverse();
  const listHtml = sorted.map(entry => {
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
                  const isCal = isCalisthenicsExercise(ex.name);
                  if (isCal) {
                    const equiv = calcEquivalentBwReps(d.weight, d.reps, getUserBodyweight());
                    const weightText = d.weight > 0 ? `+${d.weight} lbs` : 'BW';
                    return `<span class="history-set-chip">S${parseInt(s)+1}: ${weightText} × ${d.reps != null ? d.reps : '—'} (≈${equiv} reps)</span>`;
                  }
                  const e1rm = calcE1RM(d.weight, d.reps);
                  return `<span class="history-set-chip">S${parseInt(s)+1}: ${d.weight != null ? d.weight : '—'} lbs × ${d.reps != null ? d.reps : '—'}${e1rm ? ` (≈${e1rm})` : ''}</span>`;
                }).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = statsBannerHtml + listHtml;
}

// ===================================================================
// PROGRESS & STRENGTH STANDARDS
// ===================================================================

const STRENGTH_STANDARDS = [
  {
    id: "squat",
    name: "Back Squats",
    exerciseQuery: ["Back Squats", "Back Squat", "Barbell Squat", "Squats", "Squat"],
    excludeQuery: ["front squat", "front squats", "split", "goblet", "hack", "zercher", "cossack", "skater", "jump"],
    type: "weight_bw_mult",
    unit: "lbs",
    category: "LOWER BODY",
    rankBadge: "#1",
    rankClass: "elite",
    goodMultiplier: 1.5,
    eliteMultiplier: 2.0,
    goodLabel: "1.5× BW",
    eliteLabel: "2.0× BW",
    note: "Full depth barbell back squat"
  },
  {
    id: "deadlift",
    name: "Traditional Deadlift",
    exerciseQuery: ["Traditional Deadlift", "Traditional Deadlifts", "Conventional Deadlifts", "Deadlift", "Deadlifts", "Conventional Deadlift"],
    excludeQuery: ["romanian", "rdl", "stiff leg", "sumo", "single leg", "trap bar", "deficit", "snatch grip"],
    type: "deadlift_custom",
    unit: "lbs",
    category: "POSTERIOR CHAIN",
    rankBadge: "#3",
    rankClass: "elite",
    baselineFixed: 405,
    eliteMultiplier: 2.5,
    goodLabel: "405 lbs Min",
    eliteLabel: "2.5× BW",
    note: "Traditional / conventional pull from the floor"
  },
  {
    id: "bench",
    name: "Bench Press",
    exerciseQuery: ["Bench Press", "Barbell Bench Press", "Flat Bench"],
    excludeQuery: ["incline", "decline", "close grip", "dumbbell"],
    type: "weight_bw_mult",
    unit: "lbs",
    category: "UPPER PUSH",
    rankBadge: "#4",
    rankClass: "top",
    goodMultiplier: 1.25,
    eliteMultiplier: 1.5,
    goodLabel: "1.25× BW",
    eliteLabel: "1.5× BW",
    note: "Flat barbell bench press"
  },
  {
    id: "ohp",
    name: "Overhead Press",
    exerciseQuery: ["Overhead Press", "Standing Overhead Press", "Strict Press", "Military Press"],
    excludeQuery: ["dumbbell", "seated", "machine"],
    type: "weight_bw_mult",
    unit: "lbs",
    category: "VERTICAL PUSH",
    rankBadge: "#5",
    rankClass: "top",
    goodMultiplier: 0.75,
    eliteMultiplier: 1.0,
    goodLabel: "0.75× BW",
    eliteLabel: "1.0× BW",
    note: "Strict barbell standing overhead press"
  },
  {
    id: "pullups",
    name: "Pull-ups (Strict)",
    exerciseQuery: ["Weighted Strict Pull-Ups", "Strict Pull-ups", "Pull-ups", "Pull Ups", "Chin-ups", "Chin Ups"],
    excludeQuery: ["lat pulldown", "assisted"],
    type: "reps_standard",
    unit: "reps",
    category: "VERTICAL PULL",
    rankBadge: "#2",
    rankClass: "elite",
    goodReps: 10,
    eliteReps: 20,
    goodLabel: "10 Reps",
    eliteLabel: "20 Reps",
    note: "Strict dead-hang bodyweight pull-ups"
  },
  {
    id: "dips",
    name: "Dips (Strict)",
    exerciseQuery: ["Dips", "Strict Dips", "Parallel Bar Dips"],
    excludeQuery: ["bench dip", "tricep pushdown"],
    type: "reps_standard",
    unit: "reps",
    category: "UPPER PUSH",
    rankBadge: "#6",
    rankClass: "top",
    goodReps: 10,
    eliteReps: 20,
    goodLabel: "10 Reps",
    eliteLabel: "20 Reps",
    note: "Parallel bar dips (goal: 20 BW reps; weighted sets convert)"
  }
];

function getUserBodyweight() {
  const saved = localStorage.getItem('ironlog_bodyweight');
  return saved ? parseFloat(saved) : 185;
}

window.adjustBodyweight = function(delta) {
  const current = getUserBodyweight();
  const next = Math.max(80, Math.min(450, current + delta));
  localStorage.setItem('ironlog_bodyweight', next);
  renderProgress();
};

window.onBodyweightChange = function(inputEl) {
  const val = parseFloat(inputEl.value);
  if (!isNaN(val) && val >= 80 && val <= 450) {
    localStorage.setItem('ironlog_bodyweight', Math.round(val));
    renderProgress();
  }
};

function getStandardTargets(std, bw) {
  if (std.type === 'deadlift_custom') {
    const good = std.baselineFixed; // 405
    const elite = Math.round(bw * std.eliteMultiplier); // 2.5 * bw
    return { good, elite, goodLabel: "405 lbs (Baseline)", eliteLabel: `${elite} lbs (${std.eliteLabel})` };
  } else if (std.type === 'weight_bw_mult') {
    const good = Math.round(bw * std.goodMultiplier);
    const elite = Math.round(bw * std.eliteMultiplier);
    return { good, elite, goodLabel: `${good} lbs (${std.goodLabel})`, eliteLabel: `${elite} lbs (${std.eliteLabel})` };
  } else if (std.type === 'reps_standard') {
    return { good: std.goodReps, elite: std.eliteReps, goodLabel: `${std.goodReps} reps`, eliteLabel: `${std.eliteReps} reps` };
  }
}

// Check if an exercise matches standard queries and avoids exclusions
function exerciseMatchesStandard(exName, std) {
  if (!exName) return false;
  const lower = exName.toLowerCase();
  if (std.excludeQuery && std.excludeQuery.some(eq => lower.includes(eq.toLowerCase()))) {
    return false;
  }
  return std.exerciseQuery.some(q => lower.includes(q.toLowerCase()));
}

// Automatically infer best estimated 1RM / bodyweight reps from workout logs
function getInferredStandardScore(std, bw) {
  let best = 0;
  let bestSetInfo = null;
  let bestWeighted = null;

  function evaluateSet(weight, reps, exName) {
    if (!reps || reps <= 0) return;
    weight = weight || 0;

    if (std.type === 'reps_standard') {
      const equivReps = calcEquivalentBwReps(weight, reps, bw);
      if (weight > 0) {
        if (!bestWeighted || equivReps > bestWeighted.equivReps) {
          bestWeighted = { weight, reps, equivReps };
        }
      }
      if (equivReps > best) {
        best = equivReps;
        bestSetInfo = {
          weight,
          reps,
          equivReps,
          sourceText: weight > 0 
            ? `Inferred from +${weight} lbs × ${reps} reps (≈ ${equivReps} BW reps)`
            : `Logged: ${reps} bodyweight reps`
        };
      }
    } else {
      const e1rm = calcE1RM(weight, reps);
      if (e1rm && e1rm > best) {
        best = e1rm;
        bestSetInfo = {
          weight,
          reps,
          e1rm,
          sourceText: `Inferred from ${weight} lbs × ${reps} reps`
        };
      }
    }
  }

  // 1. Scan Google Sheets live sync data
  if (sheetData && sheetData.length > 0) {
    sheetData.forEach(r => {
      if (exerciseMatchesStandard(r.exercise, std)) {
        evaluateSet(parseFloat(r.weight), parseInt(r.reps), r.exercise);
      }
    });
  }

  // 2. Scan localStorage history
  const history = getHistory();
  history.forEach(session => {
    if (session.exercises) {
      session.exercises.forEach(ex => {
        if (exerciseMatchesStandard(ex.name, std)) {
          if (ex.sets) {
            Object.values(ex.sets).forEach(s => {
              if (s && (s.weight != null || s.reps != null)) {
                evaluateSet(parseFloat(s.weight), parseInt(s.reps), ex.name);
              }
            });
          }
        }
      });
    }
  });

  // 3. Scan today's active in-progress workoutData
  const todayWorkout = getWorkout(currentWeek, currentDay);
  if (todayWorkout && todayWorkout.exercises) {
    todayWorkout.exercises.forEach((ex, exIdx) => {
      if (exerciseMatchesStandard(ex.name, std)) {
        const exData = workoutData[exIdx];
        if (exData) {
          Object.values(exData).forEach(s => {
            if (s && (s.weight != null || s.reps != null)) {
              evaluateSet(parseFloat(s.weight), parseInt(s.reps), ex.name);
            }
          });
        }
      }
    });
  }

  // If best set was unweighted but user also has logged weighted sets, show both in source badge
  if (bestSetInfo && bestSetInfo.weight === 0 && bestWeighted) {
    bestSetInfo.sourceText = `Logged: ${bestSetInfo.reps} BW reps · Best weighted: +${bestWeighted.weight} lbs × ${bestWeighted.reps} (≈ ${bestWeighted.equivReps} BW reps)`;
  }

  return {
    value: best,
    hasData: best > 0,
    bestSetInfo: bestSetInfo || { sourceText: 'No logged sets yet in program' }
  };
}

function calculateStandardProgress(std, scoreData, targets) {
  const current = scoreData ? scoreData.value : 0;
  const { good, elite } = targets;
  if (current <= 0) {
    const unitText = std.unit === 'reps' ? 'reps' : 'lbs';
    const targetName = std.type === 'deadlift_custom' ? 'Baseline (405 lbs)' : `Good (${good} ${unitText})`;
    return {
      pct: 0,
      status: "NO DATA",
      badgeClass: "status-developing",
      deltaText: `Goal: ${targetName}`,
      isGood: false,
      isElite: false
    };
  }

  if (current >= elite) {
    return {
      pct: 100,
      status: "ELITE",
      badgeClass: "status-elite",
      deltaText: "Elite Standard Met! 🔥",
      isGood: true,
      isElite: true
    };
  } else if (current >= good) {
    const progressInElite = (current - good) / (elite - good);
    const pct = Math.round(50 + progressInElite * 50);
    const diff = elite - current;
    const unitText = std.unit === 'reps' ? 'reps' : 'lbs';
    return {
      pct,
      status: "GOOD",
      badgeClass: "status-good",
      deltaText: `${diff} ${unitText} to Elite (${elite} ${unitText})`,
      isGood: true,
      isElite: false
    };
  } else {
    const progressInGood = current / good;
    const pct = Math.max(0, Math.min(48, Math.round(progressInGood * 50)));
    const diff = good - current;
    const unitText = std.unit === 'reps' ? 'reps' : 'lbs';
    const targetName = std.type === 'deadlift_custom' ? 'Baseline (405 lbs)' : `Good (${good} ${unitText})`;
    return {
      pct,
      status: "DEVELOPING",
      badgeClass: "status-developing",
      deltaText: `${diff} ${unitText} to ${targetName}`,
      isGood: false,
      isElite: false
    };
  }
}

let currentProgressTab = 'foundational'; // 'foundational' | 'other'
let otherProgressCategory = 'All';
let otherShowUnlogged = false;

window.switchProgressTab = function(tab) {
  currentProgressTab = tab;
  renderProgress();
};

window.setOtherProgressCategory = function(cat) {
  otherProgressCategory = cat;
  renderProgress();
};

window.toggleOtherShowUnlogged = function() {
  otherShowUnlogged = !otherShowUnlogged;
  renderProgress();
};

function isFoundationalExercise(name) {
  if (!name) return false;
  return STRENGTH_STANDARDS.some(std => exerciseMatchesStandard(name, std));
}

function isCalisthenicsExercise(name) {
  if (!name) return false;
  const n = name.toLowerCase();
  return n.includes('l-sit') || 
         n.includes('rope climb') || 
         n.includes('muscle up') || 
         n.includes('ab wheel') ||
         n.includes('assisted pull-up');
}

function formatSessionDate(dateStr) {
  if (!dateStr || dateStr === 'Logged Session') return 'Session';
  try {
    const clean = dateStr.split('T')[0];
    const parts = clean.split('-');
    if (parts.length === 3) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const mIdx = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      return `${months[mIdx]} ${day}`;
    }
  } catch (e) {}
  return dateStr;
}

function getAllOtherExercisesStats() {
  const bw = getUserBodyweight();
  const map = new Map();

  function getCanonicalExercise(rawName) {
    if (!rawName) return null;
    const clean = rawName.trim();
    if (isFoundationalExercise(clean)) return null;

    for (const item of ALL_EXERCISES) {
      if (exerciseMatchesName(item.name, clean)) {
        return item;
      }
    }
    return { name: clean, rank: null, category: "Other" };
  }

  function getOrCreateEntry(rawName) {
    const canonical = getCanonicalExercise(rawName);
    if (!canonical) return null;
    const key = canonical.name.toLowerCase();
    if (!map.has(key)) {
      map.set(key, {
        name: canonical.name,
        rank: canonical.rank,
        category: canonical.category || "Other",
        sessions: new Map(),
        bestWeight: 0,
        bestWeightReps: 0,
        bestE1RM: 0,
        bestSetInfo: null,
        totalVolume: 0,
        totalSets: 0,
      });
    }
    return map.get(key);
  }

  function recordSet(rawName, weight, reps, date, week, dayName, setIdx) {
    weight = parseFloat(weight) || 0;
    reps = parseInt(reps) || 0;
    if (reps <= 0 && weight <= 0) return;

    const entry = getOrCreateEntry(rawName);
    if (!entry) return;

    const sessionKey = `${date || 'unknown'}_${week || ''}_${dayName || ''}`;
    if (!entry.sessions.has(sessionKey)) {
      entry.sessions.set(sessionKey, {
        date: date || 'Logged Session',
        week: week || null,
        dayName: dayName || '',
        sets: [],
        bestE1RM: 0,
        bestWeight: 0,
        bestReps: 0
      });
    }

    const sObj = entry.sessions.get(sessionKey);
    sObj.sets.push({ weight, reps, setIdx });

    entry.totalSets++;
    entry.totalVolume += (weight > 0 ? weight : bw) * reps;

    const e1rm = calcE1RM(weight, reps);
    if (weight > entry.bestWeight || (weight === entry.bestWeight && reps > entry.bestWeightReps)) {
      entry.bestWeight = weight;
      entry.bestWeightReps = reps;
    }

    if (e1rm > entry.bestE1RM) {
      entry.bestE1RM = e1rm;
      entry.bestSetInfo = {
        weight,
        reps,
        e1rm,
        date: date || ''
      };
    }

    if (e1rm > sObj.bestE1RM) {
      sObj.bestE1RM = e1rm;
      sObj.bestWeight = weight;
      sObj.bestReps = reps;
    }
  }

  // 1. Scan sheetData
  if (sheetData && sheetData.length > 0) {
    sheetData.forEach(r => {
      recordSet(r.exercise, r.weight, r.reps, r.date, r.week, r.day, r.set);
    });
  }

  // 2. Scan localStorage history
  const history = getHistory();
  history.forEach(session => {
    if (session.exercises) {
      session.exercises.forEach(ex => {
        if (ex.sets) {
          Object.entries(ex.sets).forEach(([idx, s]) => {
            if (s && (s.weight != null || s.reps != null)) {
              recordSet(ex.name, s.weight, s.reps, session.date, session.week, session.dayName, idx);
            }
          });
        }
      });
    }
  });

  // 3. Scan today active workoutData
  const todayWorkout = getWorkout(currentWeek, currentDay);
  if (todayWorkout && todayWorkout.exercises) {
    const todayStr = new Date().toISOString().split('T')[0];
    todayWorkout.exercises.forEach((ex, exIdx) => {
      const exData = workoutData[exIdx];
      if (exData) {
        Object.entries(exData).forEach(([sIdx, s]) => {
          if (s && (s.weight != null || s.reps != null) && (parseFloat(s.weight) > 0 || parseInt(s.reps) > 0)) {
            recordSet(ex.name, s.weight, s.reps, todayStr, currentWeek, todayWorkout.dayName, sIdx);
          }
        });
      }
    });
  }

  // 4. Seed remaining exercises from ALL_EXERCISES
  ALL_EXERCISES.forEach(item => {
    if (!isFoundationalExercise(item.name)) {
      const key = item.name.toLowerCase();
      if (!map.has(key)) {
        map.set(key, {
          name: item.name,
          rank: item.rank,
          category: item.category || "Other",
          sessions: new Map(),
          bestWeight: 0,
          bestWeightReps: 0,
          bestE1RM: 0,
          bestSetInfo: null,
          totalVolume: 0,
          totalSets: 0,
        });
      }
    }
  });

  // Calculate progression delta and sort descending by workouts entered
  const list = Array.from(map.values()).map(entry => {
    const sessionList = Array.from(entry.sessions.values());
    sessionList.sort((a, b) => new Date(a.date) - new Date(b.date));

    let deltaText = 'Baseline Logged';
    let deltaClass = 'neutral';
    if (sessionList.length > 1) {
      const first = sessionList[0].bestE1RM || sessionList[0].bestWeight;
      const latest = sessionList[sessionList.length - 1].bestE1RM || sessionList[sessionList.length - 1].bestWeight;
      const diff = latest - first;
      if (diff > 0) {
        deltaText = `+${diff} lbs (+${Math.round((diff / (first || 1)) * 100)}%)`;
        deltaClass = 'positive';
      } else if (diff < 0) {
        deltaText = `${diff} lbs`;
        deltaClass = 'negative';
      } else {
        deltaText = `Maintained (${latest} lbs)`;
        deltaClass = 'neutral';
      }
    }

    return {
      ...entry,
      workoutsEntered: sessionList.length,
      sessionList,
      firstSession: sessionList[0] || null,
      latestSession: sessionList[sessionList.length - 1] || null,
      deltaText,
      deltaClass
    };
  });

  // Descend strictly by workouts entered, then total sets, then best E1RM
  list.sort((a, b) => {
    if (b.workoutsEntered !== a.workoutsEntered) {
      return b.workoutsEntered - a.workoutsEntered;
    }
    if (b.totalSets !== a.totalSets) {
      return b.totalSets - a.totalSets;
    }
    return (b.bestE1RM || 0) - (a.bestE1RM || 0);
  });

  return list;
}

function renderProgress() {
  const container = document.getElementById('progressView');
  if (!container) return;

  const bw = getUserBodyweight();
  const otherStats = getAllOtherExercisesStats();
  const activeOtherCount = otherStats.filter(e => e.workoutsEntered > 0).length;

  // Subtabs header: Foundational Lifts vs Other Exercises
  const subtabsHtml = `
    <div class="progress-subtabs-wrap">
      <div class="progress-subtabs" role="tablist">
        <button class="progress-subtab ${currentProgressTab === 'foundational' ? 'active' : ''}" onclick="switchProgressTab('foundational')" role="tab" aria-selected="${currentProgressTab === 'foundational'}">
          <span class="subtab-icon">⚡</span>
          <span class="subtab-title">FOUNDATIONAL LIFTS</span>
          <span class="subtab-badge">6 STANDARDS</span>
        </button>
        <button class="progress-subtab ${currentProgressTab === 'other' ? 'active' : ''}" onclick="switchProgressTab('other')" role="tab" aria-selected="${currentProgressTab === 'other'}">
          <span class="subtab-icon">📊</span>
          <span class="subtab-title">OTHER EXERCISES</span>
          <span class="subtab-badge ${activeOtherCount > 0 ? 'badge-highlight' : ''}">${activeOtherCount} LOGGED</span>
        </button>
      </div>
    </div>
  `;

  if (currentProgressTab === 'other') {
    container.innerHTML = subtabsHtml + renderOtherExercisesProgress(otherStats);
    return;
  }

  // Foundational Lifts view
  let goodCount = 0;
  let eliteCount = 0;

  const cardsHtml = STRENGTH_STANDARDS.map(std => {
    const targets = getStandardTargets(std, bw);
    const scoreData = getInferredStandardScore(std, bw);
    const current = scoreData.value;
    const progress = calculateStandardProgress(std, scoreData, targets);

    if (progress.isElite) {
      eliteCount++;
      goodCount++;
    } else if (progress.isGood) {
      goodCount++;
    }

    const unitStr = std.unit;
    const rankClass = getRankBadgeClass(std.rankBadge === '⚡' ? null : parseInt(std.rankBadge.replace('#', '')));

    let targetsSummary = '';
    if (std.type === 'deadlift_custom') {
      targetsSummary = `
        <div class="std-target-pill"><span class="target-name">Baseline:</span> <strong>405 lbs</strong></div>
        <div class="std-target-pill"><span class="target-name">Elite (2.5×):</span> <strong>${targets.elite} lbs</strong></div>
      `;
    } else if (std.type === 'reps_standard') {
      targetsSummary = `
        <div class="std-target-pill"><span class="target-name">Good:</span> <strong>${targets.good} reps</strong></div>
        <div class="std-target-pill"><span class="target-name">Elite:</span> <strong>${targets.elite} reps</strong></div>
      `;
    } else {
      targetsSummary = `
        <div class="std-target-pill"><span class="target-name">Good (${std.goodLabel}):</span> <strong>${targets.good} lbs</strong></div>
        <div class="std-target-pill"><span class="target-name">Elite (${std.eliteLabel}):</span> <strong>${targets.elite} lbs</strong></div>
      `;
    }

    const displayScore = scoreData.hasData ? current : '—';
    const scoreLabel = std.type === 'reps_standard' ? 'EST. BW REPS' : 'EST. 1RM';

    return `
      <div class="standard-card" id="std-${std.id}">
        <div class="standard-card-header">
          <div class="standard-info">
            <div class="rank-badge ${rankClass}">${std.rankBadge}</div>
            <div>
              <div class="standard-title">${std.name}</div>
              <div class="standard-cat">${std.category}</div>
            </div>
          </div>
          <span class="standard-status-badge ${progress.badgeClass}">${progress.status}</span>
        </div>

        <div class="standard-main-row">
          <div class="standard-current-score">
            <span class="score-label">${scoreLabel}</span>
            <div class="score-value-wrap">
              <span class="score-value">${displayScore}</span>
              ${scoreData.hasData ? `<span class="score-unit">${unitStr}</span>` : ''}
            </div>
            <div class="std-source-pill" title="${scoreData.bestSetInfo.sourceText}">
              ${scoreData.bestSetInfo.sourceText}
            </div>
          </div>
          <div class="standard-targets-group">
            ${targetsSummary}
          </div>
        </div>

        <!-- Stepped Progress Track -->
        <div class="standard-gauge-wrap">
          <div class="standard-gauge-track">
            <div class="standard-gauge-fill ${progress.badgeClass}" style="width: ${progress.pct}%;"></div>
            <div class="gauge-marker marker-mid" title="Good Standard"></div>
            <div class="gauge-marker marker-end" title="Elite Standard"></div>
          </div>
          <div class="standard-gauge-labels">
            <span class="gauge-delta-text">${progress.deltaText}</span>
            <span class="gauge-pct-text">${progress.pct}%</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  let athleteTier = "FOUNDATION LIFTER";
  let tierClass = "tier-building";
  if (eliteCount >= 5) {
    athleteTier = "TITAN // ELITE MASTER";
    tierClass = "tier-elite";
  } else if (goodCount >= 5 || eliteCount >= 3) {
    athleteTier = "PRO ATHLETE // ADVANCED";
    tierClass = "tier-pro";
  } else if (goodCount >= 3) {
    athleteTier = "INTERMEDIATE LIFTER";
    tierClass = "tier-intermediate";
  }

  const heroHtml = `
    <div class="standards-hero-card">
      <div class="standards-hero-header">
        <div>
          <span class="standards-hero-tag">PERIODIZED TARGETS</span>
          <h2 class="standards-hero-title">FOUNDATIONAL LIFTS</h2>
        </div>
        <div class="tier-badge ${tierClass}">
          <span class="tier-pulse"></span>
          <span>${athleteTier}</span>
        </div>
      </div>

      <!-- Dynamic Bodyweight Controller -->
      <div class="bodyweight-controller-box">
        <div class="bw-label-row">
          <span class="bw-title">CURRENT BODYWEIGHT</span>
          <span class="bw-hint">All targets calibrate automatically</span>
        </div>
        <div class="bw-stepper-row">
          <button class="bw-step-btn" onclick="adjustBodyweight(-5)" aria-label="Subtract 5 pounds">-5</button>
          <button class="bw-step-btn" onclick="adjustBodyweight(-1)" aria-label="Subtract 1 pound">-1</button>
          <div class="bw-input-wrap">
            <input type="number" class="bw-input" id="bodyweightInput" value="${bw}" onchange="onBodyweightChange(this)" min="80" max="450">
            <span class="bw-unit">LBS</span>
          </div>
          <button class="bw-step-btn" onclick="adjustBodyweight(1)" aria-label="Add 1 pound">+1</button>
          <button class="bw-step-btn" onclick="adjustBodyweight(5)" aria-label="Add 5 pounds">+5</button>
        </div>
      </div>

      <!-- Scoreboard Counters -->
      <div class="standards-scoreboard">
        <div class="scoreboard-metric">
          <div class="metric-val ${goodCount >= 3 ? 'highlight-emerald' : ''}">${goodCount} <span class="metric-denom">/ ${STRENGTH_STANDARDS.length}</span></div>
          <div class="metric-lbl">Good Standards Met</div>
        </div>
        <div class="scoreboard-metric">
          <div class="metric-val ${eliteCount >= 1 ? 'highlight-gold' : ''}">${eliteCount} <span class="metric-denom">/ ${STRENGTH_STANDARDS.length}</span></div>
          <div class="metric-lbl">Elite Standards Met</div>
        </div>
        <div class="scoreboard-metric">
          <div class="metric-val highlight-cyan">${Math.round(((goodCount + eliteCount) / (STRENGTH_STANDARDS.length * 2)) * 100)}%</div>
          <div class="metric-lbl">Total Mastery</div>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = subtabsHtml + heroHtml + `<div class="standards-list">${cardsHtml}</div>`;
}

function renderOtherExercisesProgress(otherStats) {
  const bw = getUserBodyweight();
  const activeOnly = otherStats.filter(e => e.workoutsEntered > 0);
  const totalOtherWorkouts = activeOnly.reduce((sum, e) => sum + e.workoutsEntered, 0);
  const totalOtherSets = activeOnly.reduce((sum, e) => sum + e.totalSets, 0);
  const totalOtherVolume = activeOnly.reduce((sum, e) => sum + e.totalVolume, 0);

  // Compute average % of bodyweight across logged weighted lifts
  const weightedLifts = activeOnly.filter(e => e.bestE1RM > 0);
  const avgPctBw = weightedLifts.length > 0 && bw > 0
    ? Math.round(weightedLifts.reduce((sum, e) => sum + (e.bestE1RM / bw) * 100, 0) / weightedLifts.length)
    : 0;

  // Available categories
  const categories = ['All', 'Lower', 'Upper Pull', 'Upper Push', 'Full Body', 'Core'];

  // Filter exercises
  let displayed = otherShowUnlogged ? otherStats : activeOnly;
  if (otherProgressCategory !== 'All') {
    displayed = displayed.filter(e => (e.category || '').toLowerCase().includes(otherProgressCategory.toLowerCase()));
  }

  const heroHtml = `
    <div class="standards-hero-card other-hero-card">
      <div class="standards-hero-header">
        <div>
          <span class="standards-hero-tag">FREQUENCY & RELATIVE STRENGTH</span>
          <h2 class="standards-hero-title">OTHER EXERCISES PROGRESS</h2>
          <div class="other-hero-subtitle">Descended by workouts entered, calibrated to your current bodyweight (${bw} lbs).</div>
        </div>
        <div class="tier-badge tier-pro">
          <span class="tier-pulse"></span>
          <span>${activeOnly.length} EXERCISES LOGGED</span>
        </div>
      </div>

      <!-- Dynamic Bodyweight Controller -->
      <div class="bodyweight-controller-box">
        <div class="bw-label-row">
          <span class="bw-title">CURRENT BODYWEIGHT</span>
          <span class="bw-hint">All % BW ratios calibrate automatically</span>
        </div>
        <div class="bw-stepper-row">
          <button class="bw-step-btn" onclick="adjustBodyweight(-5)" aria-label="Subtract 5 pounds">-5</button>
          <button class="bw-step-btn" onclick="adjustBodyweight(-1)" aria-label="Subtract 1 pound">-1</button>
          <div class="bw-input-wrap">
            <input type="number" class="bw-input" id="bodyweightInputOther" value="${bw}" onchange="onBodyweightChange(this)" min="80" max="450">
            <span class="bw-unit">LBS</span>
          </div>
          <button class="bw-step-btn" onclick="adjustBodyweight(1)" aria-label="Add 1 pound">+1</button>
          <button class="bw-step-btn" onclick="adjustBodyweight(5)" aria-label="Add 5 pounds">+5</button>
        </div>
      </div>

      <!-- Scoreboard Counters -->
      <div class="standards-scoreboard">
        <div class="scoreboard-metric">
          <div class="metric-val highlight-gold">${totalOtherWorkouts}</div>
          <div class="metric-lbl">Workouts Entered</div>
        </div>
        <div class="scoreboard-metric">
          <div class="metric-val highlight-cyan">${avgPctBw > 0 ? `${avgPctBw}%` : '—'} <span class="metric-denom">BW</span></div>
          <div class="metric-lbl">Avg Relative 1RM</div>
        </div>
        <div class="scoreboard-metric">
          <div class="metric-val highlight-emerald">${(totalOtherVolume / 1000).toFixed(1)}k <span class="metric-denom">lbs</span></div>
          <div class="metric-lbl">Volume Moved</div>
        </div>
      </div>

      <!-- Category Filter Chips & Bank Toggle -->
      <div class="other-controls-row">
        <div class="other-category-chips">
          ${categories.map(cat => {
            const count = cat === 'All' 
              ? activeOnly.length 
              : activeOnly.filter(e => (e.category || '').toLowerCase().includes(cat.toLowerCase())).length;
            const activeClass = otherProgressCategory === cat ? 'active' : '';
            return `
              <button class="cat-chip ${activeClass}" onclick="setOtherProgressCategory('${cat}')">
                ${cat} <span class="cat-chip-count">${count}</span>
              </button>
            `;
          }).join('')}
        </div>
        <button class="unlogged-toggle-btn ${otherShowUnlogged ? 'active' : ''}" onclick="toggleOtherShowUnlogged()">
          ${otherShowUnlogged ? '✓ Showing All Bank' : `+ Show All Bank (${otherStats.length})`}
        </button>
      </div>
    </div>
  `;

  if (displayed.length === 0) {
    return heroHtml + `
      <div class="empty-state-card">
        <div class="empty-icon">📊</div>
        <div class="empty-title">No Exercises Logged in "${otherProgressCategory}"</div>
        <div class="empty-subtitle">Switch filter to "All" or click "+ Show All Bank" to view all available exercise templates.</div>
      </div>
    `;
  }

  const cardsHtml = displayed.map((item, idx) => {
    const isCal = isCalisthenicsExercise(item.name);
    const rankClass = getRankBadgeClass(item.rank);
    const rankText = item.rank ? `#${item.rank}` : `•`;
    const workoutPlural = item.workoutsEntered === 1 ? 'WORKOUT' : 'WORKOUTS';
    const workoutsBadgeClass = item.workoutsEntered > 0 ? 'highlight-gold' : 'pill-zero';

    // Calculate % of bodyweight
    let bwPct = null;
    let bwMult = null;
    if (item.bestE1RM > 0 && bw > 0) {
      bwPct = Math.round((item.bestE1RM / bw) * 100);
      bwMult = (item.bestE1RM / bw).toFixed(2);
    } else if (isCal && bw > 0) {
      if (item.bestWeight > 0) {
        const totalLoad = bw + item.bestWeight;
        bwPct = Math.round((totalLoad / bw) * 100);
        bwMult = (totalLoad / bw).toFixed(2);
      } else if (item.bestWeightReps > 0) {
        bwPct = 100;
        bwMult = "1.00";
      }
    }

    const scoreSubHint = item.bestSetInfo 
      ? (isCal 
          ? `Best set: ${item.bestSetInfo.reps} reps`
          : `Best: ${item.bestSetInfo.weight} lbs × ${item.bestSetInfo.reps} reps`)
      : 'No logged sets';

    return `
      <div class="standard-card other-exercise-card" id="other-ex-${idx}">
        <div class="standard-card-header">
          <div class="standard-info">
            <div class="rank-badge ${rankClass}">${rankText}</div>
            <div>
              <div class="standard-title">${item.name}</div>
              <div class="standard-cat">${(item.category || 'Other').toUpperCase()}</div>
            </div>
          </div>
          <div class="other-card-badges">
            ${bwPct !== null ? `
              <span class="bw-pct-badge" title="Relative Strength: ${bwMult}× bodyweight (${bw} lbs)">
                <span class="bw-pct-symbol">⚖️</span>
                <strong>${bwPct}%</strong> BW
                <span class="bw-mult">(${bwMult}×)</span>
              </span>
            ` : ''}
            <span class="workouts-count-pill ${workoutsBadgeClass}">
              <span class="fire-icon">${item.workoutsEntered > 0 ? '🔥' : '○'}</span>
              <strong>${item.workoutsEntered}</strong> ${workoutPlural}
            </span>
            ${item.workoutsEntered > 1 ? `<span class="progress-delta-pill ${item.deltaClass}">${item.deltaText}</span>` : ''}
          </div>
        </div>

        <div class="other-metrics-grid">
          <div class="other-metric-item">
            <span class="other-metric-lbl">${isCal ? 'BEST REPS' : 'EST. 1RM'}</span>
            <div class="other-metric-val">
              <span class="val-num">${isCal ? (item.bestWeightReps || '—') : (item.bestE1RM || '—')}</span>
              ${(isCal ? item.bestWeightReps : item.bestE1RM) ? `<span class="val-unit">${isCal ? 'reps' : 'lbs'}</span>` : ''}
            </div>
            ${bwPct !== null ? `
              <div class="other-bw-subline">
                <span class="subline-pct">${bwPct}% BW</span> <span class="subline-mult">(${bwMult}×)</span>
              </div>
            ` : ''}
            <div class="other-source-hint" title="${scoreSubHint}">${scoreSubHint}</div>
          </div>

          <div class="other-metric-item">
            <span class="other-metric-lbl">HEAVIEST SET</span>
            <div class="other-metric-val">
              <span class="val-num">${item.bestWeight > 0 ? item.bestWeight : (isCal ? 'BW' : '—')}</span>
              ${item.bestWeight > 0 ? '<span class="val-unit">lbs</span>' : ''}
            </div>
            <div class="other-source-hint">${item.bestWeight > 0 ? `× ${item.bestWeightReps} reps` : (item.bestWeightReps > 0 ? `${item.bestWeightReps} reps` : '—')}</div>
          </div>

          <div class="other-metric-item">
            <span class="other-metric-lbl">TOTAL SETS</span>
            <div class="other-metric-val">
              <span class="val-num">${item.totalSets}</span>
              <span class="val-unit">sets</span>
            </div>
            <div class="other-source-hint">${item.workoutsEntered} ${workoutPlural.toLowerCase()} entered</div>
          </div>

          <div class="other-metric-item">
            <span class="other-metric-lbl">TOTAL VOLUME</span>
            <div class="other-metric-val">
              <span class="val-num">${item.totalVolume > 0 ? Number(item.totalVolume).toLocaleString() : '0'}</span>
              <span class="val-unit">lbs</span>
            </div>
            <div class="other-source-hint">Accumulated work</div>
          </div>
        </div>

        <!-- Recent Session History Strip -->
        ${item.sessionList.length > 0 ? `
          <div class="other-sessions-section">
            <div class="other-sessions-header">
              <span class="other-sessions-title">WORKOUT LOG HISTORY</span>
              <span class="other-sessions-count">${item.workoutsEntered} ${item.workoutsEntered === 1 ? 'session' : 'sessions'} recorded</span>
            </div>
            <div class="other-sessions-strip">
              ${item.sessionList.slice(-4).reverse().map(s => `
                <div class="session-chip">
                  <div class="session-chip-date">${formatSessionDate(s.date)}</div>
                  <div class="session-chip-stat">${s.sets.length} sets · Best: <strong>${s.bestWeight > 0 ? `${s.bestWeight}×${s.bestReps}` : `${s.bestReps} reps`}</strong></div>
                  ${s.bestE1RM > 0 ? `<div class="session-chip-e1rm">e1RM: ${s.bestE1RM} lbs</div>` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        ` : `
          <div class="other-empty-hint">
            No workouts entered for this exercise yet. Add it to any Day 1–4 session or swap it into your active routine.
          </div>
        `}
      </div>
    `;
  }).join('');

  return heroHtml + `<div class="standards-list">${cardsHtml}</div>`;
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
let activeSwapCategory = 'All';

window.deleteExercise = function(exIdx) {
  syncInputsToWorkoutData();
  const workout = getWorkout(currentWeek, currentDay);
  if (workout.exercises.length <= 1) {
    showToast('Cannot remove the last exercise');
    return;
  }
  const exName = workout.exercises[exIdx].name;
  if (!confirm(`Remove ${exName} from this workout?`)) return;

  // Shift workoutData keys so entries for other exercises are preserved
  const newWorkoutData = {};
  workout.exercises.forEach((_, i) => {
    if (i < exIdx && workoutData[i]) {
      newWorkoutData[i] = workoutData[i];
    } else if (i > exIdx && workoutData[i]) {
      newWorkoutData[i - 1] = workoutData[i];
    }
  });
  workoutData = newWorkoutData;

  const updated = workout.exercises.filter((_, i) => i !== exIdx);
  saveCustomization(updated);
  saveAutoSave();

  renderWorkout();
  applyWorkoutDataToUI();
  updateProgress();
  showToast(`${exName} removed`);
};

// ===================================================================
// DYNAMIC SETS (ADD & REMOVE SETS)
// ===================================================================
window.addSet = function(exIdx) {
  syncInputsToWorkoutData();
  const workout = getWorkout(currentWeek, currentDay);
  if (!workout.exercises[exIdx]) return;
  const ex = workout.exercises[exIdx];
  ex.sets = (ex.sets || 3) + 1;
  saveCustomization(workout.exercises);
  saveAutoSave();
  renderWorkout();
  applyWorkoutDataToUI();
  updateProgress();
  showToast(`Added set to ${ex.name} (${ex.sets} sets)`);
};

window.removeSet = function(exIdx) {
  syncInputsToWorkoutData();
  const workout = getWorkout(currentWeek, currentDay);
  if (!workout.exercises[exIdx]) return;
  const ex = workout.exercises[exIdx];
  if (ex.sets <= 1) {
    showToast('Exercise must have at least 1 set');
    return;
  }
  const lastSetIdx = ex.sets - 1;
  if (workoutData[exIdx]) {
    delete workoutData[exIdx][lastSetIdx];
  }
  ex.sets -= 1;
  saveCustomization(workout.exercises);
  saveAutoSave();
  renderWorkout();
  applyWorkoutDataToUI();
  updateProgress();
  showToast(`Removed set from ${ex.name} (${ex.sets} sets)`);
};

window.deleteSpecificSet = function(exIdx, setIdx) {
  syncInputsToWorkoutData();
  const workout = getWorkout(currentWeek, currentDay);
  if (!workout.exercises[exIdx]) return;
  const ex = workout.exercises[exIdx];
  if (ex.sets <= 1) {
    showToast('Exercise must have at least 1 set');
    return;
  }
  if (workoutData[exIdx]) {
    const newExData = {};
    for (let s = 0; s < ex.sets; s++) {
      if (s < setIdx && workoutData[exIdx][s]) {
        newExData[s] = workoutData[exIdx][s];
      } else if (s > setIdx && workoutData[exIdx][s]) {
        newExData[s - 1] = workoutData[exIdx][s];
      }
    }
    workoutData[exIdx] = newExData;
  }
  ex.sets -= 1;
  saveCustomization(workout.exercises);
  saveAutoSave();
  renderWorkout();
  applyWorkoutDataToUI();
  updateProgress();
  showToast(`Set ${setIdx + 1} removed`);
};

// ===================================================================
// ADD EXERCISE FROM PREDEFINED DROPDOWN LIST
// ===================================================================
window.addSelectedExercise = function() {
  const select = document.getElementById('addExerciseSelect');
  if (!select) return;
  const selectedName = select.value;
  if (!selectedName) {
    showToast('Select an exercise from the dropdown first');
    return;
  }

  syncInputsToWorkoutData();
  const workout = getWorkout(currentWeek, currentDay);
  if (workout.exercises.some(e => e.name.toLowerCase() === selectedName.toLowerCase())) {
    showToast(`${selectedName} is already in today's workout`);
    return;
  }

  const exData = ALL_EXERCISES.find(e => e.name === selectedName) || { name: selectedName, rank: null, category: "Accessory" };
  const phase = PHASES.find(p => p.weeks.includes(currentWeek)) || PHASES[0];

  const newExercise = {
    name: exData.name,
    rank: exData.rank,
    type: "accessory",
    sets: phase.accSets || 3,
    repsRange: phase.accReps || "8-12",
  };

  workout.exercises.push(newExercise);
  saveCustomization(workout.exercises);
  saveAutoSave();

  renderWorkout();
  applyWorkoutDataToUI();
  updateProgress();
  populateAddExerciseDropdown();

  setTimeout(() => {
    const newIdx = workout.exercises.length - 1;
    const cardEl = document.getElementById(`card-${newIdx}`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      cardEl.classList.add('highlight-pulse');
      setTimeout(() => cardEl.classList.remove('highlight-pulse'), 1200);
    }
  }, 100);

  showToast(`${exData.name} added to workout`);
};

function populateAddExerciseDropdown() {
  const select = document.getElementById('addExerciseSelect');
  if (!select) return;

  const workout = getWorkout(currentWeek, currentDay);
  const currentNames = new Set((workout.exercises || []).map(e => e.name.toLowerCase()));

  // Group ALL_EXERCISES by category
  const categories = {};
  ALL_EXERCISES.forEach(ex => {
    const cat = ex.category || 'Other';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(ex);
  });

  let optionsHtml = '<option value="" disabled selected>+ Select exercise to add to workout...</option>';
  for (const [cat, exercises] of Object.entries(categories)) {
    optionsHtml += `<optgroup label="── ${cat.toUpperCase()} ──">`;
    exercises.forEach(ex => {
      const inWorkout = currentNames.has(ex.name.toLowerCase());
      const rankBadge = ex.rank ? `(#${ex.rank})` : '';
      if (inWorkout) {
        optionsHtml += `<option value="${ex.name}" disabled>${ex.name} ${rankBadge} · Added</option>`;
      } else {
        optionsHtml += `<option value="${ex.name}">${ex.name} ${rankBadge}</option>`;
      }
    });
    optionsHtml += '</optgroup>';
  }

  select.innerHTML = optionsHtml;
};

window.openSwapModal = function(exIdx) {
  swapTargetIdx = exIdx;
  activeSwapCategory = 'All';
  const workout = getWorkout(currentWeek, currentDay);
  const current = workout.exercises[exIdx];
  document.getElementById('swapModalTitle').textContent = `Replace ${current.name}`;
  document.getElementById('swapSearch').value = '';
  renderSwapCategoryChips();
  renderSwapOptions();
  document.getElementById('swapModal').classList.add('active');
  setTimeout(() => document.getElementById('swapSearch').focus(), 100);
};

window.closeSwapModal = function() {
  document.getElementById('swapModal').classList.remove('active');
  swapTargetIdx = null;
};

function renderSwapCategoryChips() {
  const chipsContainer = document.getElementById('swapCategoryChips');
  if (!chipsContainer) return;
  const categories = ['All', 'Upper Push', 'Upper Pull', 'Lower', 'Core', 'Full Body'];
  chipsContainer.innerHTML = categories.map(cat => `
    <button class="swap-chip ${cat === activeSwapCategory ? 'active' : ''}" onclick="selectSwapCategory('${cat}')">
      ${cat}
    </button>
  `).join('');
}

window.selectSwapCategory = function(cat) {
  activeSwapCategory = cat;
  renderSwapCategoryChips();
  renderSwapOptions(document.getElementById('swapSearch').value);
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
    if (activeSwapCategory !== 'All' && ex.category !== activeSwapCategory) return;
    if (filterLower && !ex.name.toLowerCase().includes(filterLower) && !ex.category.toLowerCase().includes(filterLower)) return;
    if (!grouped[ex.category]) grouped[ex.category] = [];
    grouped[ex.category].push(ex);
  });

  const container = document.getElementById('swapOptions');
  let html = '';
  const entries = Object.entries(grouped);
  if (entries.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:24px;color:var(--text-muted);font-size:0.75rem;">No exercises found matching "${filter}"</div>`;
    return;
  }

  for (const [cat, exercises] of entries) {
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
    if (i !== swapTargetIdx) return { name: ex.name, rank: ex.rank, type: ex.type, sets: ex.sets, repsRange: ex.repsRange };
    return { name: newExData.name, rank: newExData.rank, type: oldEx.type, sets: oldEx.sets, repsRange: oldEx.repsRange };
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
  const toSave = exerciseList.map(ex => ({
    name: ex.name,
    rank: ex.rank,
    type: ex.type,
    sets: ex.sets,
    repsRange: ex.repsRange
  }));
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
