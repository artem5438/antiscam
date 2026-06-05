const TEXT_SIZE_KEY = "text-size";
const TEXT_SIZE_LEGACY_KEY = "antiScamTextLarge";
const TEXT_SIZES = ["normal", "medium", "large"];

function initTextSize() {
  const buttons = document.querySelectorAll("[data-text-size]");

  function getSavedSize() {
    const saved = localStorage.getItem(TEXT_SIZE_KEY);
    if (saved && TEXT_SIZES.includes(saved)) {
      return saved;
    }

    if (localStorage.getItem(TEXT_SIZE_LEGACY_KEY) === "1") {
      return "large";
    }

    return "normal";
  }

  function apply(size) {
    const activeSize = TEXT_SIZES.includes(size) ? size : "normal";
    document.documentElement.classList.remove("text-medium", "text-large");

    if (activeSize === "medium") {
      document.documentElement.classList.add("text-medium");
    } else if (activeSize === "large") {
      document.documentElement.classList.add("text-large");
    }

    buttons.forEach((btn) => {
      const isActive = btn.dataset.textSize === activeSize;
      btn.setAttribute("aria-pressed", String(isActive));
    });
  }

  apply(getSavedSize());

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const size = btn.dataset.textSize;
      if (!TEXT_SIZES.includes(size)) return;
      localStorage.setItem(TEXT_SIZE_KEY, size);
      apply(size);
    });
  });
}

const checklist = document.querySelector("[data-checklist]");
const scoreNode = document.querySelector("[data-score]");
const progressFill = document.querySelector("[data-progress-fill]");
const resetBtn = document.querySelector("[data-reset]");
const storageKey = "antiScamChecklistV1";

function saveState() {
  if (!checklist) return;
  const checked = Array.from(checklist.querySelectorAll("input[type='checkbox']")).map(
    (item) => item.checked,
  );
  localStorage.setItem(storageKey, JSON.stringify(checked));
}

function renderScore() {
  if (!checklist || !scoreNode) return;
  const items = checklist.querySelectorAll("input[type='checkbox']");
  const total = items.length;
  const completed = Array.from(items).filter((item) => item.checked).length;
  scoreNode.textContent = `${completed}/${total}`;
  if (progressFill && total > 0) {
    const pct = Math.round((completed / total) * 100);
    progressFill.style.width = `${pct}%`;
    const bar = progressFill.closest("[role='progressbar']");
    if (bar) {
      bar.setAttribute("aria-valuenow", String(completed));
      bar.setAttribute("aria-valuemax", String(total));
    }
  }
}

function loadState() {
  if (!checklist) return;
  const raw = localStorage.getItem(storageKey);
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    checklist.querySelectorAll("input[type='checkbox']").forEach((node, idx) => {
      node.checked = Boolean(saved[idx]);
    });
  } catch (error) {
    console.warn("Could not restore checklist state", error);
  }
}

if (checklist) {
  loadState();
  renderScore();
  checklist.addEventListener("change", () => {
    saveState();
    renderScore();
  });
}

if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    if (!checklist) return;
    checklist.querySelectorAll("input[type='checkbox']").forEach((node) => {
      node.checked = false;
    });
    localStorage.removeItem(storageKey);
    renderScore();
  });
}

initTextSize();
