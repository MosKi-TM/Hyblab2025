class audioScene {
    constructor(file_name) {
        this.objects = [];
        this.time = 0;

        // Load audio configuration
        fetch(file_name)
            .then(response => response.json())
            .then(data => {
                this.objects = data.audios.map(audio => {
                    const audioElement = new Audio(audio.src);
                    audioElement.volume = audio.volume; // Set the volume for each audio element
                    return {
                        id: audio.id,
                        element: audioElement,
                        keyframes: audio.keyframes,
                        isLooping: false,
                    };
                });
            })
            .catch(err => console.error("Error loading audio configuration:", err));
    }

    updateAudio(time) {
        this.time = time;

        this.objects.forEach(audioObject => {
            const { element, keyframes, isLooping } = audioObject;

            keyframes.forEach(keyframe => {
                if (Math.floor(keyframe.time) === Math.floor(this.time)) {
                    switch (keyframe.type) {
                        case "play_once":
                            if (!isLooping) {
                                element.currentTime = 0; // Reset to start for play_once
                                element.play();
                            }
                            break;

                        case "pause":
                            element.pause();
                            break;

                        case "loop":
                            if (!isLooping) {
                                audioObject.isLooping = true;
                                element.loop = true;
                                element.play();
                            }
                            break;

                        default:
                            console.warn(`Unknown keyframe type: ${keyframe.type}`);
                    }
                }
            });

            // Stop looping if the current keyframe is no longer "loop"
            if (isLooping && !keyframes.some(kf => kf.time <= this.time && kf.type === "loop")) {
                audioObject.isLooping = false;
                element.loop = false;
            }
        });
    }

    playAudio(audioId) {
        const audioObject = this.objects.find(audio => audio.id === audioId);
        if (audioObject) {
            console.log(`Playing audio: ${audioId}`);
            audioObject.element.play();
        } else {
            console.warn(`Audio ID ${audioId} not found.`);
        }
    }
}