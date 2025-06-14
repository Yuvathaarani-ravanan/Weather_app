// Ensure the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const cloudContainer = document.createElement('div');
  cloudContainer.className = 'cloud-container';
  document.body.appendChild(cloudContainer);

  function createCloud(index) {
    const cloud = document.createElement('div');
    cloud.className = 'cloud';
    cloud.style.top = `${Math.random() * 200 + 20}px`;
    cloud.style.left = `-${Math.random() * 300 + 100}px`;
    cloud.style.opacity = Math.random() * 0.5 + 0.3;
    cloud.style.animationDuration = `${Math.random() * 40 + 30}s`;
    cloudContainer.appendChild(cloud);
  }

  for (let i = 0; i < 5; i++) {
    createCloud(i);
  }
});
