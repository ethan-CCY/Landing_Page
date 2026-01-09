(function () {
  const doc = document
  const rootEl = doc.documentElement
  const body = doc.body

  rootEl.classList.remove('no-js')
  rootEl.classList.add('js')

  window.addEventListener('load', function () {
    body.classList.add('is-loaded')
  })

  const yearEl = doc.getElementById('current-year')
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear()
  }

  const filterButtons = Array.from(doc.querySelectorAll('.filter-button'))
  const galleryCards = Array.from(doc.querySelectorAll('.gallery-card'))

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter
      filterButtons.forEach((btn) => {
        btn.classList.toggle('is-active', btn === button)
        btn.setAttribute('aria-selected', btn === button ? 'true' : 'false')
      })

      galleryCards.forEach((card) => {
        const matches = filter === 'all' || card.dataset.category === filter
        card.hidden = !matches
      })
    })
  })

  const lightbox = doc.getElementById('lightbox')
  const lightboxImage = doc.querySelector('.lightbox-image')
  const lightboxTitle = doc.querySelector('.lightbox-title')
  const lightboxMeta = doc.querySelector('.lightbox-meta')
  const lightboxDescription = doc.querySelector('.lightbox-description')
  const lightboxClose = doc.querySelector('.lightbox-close')
  const lightboxBackdrop = doc.querySelector('.lightbox-backdrop')

  function openLightbox (card) {
    if (!lightbox) return
    lightboxImage.src = card.dataset.image
    lightboxImage.alt = `${card.dataset.title} 水彩畫`
    lightboxTitle.textContent = card.dataset.title
    lightboxMeta.textContent = `${card.dataset.year} ・${card.dataset.size}`
    lightboxDescription.textContent = card.dataset.description
    lightbox.classList.add('is-active')
    lightbox.setAttribute('aria-hidden', 'false')
    body.classList.add('is-locked')
  }

  function closeLightbox () {
    if (!lightbox) return
    lightbox.classList.remove('is-active')
    lightbox.setAttribute('aria-hidden', 'true')
    body.classList.remove('is-locked')
  }

  galleryCards.forEach((card) => {
    card.addEventListener('click', () => openLightbox(card))
  })

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox)
  }

  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', closeLightbox)
  }

  doc.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox && lightbox.classList.contains('is-active')) {
      closeLightbox()
    }
  })

  const contactForm = doc.getElementById('contact-form')
  const formStatus = doc.querySelector('.form-status')

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault()
      const name = contactForm.elements.name.value.trim()
      const email = contactForm.elements.email.value.trim()
      const message = contactForm.elements.message.value.trim()
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

      if (!name || !email || !message || !emailValid) {
        if (formStatus) {
          formStatus.textContent = '請確認姓名、Email 與訊息皆已正確填寫。'
        }
        return
      }

      if (formStatus) {
        formStatus.textContent = '已收到您的訊息，謝謝！'
      }
      contactForm.reset()
    })
  }
}())
