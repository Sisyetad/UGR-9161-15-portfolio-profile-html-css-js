const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');


menuBtn.addEventListener('click', () => {
  const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true' || false;
  menuBtn.setAttribute('aria-expanded', !isExpanded);
  menuBtn.classList.toggle('open');
  nav.classList.toggle('active');
});



const dots = document.querySelectorAll('.navigation-dots .dot');
const firstSet = document.querySelector('.first-set');
const secondSet = document.querySelector('.second-set');
let currentSlide = 1;
let autoSlideInterval;

// Function to switch slides
function switchSlide(slideNumber) {
  currentSlide = slideNumber;

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index + 1 === currentSlide);
  });

  if (currentSlide === 1) {
    firstSet.style.animation = 'slide-left 10s infinite alternate';
    secondSet.style.animation = 'none';
    firstSet.style.opacity = '1';
    secondSet.style.opacity = '0';
  } else if (currentSlide === 2) {
    secondSet.style.animation = 'slide-right 10s infinite alternate';
    firstSet.style.animation = 'none';
    secondSet.style.opacity = '1';
    firstSet.style.opacity = '0';
  }
}



function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    const nextSlide = currentSlide === 1 ? 2 : 1;
    switchSlide(nextSlide);
  }, 5000);
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    clearInterval(autoSlideInterval);
    const slideNumber = parseInt(dot.getAttribute('data-slide'));
    if (slideNumber !== currentSlide) {
      switchSlide(slideNumber); 
    }
    setTimeout(startAutoSlide, 10000); 
  });
});

switchSlide(1);
startAutoSlide();
