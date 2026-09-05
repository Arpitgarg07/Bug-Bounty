// Navigation helper to dynamically update navbar based on auth state
function updateNavbar() {
  const discoverButton = document.getElementById('discoverButton');

  // Check if user is authenticated
  const accessToken = localStorage.getItem('bb_access_token');

  if (discoverButton) {
    if (accessToken) {
      // User is logged in - show Dashboard
      discoverButton.innerHTML = '<span>Dashboard</span>';
      discoverButton.onclick = () => {
        window.location.href = 'discover.html';
      };
    } else {
      // User is not logged in - show Login/Sign Up
      discoverButton.innerHTML = '<span>Login / Sign Up</span>';
      discoverButton.onclick = () => {
        window.location.href = 'login.html';
      };
    }
  }

  document.querySelectorAll('.img-logo').forEach((logo) => {
    if (logo.dataset.logoWired === 'true' || logo.onclick) return;

    logo.dataset.logoWired = 'true';
    logo.setAttribute('role', 'button');
    logo.setAttribute('tabindex', '0');
    logo.addEventListener('click', () => {
      window.location.href = accessToken ? 'discover.html' : 'index.html';
    });
    logo.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      window.location.href = accessToken ? 'discover.html' : 'index.html';
    });
  });

  document.querySelectorAll('.profile-icon a[href="#"]').forEach((link) => {
    link.setAttribute('href', 'profile.html');
  });
}

// Run when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateNavbar);
} else {
  updateNavbar();
}
