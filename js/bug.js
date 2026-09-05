const button = document.getElementById('actionButton');

if (button) {
    button.addEventListener('click', () => {
        button.disabled = true;

        const existingMessage = document.querySelector('.new-section');
        if (existingMessage) return;

        const newSection = document.createElement('div');
        newSection.classList.add('new-section');
        newSection.textContent = 'Your application is under review';

        button.insertAdjacentElement('afterend', newSection);
    });
}

document.querySelectorAll('.apply-btn-card').forEach((applyButton) => {
    applyButton.addEventListener('click', () => {
        window.location.href = 'bug.html';
    });
});

function goBack() {
    window.history.back(); // This takes the user to the previous page in history
}
