/* SKY TRADERS - HERO CANVAS PARTICLES & FLOATING LEAVES */

document.addEventListener('DOMContentLoaded', () => {
  initHeroParticles();
  createFloatingLeaves();
  initHeroParallax();
});

/* 1. GOLDEN PARTICLES CANVAS */
function initHeroParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 55;

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = -Math.random() * 0.8 - 0.2;
      this.opacity = Math.random() * 0.7 + 0.2;
      this.color = Math.random() > 0.3 ? '#D4AF37' : '#F8F5EE';
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.y < 0 || this.x < 0 || this.x > width) {
        this.reset();
        this.y = height + 10;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#D4AF37';
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* 2. FLOATING COCONUT LEAVES GENERATOR */
function createFloatingLeaves() {
  const container = document.querySelector('.floating-leaves-container');
  if (!container) return;

  const leafSVG = `
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 5 Q80 20 90 50 Q60 60 50 95 Q40 60 10 50 Q20 20 50 5Z" fill="url(#leafGradC)"/>
      <path d="M50 5 L50 95" stroke="#D4AF37" stroke-width="1.5" opacity="0.6"/>
      <defs>
        <linearGradient id="leafGradC" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#2D7A4D"/>
          <stop offset="100%" stop-color="#0B3D2E"/>
        </linearGradient>
      </defs>
    </svg>
  `;

  for (let i = 0; i < 8; i++) {
    const leaf = document.createElement('div');
    leaf.classList.add('leaf');
    leaf.innerHTML = leafSVG;

    const left = Math.random() * 95;
    const delay = Math.random() * 10;
    const duration = Math.random() * 8 + 10;
    const scale = Math.random() * 0.6 + 0.6;

    leaf.style.left = `${left}%`;
    leaf.style.animationDelay = `${delay}s`;
    leaf.style.animationDuration = `${duration}s`;
    leaf.style.transform = `scale(${scale})`;

    container.appendChild(leaf);
  }
}

/* 3. HERO MOUSE PARALLAX */
function initHeroParallax() {
  const heroContent = document.querySelector('.hero-content');
  if (!heroContent) return;

  window.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 20;

    heroContent.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });
}
