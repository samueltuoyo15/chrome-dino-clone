const dino = document.getElementById("game-dino") as HTMLElement;
const obstacles = document.querySelectorAll(".game-obstacle") as NodeListOf<HTMLElement>;

let position = 0;
let isDinoJumping = false;
let gameOver = false;

const setIsDinoJumping = () => {
  if (isDinoJumping || gameOver) {
    return;
  }

  isDinoJumping = true;

  const noGravityYet = setInterval(() => {
    if (position >= 150) {
      clearInterval(noGravityYet);

      const gravity = setInterval(() => {
        if (position <= 0) {
          clearInterval(gravity);
          isDinoJumping = false;
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

      document.body.removeEventListener("click", setIsDinoJumping);
      document.removeEventListener("keydown", handleKeyPress);

      alert("Game Over Loser");
      gameOver = true;
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
