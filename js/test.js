const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let interval;
console.log("JASSS")
/*
const road = new Image ();
road.src="/images/road.png";
road.onload = () => {
  context.drawImage(road, 10, 10, canvas.width, canvas.height);
};*/

const game = {
  frames: 0,
  obstacles: [],
  start: () => {
    interval = setInterval(() => {
      updateCanvas();
    }, 10);
  },
  stop: () => {
    clearInterval(interval);
  },
  clear: () => {
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  },
  score: () => {
      const points = Math.floor(game.frames / 5);
      context.font = "14px Arial";
      context.fillStyle = "black";
      context.fillText(`Score: ${points}`, 200, 50);
  },
};


class Player {
  constructor(x, y){
    this.x = x;
    this.y = y;

    
    const car = new Image ();
    car.src="./images/car.png"
    car.onload = () => {
        this.image = car;
        this.draw();
  }
}

left () {
  return this.x;
}

right() {
  return this.x + 50
}

top () {
  return this.y;
}

bottom() {
  return this.y + 50
}

  draw() {
    context.drawImage(this.image, this.x, this.y, 50, 50);
  }


moveLeft() {
  if(this.x > 0 ) {
    this.x -= 20;
  } 
  if (this.x <= 0) {
    this.x = 20
   }
}

moveRight() {
  if (this.x >= 500) {
    this.x = 450;
  } 
  
  if (this.x < 500) {
    this.x += 20;
  }

}



}


const user = new Player (200, 650); 
document.addEventListener('keydown', (e) => { // e is auto assigned and this e will provide information of which key was pressed. e stands for event
  switch(e.key) {
      case "ArrowLeft":
          user.moveLeft();
          break;
      case "ArrowRight":
          user.moveRight();
          break;  
  }
  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
  user.draw();
});



class Component {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color
  }

  draw() {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  left () {
    return this.x;
  }

  right() {
    return this.x + this.width
  }

  top () {
    return this.y;
  }

  bottom() {
    return this.y + this.height
  }

  crashWith(car) {
    return !(
      this.bottom() < car.top() ||
      this.top() > car.bottom() ||
      this.right() < car.left() ||
      this.left() > car.right()
    );
  }



}

function drawObstacles() {
  
  game.obstacles.forEach((obstacle) => {
    obstacle.y += 1;
    obstacle.draw();
  });
  game.frames++;

  if (game.frames % 120 === 0) {
    
    const randomWidth = Math.floor((Math.random() * 150) + 100
    );

    const randomStarting = Math.floor((Math.random() * canvas.clientWidth))
    /*
    const minGap = 180;
    const maxGap = 250;
    const randomGap = Math.floor(
      Math.random() * (maxGap - minGap + 1) + minGap
    );*/
    //Create Left obstacle
    const obstacle = new Component(randomStarting, 0, randomWidth, 30, "red");
    setInterval(() =>{
      game.obstacles.push(obstacle)}, 100);
    

/*
    //Create Right obstacle
    const obstacleRight = new Component(0, 0, -randomWidth, 30, "red");
    setInterval(() =>{
      game.obstacles.push(obstacleRight)}, 100);
    console.log(game.obstacles);*/
  }
}

function updateCanvas() {
  game.clear();
  user.draw();
  drawObstacles();
  checkGameOver();
  game.score();
}



function checkGameOver() {
  const crashed = game.obstacles.some((obstacle) => {
    return obstacle.crashWith(user) === true;
  });

  if (crashed) {
     game.stop();
  }
}

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  function startGame() {
    game.start();
  }
};

