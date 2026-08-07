/* SKY TRADERS - TESTIMONIAL & PARTNERS CAROUSEL */

document.addEventListener('DOMContentLoaded', () => {
  initTestimonialCarousel();
});

function initTestimonialCarousel() {
  const testimonials = [
    {
      quote: "SKY Traders has been our primary coconut vendor for over 3 years. Their semi-husked coconuts have consistent weight, zero spoilage, and superb shelf life in Dubai.",
      name: "Ahmed Al-Maktoum",
      role: "Procurement Director, Gulf Fresh Foods (Dubai, UAE)",
      stars: 5
    },
    {
      quote: "Exceptional export grading and pristine packaging. Their shipment arrived right on schedule at Port Klang. Highly trustworthy export partner from India!",
      name: "Tan Sri Lee",
      role: "CEO, Malaya Agri Imports (Malaysia)",
      stars: 5
    },
    {
      quote: "Direct farm sourcing from Udumelpet makes a noticeable difference in freshness. SKY Traders delivers international export grade quality every single time.",
      name: "S. Jayaram",
      role: "Managing Director, Global Spice & Produce (Singapore)",
      stars: 5
    }
  ];

  let currentIndex = 0;
  const quoteEl = document.getElementById('testimonial-quote');
  const nameEl = document.getElementById('testimonial-name');
  const roleEl = document.getElementById('testimonial-role');
  const nextBtn = document.getElementById('test-next');
  const prevBtn = document.getElementById('test-prev');

  function updateTestimonial(index) {
    if (!quoteEl || !nameEl || !roleEl) return;

    const data = testimonials[index];
    quoteEl.style.opacity = 0;

    setTimeout(() => {
      quoteEl.innerText = `"${data.quote}"`;
      nameEl.innerText = data.name;
      roleEl.innerText = data.role;
      quoteEl.style.opacity = 1;
    }, 200);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      updateTestimonial(currentIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      updateTestimonial(currentIndex);
    });
  }

  // Autoplay every 6 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateTestimonial(currentIndex);
  }, 6000);
}
