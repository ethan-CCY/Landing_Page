(() => {
  const filterButtons = document.querySelectorAll('.filter-button');
  const artCards = document.querySelectorAll('.art-card');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxInfo = document.getElementById('lightbox-info');
  const lightboxDescription = document.getElementById('lightbox-description');
  const lightboxClose = document.querySelector('.lightbox-close');
  const contactForm = document.getElementById('contact-form');
  const formNote = document.getElementById('form-note');
  const yearField = document.getElementById('current-year');

  if (yearField) {
    yearField.textContent = new Date().getFullYear();
  }

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const openLightbox = (button) => {
    if (!lightbox || !button) return;
    const image = button.dataset.image;
    const title = button.dataset.title;
    const year = button.dataset.year;
    const size = button.dataset.size;
    const description = button.dataset.description;

    lightboxImage.src = image;
    lightboxImage.alt = title;
    lightboxTitle.textContent = title;
    lightboxInfo.textContent = `${year} · ${size}`;
    lightboxDescription.textContent = description;

    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');

      artCards.forEach((card) => {
        const category = card.dataset.category;
        const shouldShow = filter === 'all' || filter === category;
        card.style.display = shouldShow ? '' : 'none';
      });
    });
  });

  artCards.forEach((card) => {
    const button = card.querySelector('.art-card-button');
    if (!button) return;
    button.addEventListener('click', () => openLightbox(button));
  });

  if (lightbox) {
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeLightbox();
    }
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      if (!contactForm.checkValidity()) {
        event.preventDefault();
        formNote.textContent = '請填寫所有必填欄位，並確認 Email 格式正確。';
        formNote.style.color = '#c25656';
        return;
      }

      event.preventDefault();
      formNote.textContent = '已收到您的訊息，稍後會與您聯繫。';
      formNote.style.color = '#4f7fa3';
      contactForm.reset();
    });
  }
})();
