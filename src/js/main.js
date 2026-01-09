(() => {
  const filterButtons = document.querySelectorAll('.filter-button')
  const galleryCards = document.querySelectorAll('.gallery-card')
  const lightbox = document.getElementById('lightbox')
  const lightboxImage = document.querySelector('.lightbox-image')
  const lightboxTitle = document.querySelector('.lightbox-title')
  const lightboxMeta = document.querySelector('.lightbox-meta')
  const lightboxDesc = document.querySelector('.lightbox-desc')
  const closeTargets = document.querySelectorAll('[data-close]')
  const contactForm = document.getElementById('contact-form')
  const formMessage = document.querySelector('.form-message')

  const openLightbox = (card) => {
    const title = card.dataset.title
    const year = card.dataset.year
    const size = card.dataset.size
    const desc = card.dataset.desc
    const gradient = card.querySelector('.gallery-image').style.getPropertyValue('--gradient')

    lightboxTitle.textContent = title
    lightboxMeta.textContent = `${year}｜${size}`
    lightboxDesc.textContent = desc
    lightboxImage.style.setProperty('--gradient', gradient)
    lightbox.classList.add('is-open')
    lightbox.setAttribute('aria-hidden', 'false')
  }

  const closeLightbox = () => {
    lightbox.classList.remove('is-open')
    lightbox.setAttribute('aria-hidden', 'true')
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => {
        btn.classList.remove('is-active')
        btn.setAttribute('aria-selected', 'false')
      })
      button.classList.add('is-active')
      button.setAttribute('aria-selected', 'true')

      const filter = button.dataset.filter
      galleryCards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter
        card.hidden = !match
      })
    })
  })

  galleryCards.forEach((card) => {
    card.addEventListener('click', () => openLightbox(card))
  })

  closeTargets.forEach((target) => {
    target.addEventListener('click', closeLightbox)
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox()
    }
  })

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault()
      if (!contactForm.checkValidity()) {
        formMessage.textContent = '請完整填寫必填欄位後再送出。'
        return
      }
      formMessage.textContent = '訊息已送出（前端示意），我會盡快回覆您。'
      contactForm.reset()
    })
  }
})()
