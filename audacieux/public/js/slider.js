
const sceneAudio = new audioScene('audio_scene.json')

const sceneManager = new Scene("sceneData.json", "scene-container", sceneAudio);

const slider = document.getElementById("time-slider");

setTimeout(() => {
  console.log("After 2 seconds");
}, 2000);

document.querySelectorAll("svg").forEach(svg => {
  if (!svg.closest("svg")) {
      svg.style.pointerEvents = "none"; // Désactiver les interactions sur le parent
      svg.querySelectorAll("*").forEach(child => {
          child.style.pointerEvents = "all"; // Réactiver les interactions sur les enfants
      });
  }
});

const sceneContainer = document;
let isAnimating = false;

sceneContainer.addEventListener(
  "wheel",
  function (event) {
    event.preventDefault();
    const timeDelta = event.deltaY / 100;
    const maxTime = 100;

    sceneManager.time = Math.max(0, Math.min(sceneManager.time + timeDelta, maxTime));

    if (!isAnimating) {
      isAnimating = true;
      requestAnimationFrame(() => {
        sceneManager.set_frame(sceneManager.time);
        isAnimating = false;
      });
    }
  },
  { passive: false }
);

const mouseBox = document.getElementById("mouse-box");

document.addEventListener("mousemove", (event) => {
  mouseBox.style.left = `${event.pageX + 10}px`;
  mouseBox.style.top = `${event.pageY + 10}px`;
  mouseBox.textContent = `X: ${event.pageX}, Y: ${event.pageY}`;
});


// Update slider value based on sceneManager.time
function syncSliderWithScene() {
  slider.value = scene.time;
  currentTimeDisplay.textContent = scene.time.toFixed(1); // Display time with 1 decimal
}

// Update sceneManager.time when slider changes
slider.addEventListener("input", () => {
  const newTime = parseFloat(slider.value);
  sceneManager.set_frame(newTime);
  syncSliderWithScene(); // Keep the display in sync
});