// Select all heart icons
const hearts = document.querySelectorAll('.fa-heart');

// Add a click event listener to each heart icon
hearts.forEach((heart) => {
  heart.addEventListener('click', () => {
    // Toggle the "active" class to change the color
    heart.classList.toggle('active');
  });
});
