(function () {
  const tabRoutes = ['discover.html', 'bounties.html', 'builders.html'];

  function getCurrentTabIndex() {
    const currentPage = window.location.pathname.toLowerCase();

    if (currentPage.includes('discover.html')) return 0;
    if (currentPage.includes('bounties.html')) return 1;
    if (currentPage.includes('builders.html')) return 2;

    const storedIndex = Number.parseInt(localStorage.getItem('lastActiveTabIndex'), 10);
    return Number.isNaN(storedIndex) ? 0 : storedIndex;
  }

  function setActiveTab(index) {
    const safeIndex = tabRoutes[index] ? index : 0;
    const slider = document.querySelector('.tab-slider');
    const buttons = document.querySelectorAll('.tab-button');

    localStorage.setItem('lastActiveTabIndex', String(safeIndex));

    if (slider) {
      slider.style.transition = 'transform 0.3s ease';
      slider.style.transform = `translateX(${safeIndex * 100}%)`;
    }

    buttons.forEach((button, buttonIndex) => {
      button.classList.toggle('active', buttonIndex === safeIndex);
    });
  }

  window.switchTab = function switchTab(event, index) {
    if (event) {
      event.preventDefault();
    }

    const safeIndex = tabRoutes[index] ? index : 0;
    setActiveTab(safeIndex);

    window.setTimeout(() => {
      window.location.href = tabRoutes[safeIndex];
    }, 160);
  };

  function wireDashboardButtons() {
    document.querySelectorAll('.tab-button').forEach((button, index) => {
      if (button.dataset.tabWired === 'true') return;
      button.dataset.tabWired = 'true';

      button.addEventListener('click', (event) => {
        if (event.defaultPrevented) return;
        window.switchTab(event, index);
      });
    });

    document.querySelectorAll('.action-btn').forEach((button) => {
      if (button.dataset.actionWired === 'true') return;
      if (!button.textContent.trim().toLowerCase().includes('debuggings')) return;

      button.dataset.actionWired = 'true';
      button.addEventListener('click', () => {
        window.location.href = 'mybug.html';
      });
    });

    document.querySelectorAll('.apply-btn-card').forEach((button) => {
      if (button.dataset.applyWired === 'true') return;

      button.dataset.applyWired = 'true';
      button.addEventListener('click', () => {
        window.location.href = 'bug.html';
      });
    });
  }

  function initDashboardNav() {
    setActiveTab(getCurrentTabIndex());
    wireDashboardButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboardNav);
  } else {
    initDashboardNav();
  }
})();
