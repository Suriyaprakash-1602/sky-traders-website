/* SKY TRADERS - GALLERY MASONRY & LIGHTBOX MODAL */

document.addEventListener('DOMContentLoaded', () => {
  initGalleryFilters();
  initLightbox();
});

function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
          item.classList.add('active');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  if (!lightbox) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && lightboxImg) {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}
