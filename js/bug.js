const button = document.getElementById('actionButton');

button.addEventListener('click', () => {
    // Disable the button
    button.disabled = true;

    // Create a new section
    const newSection = document.createElement('div');
    newSection.classList.add('new-section');
    newSection.textContent = 'Your application is under review';
    
    // Insert the new section directly below the button
    button.insertAdjacentElement('afterend', newSection);

});

function goBack() {
    window.history.back(); // This takes the user to the previous page in history
}