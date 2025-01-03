document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.tab-slider');
  const bar = document.querySelector('.tab-bar');
  const buttons = document.querySelectorAll('.tab-button');

  // Get the last active index from localStorage (default to 0 if not set)
  let lastActiveIndex = localStorage.getItem('lastActiveTabIndex') 
    ? parseInt(localStorage.getItem('lastActiveTabIndex')) 
    : 0;

  // Determine the current active tab based on the page
  const currentPage = window.location.pathname;
  let activeIndex = lastActiveIndex; // Start with the last active index

  if (currentPage.includes('discover.html')) {
    activeIndex = 0;
  } else if (currentPage.includes('bounties.html')) {
    activeIndex = 1;
  } else if (currentPage.includes('builders.html')) {
    activeIndex = 2;
  }

  // Save the active index to localStorage to maintain consistency
  localStorage.setItem('lastActiveTabIndex', activeIndex);

  // Set the initial slider and bar position
  slider.style.transform = `translateX(${activeIndex * 100}%)`;
  bar.style.transform = `translateX(${activeIndex * 100}%)`;

  // Update the active button styles based on the active index
  buttons.forEach((button, index) => {
    button.classList.toggle('active', index === activeIndex);
  });

  // Handle button clicks
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // Save the clicked tab's index before redirection
      localStorage.setItem('lastActiveTabIndex', index);

      // Animate the slider and bar
      slider.style.transition = 'transform 0.3s ease';
      bar.style.transition = 'transform 0.3s ease';
      slider.style.transform = `translateX(${index * 100}%)`;
      bar.style.transform = `translateX(${index * 100}%)`;

      // Update the active button styles
      buttons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      // Redirect to the appropriate page after animation
      setTimeout(() => {
        if (index === 0) window.location.href = 'discover.html';
        if (index === 1) window.location.href = 'bounties.html';
        if (index === 2) window.location.href = 'builders.html';
      }, 300); // Match the delay with the animation duration
    });
  });
});
