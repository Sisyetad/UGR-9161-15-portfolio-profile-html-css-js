const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filterCategory = button.getAttribute('data-filter');
    
    projectItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      if (filterCategory === 'all' || itemCategory === filterCategory) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});



