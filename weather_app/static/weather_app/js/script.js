// script.js

document.addEventListener('DOMContentLoaded', () => {
  console.log("Weather App Loaded");

  // Add a subtle fade-in effect for content on page load
  const mainContent = document.querySelector('.main');
  if (mainContent) {
    mainContent.style.opacity = 0;
    mainContent.style.transition = 'opacity 1s ease-in-out';
    setTimeout(() => {
      mainContent.style.opacity = 1;
    }, 100);
  }

  // Enhance form submission with button disable to prevent multiple submits
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Loading...";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;

    // Toggle button setup
    const toggleBtn = document.getElementById('toggle-theme');
    toggleBtn.addEventListener('click', function () {
        body.classList.toggle('night');
        body.classList.toggle('day');
        updateSky();
    });

    function updateSky() {
        const isNight = body.classList.contains('night');

        // Toggle celestial bodies
        document.querySelector('.sun').style.display = isNight ? 'none' : 'block';
        document.querySelector('.moon').style.display = isNight ? 'block' : 'none';

        // Stars
        const starContainer = document.querySelector('.stars');
        if (isNight) {
            for (let i = 0; i < 30; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.top = `${Math.random() * 100}%`;
                star.style.left = `${Math.random() * 100}%`;
                starContainer.appendChild(star);
            }
        } else {
            starContainer.innerHTML = '';
        }
    }

    // Initial setup
    body.classList.add('day');
    updateSky();
});

