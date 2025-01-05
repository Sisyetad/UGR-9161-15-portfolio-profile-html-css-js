
document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector(".testimonials-wrapper");
    const testimonials = Array.from(document.querySelectorAll(".testimonial-card"));
    const dots = Array.from(document.querySelectorAll(".navigation-dots .dot"));
    const totalCards = testimonials.length;
    const animationDuration = 5000; 
    let currentStartIndex = 0;
    let isActive = false;
    let sliderInterval;
  
    const updateCardsToShow = () => {
      const screenWidth = window.innerWidth;
      return screenWidth < 768 ? 4 : 3; 
    };
  
    const updateVisibleTestimonials = (direction = 0) => {
      const cardsToShow = updateCardsToShow();
      currentStartIndex = (currentStartIndex + direction + totalCards) % totalCards;
  
      wrapper.innerHTML = "";
      for (let i = 0; i < cardsToShow; i++) {
        const index = (currentStartIndex + i) % totalCards;
        wrapper.appendChild(testimonials[index].cloneNode(true));
      }
  
      dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === currentStartIndex);
      });
    };
  
    const startSlider = () => {
      stopSlider(); 
      sliderInterval = setInterval(() => {
        if (!isActive) {
          updateVisibleTestimonials(1);
        }
      }, animationDuration);
    };
  
    const stopSlider = () => {
      if (sliderInterval) {
        clearInterval(sliderInterval);
        sliderInterval = null;
      }
    };
  
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        stopSlider(); 
        isActive = true;
        currentStartIndex = index; 
        updateVisibleTestimonials(0);
        startSlider(); 
        isActive = false; 
      });
    });
  
    updateVisibleTestimonials();
    startSlider();
  
    window.addEventListener("resize", updateVisibleTestimonials);
  });
  