const filterButtons = document.querySelectorAll(".filter-button");
const artCards = document.querySelectorAll(".art-card");
const modal = document.getElementById("art-modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalMeta = document.getElementById("modal-meta");
const modalDescription = document.getElementById("modal-description");
const modalCloseButtons = modal ? modal.querySelectorAll("[data-close-modal]") : [];
const contactForm = document.getElementById("contact-form");
const formMessage = document.querySelector(".form-message");
const yearEl = document.getElementById("current-year");

let lastFocusedElement = null;

const setActiveFilter = (selected) => {
  filterButtons.forEach((button) => {
    button.classList.toggle("is-active", button === selected);
  });
};

const filterGallery = (category) => {
  artCards.forEach((card) => {
    const matches = category === "all" || card.dataset.category === category;
    card.hidden = !matches;
  });
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    setActiveFilter(button);
    filterGallery(filter);
  });
});

const openModal = (card) => {
  if (!modal) return;
  lastFocusedElement = document.activeElement;
  modalTitle.textContent = card.dataset.title || "";
  modalMeta.textContent = `${card.dataset.year || ""} · ${card.dataset.size || ""}`;
  modalDescription.textContent = card.dataset.description || "";
  modalImage.style.setProperty("--modal-gradient", card.dataset.gradient);
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  const closeButton = modal.querySelector(".modal-close");
  if (closeButton) {
    closeButton.focus();
  }
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
};

artCards.forEach((card) => {
  card.addEventListener("click", () => openModal(card));
});

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && modal.classList.contains("is-open")) {
    closeModal();
  }
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }
    if (formMessage) {
      formMessage.textContent = "感謝你的訊息！Mayasalu 將盡快回覆。";
    }
    contactForm.reset();
  });
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
