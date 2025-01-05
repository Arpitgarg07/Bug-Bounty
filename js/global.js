document.getElementById("discoverButton").addEventListener("click", function () {
    window.location.href = "discover.html";
});

// Add this script in a <script> tag or your JavaScript file
document.getElementById("Bounties").addEventListener("click", function() {
    window.location.href = "bounties.html";
});



// Function to load the card content dynamically
function loadCard() {
    fetch('card.html')
      .then(response => response.text())
      .then(html => {
        // Append the card content to the body (or any container you prefer)
        document.body.insertAdjacentHTML('beforeend', html);
  
        // Show the card
        const popupCard = document.getElementById('popupCard');
        popupCard.style.display = 'block';
  
        // Add event listener for the close button
        const closeBtn = document.getElementById('closeBtn');
        closeBtn.addEventListener('click', () => {
          popupCard.style.display = 'none';
        });
      })
      .catch(error => console.error('Error loading card:', error));
  }
  