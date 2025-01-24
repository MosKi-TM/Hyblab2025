class AudioController {
  constructor() {
      this.audioElements = {};
  }

  async loadAudioConfiguration() {
      try {
          const response = await fetch('js/audio.json');
          const data = await response.json();
          this.initializeAudios(data.audios);
      } catch (error) {
          console.error("Failed to load audio configuration:", error);
      }
  }

  initializeAudios(audios) {
      audios.forEach(audio => {
          const audioElement = new Audio(`assets/audio/${audio.file}`);
          audioElement.volume = audio.volume;
          audioElement.loop = audio.loop;
          this.audioElements[audio.id] = { element: audioElement, event: audio.event };
      });
  }

  playAudio(eventName) {
      const audio = Object.values(this.audioElements).find(audio => audio.event === eventName);
      if (audio) {
          audio.element.play();
      } else {
          console.warn(`Aucun audio ne correspond à l'évènement: ${eventName}`);
      }
  }

  stopAudio(audioId) {
      const audio = this.audioElements[audioId];
      if (audio) {
          audio.element.pause();
          audio.element.currentTime = 0;
      } else {
          console.warn(`Audio ID ${audioId} pas trouvé.`);
      }
  }
}

// Initialisation et utilisation de l'AudioController
document.addEventListener("DOMContentLoaded", async function() {
  const audioController = new AudioController();
  await audioController.loadAudioConfiguration();
  
  // Exemple pour jouer l'audio d'ambiance
  audioController.playAudio('start_scene');
});