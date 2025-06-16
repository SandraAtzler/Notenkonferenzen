
let unlocked = false;
let activeButton = null;
let startTime = null;
let timerInterval = null;

const status = document.getElementById("status");
const lock = document.getElementById("lock");
const buttons = document.querySelectorAll(".class-button");

function formatTime(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m} min ${sec} sek`;
}

function updateTimer() {
  const now = Date.now();
  const diff = now - startTime;
  const formatted = formatTime(diff);
  status.innerHTML = `Aktive Klasse: <strong>${activeButton.textContent}</strong> – seit <span id="timer">${formatted}</span>`;
}

function resetButtons() {
  buttons.forEach((btn) => btn.classList.remove("active"));
}
function unlock() {
  unlocked = true;
  const lockIcon = document.getElementById('lockIcon');
  lockIcon.src = "https://iconduck.com/icons/22132/lock-open-512.png"; // echtes geöffnetes Schloss
  lockIcon.style.opacity = 0.3;
}

function selectClass(className) {
  if (!unlocked) return;
  // ...
  unlocked = false;
  const lockIcon = document.getElementById('lockIcon');
  lockIcon.src = "https://cdn-icons-png.flaticon.com/512/3064/3064197.png"; // zurück auf geschlossenes Schloss
  lockIcon.style.opacity = 1;
}
lock.addEventListener("dblclick", () => {
  unlocked = !unlocked;
  lock.style.opacity = unlocked ? 1 : 0.6;
});

buttons.forEach((btn) => {
  btn.addEventListener("dblclick", () => {
    if (!unlocked) return;

    if (activeButton === btn) return; // Already active

    resetButtons();
    btn.classList.add("active");
    activeButton = btn;
    startTime = Date.now();
    updateTimer();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
  });
});
