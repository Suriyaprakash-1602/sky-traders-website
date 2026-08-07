/* SKY TRADERS - MAIN APPLICATION LOGIC */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initCounterStats();
  initTiltEffect();
  initMobileMenu();
});

/* 1. NAVBAR SCROLL & ACTIVE SECTION OBSERVER */
function initNavbar() {
  const navbarWrapper = document.getElementById('navbar-wrapper');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbarWrapper.classList.add('scrolled');
    } else {
      navbarWrapper.classList.remove('scrolled');
    }

    // Active Section Highlight
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* 2. MOBILE MENU DRAWER */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const closeBtn = document.getElementById('mobile-close');
  const menu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (toggleBtn && menu) {
    toggleBtn.addEventListener('click', () => {
      menu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn && menu) {
    closeBtn.addEventListener('click', () => {
      menu.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menu) menu.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });
}

/* 3. SCROLL REVEAL OBSERVER */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(el => revealObserver.observe(el));
}

/* 4. STATS ANIMATED COUNTER */
function initCounterStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let started = false;

  const statsSection = document.getElementById('statistics');
  if (!statsSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        statNumbers.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'));
          const suffix = counter.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 2000;
          const stepTime = Math.abs(Math.floor(duration / target));

          const timer = setInterval(() => {
            count += Math.ceil(target / 50);
            if (count >= target) {
              counter.innerText = target + suffix;
              clearInterval(timer);
            } else {
              counter.innerText = count + suffix;
            }
          }, 30);
        });
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statsSection);
}

/* 5. 3D CARD TILT EFFECT */
function initTiltEffect() {
  const cards = document.querySelectorAll('.why-card, .product-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
  });
}
