const MONTHS = [
  { idx: 0, label: "March 2026", photo: null },
  { idx: 1, label: "April 2026", photo: "images/month-01.jpg" },
  { idx: 2, label: "May 2026", photo: "images/month-02.jpg" },
  { idx: 3, label: "June 2026", photo: "images/month-03.jpg" },
  { idx: 4, label: "July 2026", photo: "images/month-04.jpg" },
  { idx: 5, label: "August 2026", photo: "images/month-05.jpg" },
  { idx: 6, label: "September 2026", photo: null },
  { idx: 7, label: "October 2026", photo: null },
  { idx: 8, label: "November 2026", photo: null },
  { idx: 9, label: "December 2026", photo: null },
  { idx: 10, label: "January 2027", photo: null },
  { idx: 11, label: "February 2027", photo: null },
  { idx: 12, label: "March 2027", photo: null },
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
const modalPhotoSlot = document.getElementById("modalPhotoSlot");

let activeMonth = null;
let notes = loadNotes();

function renderTiles() {
  strip.innerHTML = "";
  MONTHS.forEach((m) => {
    const tile = document.createElement("button");
    const hasPhoto = !!m.photo;
    tile.className = "month-tile" + (notes[m.idx] ? " has-note" : "") + (hasPhoto ? " has-photo" : "");
    if (hasPhoto) {
      tile.style.backgroundImage = `linear-gradient(180deg, rgba(36,26,18,0.05), rgba(36,26,18,0.55)), url('${m.photo}')`;
    }
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

  if (month.photo) {
    modalPhotoSlot.innerHTML = `<img src="${month.photo}" alt="${month.label} photo" class="modal-photo-img">`;
  } else {
    modalPhotoSlot.innerHTML = `<span>No photo added yet</span>`;
  }

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
