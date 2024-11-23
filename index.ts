const dino = document.getElementById("game-dino") as HTMLElement;
const obstacles = document.querySelectorAll(".game-obstacle") as NodeListOf<HTMLElement>;
const scoreElement = document.getElementById("score") as HTMLElement;
const gameOverElement = document.getElementById("game-over") as HTMLElement;
let position = 0;
let isDinoJumping = false;
let gameOver = false;
let score = 0;
let sound;
const setIsDinoJumping = () => {
  if (isDinoJumping || gameOver) {
    return;
  }

  isDinoJumping = true;
  sound = new Audio()
  sound.src = "https://sound.peal.io/ps/audios/000/065/367/original/youtube_65367.mp3?1664577906";
  sound.play();
  const noGravityYet = setInterval(() => {
    if (position >= 150) {
      clearInterval(noGravityYet);

      const gravity = setInterval(() => {
        if (position <= 0) {
          clearInterval(gravity);
          isDinoJumping = false;
          scoreElement.style.color = "gray";
          score += 1; 
          scoreElement.textContent = score.toString();
        }
        position -= 5;
        dino.style.bottom = position + "px";
      }, 20);
    }
    position += 5;
    dino.style.bottom = position + "px";
  }, 20);
};

const hasGameEnded = () => {
  const dinoRect = dino.getBoundingClientRect();

  obstacles.forEach((obstacle) => {
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
      dinoRect.right > obstacleRect.left &&
      dinoRect.left < obstacleRect.right &&
      dinoRect.bottom > obstacleRect.top
    ) {
      dino.style.animation = "none";
      dino.style.bottom = position + "px";

     obstacle.style.animation = "none";
     obstacle.style.right = getComputedStyle(obstacle).right;
      gameOver = true;
    obstacles.forEach(obstacle => obstacle.style.animationPlayState = 'paused');
    dino.style.animationPlayState = 'paused';
    document.getElementById("score-board").style.display = 'none';
    gameOverElement.style.display = 'block';

    }
  });
};

const handleKeyPress = (e: KeyboardEvent) => {
  if (
    e.code === "Space" ||
    e.code === "ArrowUp" ||
    e.code === "ArrowDown" ||
    e.code === "ArrowLeft" ||
    e.code === "ArrowRight"
  ) {
    setIsDinoJumping();
  }
};

document.body.addEventListener("click", setIsDinoJumping);
document.addEventListener("keydown", handleKeyPress);

setInterval(() => {
  if (!gameOver) {
    hasGameEnded();
  }
}, 20);
