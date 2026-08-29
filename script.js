const MONTHS = [
  { idx: 0, label: "March 2026" },
  { idx: 1, label: "April 2026" },
  { idx: 2, label: "May 2026" },
  { idx: 3, label: "June 2026" },
  { idx: 4, label: "July 2026" },
  { idx: 5, label: "August 2026" },
  { idx: 6, label: "September 2026" },
  { idx: 7, label: "October 2026" },
  { idx: 8, label: "November 2026" },
  { idx: 9, label: "December 2026" },
  { idx: 10, label: "January 2027" },
  { idx: 11, label: "February 2027" },
  { idx: 12, label: "March 2027" },
];

const STORAGE_KEY = "devaansh-month-notes";

function loadNotes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

const strip = document.getElementById("monthStrip");
const backdrop = document.getElementById("modalBackdrop");
const modalEyebrow = document.getElementById("modalEyebrow");
const modalTitle = document.getElementById("modalTitle");
const modalNotes = document.getElementById("modalNotes");
const modalSave = document.getElementById("modalSave");
const modalClose = document.getElementById("modalClose");
const modalSavedMsg = document.getElementById("modalSavedMsg");

let activeMonth = null;
let notes = loadNotes();

function renderTiles() {
  strip.innerHTML = "";
  MONTHS.forEach((m) => {
    const tile = document.createElement("button");
    tile.className = "month-tile" + (notes[m.idx] ? " has-note" : "");
    tile.innerHTML = `
      <span class="m-filled-dot"></span>
      <span class="m-index">${String(m.idx).padStart(2, "0")}</span>
      <span class="m-label">${m.label}</span>
    `;
    tile.addEventListener("click", () => openModal(m));
    strip.appendChild(tile);
  });
}

function openModal(month) {
  activeMonth = month;
  modalEyebrow.textContent = `Month ${month.idx}`;
  modalTitle.textContent = month.label;
  modalNotes.value = notes[month.idx] || "";
  modalSavedMsg.classList.remove("show");
  backdrop.classList.add("open");
}

function closeModal() {
  backdrop.classList.remove("open");
  activeMonth = null;
}

modalSave.addEventListener("click", () => {
  if (!activeMonth) return;
  const text = modalNotes.value.trim();
  if (text) {
    notes[activeMonth.idx] = text;
  } else {
    delete notes[activeMonth.idx];
  }
  saveNotes(notes);
  renderTiles();
  modalSavedMsg.classList.add("show");
});

modalClose.addEventListener("click", closeModal);
backdrop.addEventListener("click", (e) => {
  if (e.target === backdrop) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

renderTiles();
