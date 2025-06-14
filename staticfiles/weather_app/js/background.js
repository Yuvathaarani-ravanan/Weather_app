// static/weather_app/js/background.js

document.addEventListener("DOMContentLoaded", () => {
  const weatherType = document.body.dataset.weather;

  if (weatherType.includes("rain")) {
    createRain();
  }

  if (weatherType.includes("snow")) {
    createSnow();
  }

  if (weatherType.includes("night")) {
    document.getElementById("stars-canvas").style.display = "block";
    createStars();
  }
});

function createRain() {
  const rainLayer = document.getElementById("rain-layer");
  for (let i = 0; i < 100; i++) {
    const drop = document.createElement("div");
    drop.style.position = "absolute";
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.top = `${Math.random() * 100}%`;
    drop.style.width = "2px";
    drop.style.height = "20px";
    drop.style.background = "rgba(255,255,255,0.3)";
    drop.style.animation = `raindrop ${1 + Math.random()}s linear infinite`;
    rainLayer.appendChild(drop);
  }
}

function createSnow() {
  const snowLayer = document.getElementById("snow-layer");
  for (let i = 0; i < 80; i++) {
    const flake = document.createElement("div");
    flake.style.position = "absolute";
    flake.style.left = `${Math.random() * 100}%`;
    flake.style.top = `${Math.random() * 100}%`;
    flake.style.width = "8px";
    flake.style.height = "8px";
    flake.style.borderRadius = "50%";
    flake.style.background = "white";
    flake.style.opacity = 0.8;
    flake.style.animation = `snowfall ${3 + Math.random() * 3}s linear infinite`;
    snowLayer.appendChild(flake);
  }
}

function createStars() {
  const canvas = document.getElementById("stars-canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const stars = [];
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2,
      opacity: Math.random()
    });
  }

  function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(Math.sin(star.opacity))})`;
      ctx.fill();
      star.opacity += 0.02;
    });
    requestAnimationFrame(animateStars);
  }

  animateStars();
}

// static/weather_app/js/background.js

// Add clouds dynamically
function generateClouds() {
  const container = document.querySelector('.background-layer');
  for (let i = 1; i <= 3; i++) {
    const cloud = document.createElement('div');
    cloud.className = `cloud cloud-${i}`;
    container.appendChild(cloud);
  }
}

// Generate rain
function generateRain() {
  const rainLayer = document.getElementById('rain-layer');
  for (let i = 0; i < 150; i++) {
    const drop = document.createElement('div');
    drop.className = 'raindrop';
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.top = `${Math.random() * 100}%`;
    drop.style.animationDuration = `${Math.random() * 0.5 + 0.75}s`;
    rainLayer.appendChild(drop);
  }
}

// Call functions on load
window.onload = () => {
  generateClouds();
  generateRain();
};

function generateClouds() {
  const container = document.querySelector('.background-layer');
  for (let i = 1; i <= 3; i++) {
    const cloud = document.createElement('div');
    cloud.className = `cloud cloud-${i}`;
    container.appendChild(cloud);
  }
}

function generateRain() {
  const rainLayer = document.getElementById('rain-layer');
  for (let i = 0; i < 100; i++) {
    const drop = document.createElement('div');
    drop.className = 'raindrop';
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.top = `${Math.random() * 100}%`;
    drop.style.animationDuration = `${Math.random() * 0.5 + 0.7}s`;
    rainLayer.appendChild(drop);
  }
}

window.onload = () => {
  generateClouds();
  generateRain();
};


document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light-theme");
  }

  // Toggle theme on button click
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-theme");
    const newTheme = body.classList.contains("light-theme") ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
  });
});
