function switchTab(event, tabIndex) {
    const slider = document.querySelector('.tab-slider');
    const buttons = document.querySelectorAll('.tab-button');
    
    // Move the slider
    slider.style.transform = `translateX(${tabIndex * 100}%)`;
    
    // Update button styles
    buttons.forEach((button, index) => {
      button.classList.toggle('active', index === tabIndex);
    });
  }
  