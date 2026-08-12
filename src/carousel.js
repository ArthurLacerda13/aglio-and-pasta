// Auto-scrolling carousel with dot indicators
document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.getElementById('hero-carousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.carousel-item');
  const dots = carousel.querySelectorAll('.carousel-dot');
  const totalSlides = slides.length;
  let currentSlide = 0;
  let autoSlideInterval;

  function goToSlide(index) {
    currentSlide = index;
    const slideWidth = carousel.offsetWidth;
    carousel.scrollTo({
      left: currentSlide * slideWidth,
      behavior: 'smooth',
    });
    updateDots();
  }

  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % totalSlides);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Dot click handlers
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopAutoSlide();
      goToSlide(parseInt(dot.dataset.slide));
      startAutoSlide();
    });
  });

  // Pause on hover
  carousel.addEventListener('mouseenter', stopAutoSlide);
  carousel.addEventListener('mouseleave', startAutoSlide);

  // Touch support
  carousel.addEventListener('touchstart', stopAutoSlide);
  carousel.addEventListener('touchend', () => {
    setTimeout(startAutoSlide, 2000);
  });

  // Sync dots on manual scroll
  carousel.addEventListener('scroll', () => {
    const scrollLeft = carousel.scrollLeft;
    const slideWidth = carousel.offsetWidth;
    const newSlide = Math.round(scrollLeft / slideWidth);
    if (newSlide !== currentSlide) {
      currentSlide = newSlide;
      updateDots();
    }
  });

  startAutoSlide();
});
