// utils/audio.ts

const playSound = (src: string) => {
  try {
    // Create a new Audio object for each playback to allow for overlapping sounds
    const audio = new Audio(src);
    audio.play().catch(error => console.error("Audio playback was prevented.", error));
  } catch (error) {
    console.error("Could not play audio:", error);
  }
};

// Sound for when the player selects a card
export const playSelectSound = () => {
  playSound('https://cdn.pixabay.com/audio/2021/08/04/audio_c6cc1ee95c.mp3');
};

// Sound for when the player wins a round
export const playWinRoundSound = () => {
  playSound('https://cdn.pixabay.com/audio/2022/03/15/audio_2dd34f0d30.mp3');
};

// Sound for when the player loses a round
export const playLoseRoundSound = () => {
  playSound('https://cdn.pixabay.com/audio/2022/03/10/audio_b5e3980b3a.mp3');
};

// Sound for when a round is a draw
export const playDrawRoundSound = () => {
  playSound('https://cdn.pixabay.com/audio/2022/01/18/audio_8354c86e8e.mp3');
};

// Sound for when the player wins the entire game
export const playWinGameSound = () => {
    playSound('https://cdn.pixabay.com/audio/2022/01/21/audio_a117565d3a.mp3');
};

// Sound for when the player loses or draws the entire game
export const playLoseGameSound = () => {
    playSound('https://cdn.pixabay.com/audio/2022/03/10/audio_c3ff313c12.mp3');
};

// Sound for UI actions like resetting the game
export const playResetSound = () => {
    playSound('https://cdn.pixabay.com/audio/2022/03/15/audio_7624d1a644.mp3');
};