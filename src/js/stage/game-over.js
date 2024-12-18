import {Stage, game, input, state, Text} from "melonjs";

class GameOver extends Stage {
  constructor() {
    super(0, 0, game.viewport.width, game.viewport.height);
    const centerX = game.viewport.width / 2;
    const titleSize = game.viewport.width * 0.08

    this.gameOverText = new Text(centerX, 180, {
      font: "Arial",
      size: titleSize,
      fillStyle: "#FFD700",
      textAlign: "center",
      text: "GAME OVER"
    });

    this.restartText = new Text(centerX, 420, {
      font: "Arial",
      fillStyle: "#00FF00",
      textAlign: "center",
      text: "Press ENTER to restart"
    });

    game.world.addChild(this.gameOverText);
    game.world.addChild(this.restartText);

    input.bindKey(input.KEY.ENTER, "start");
  }

  update() {
    const centerX = game.viewport.width / 2;
    this.gameOverText.pos.x = centerX;
    this.restartText.pos.x = centerX;

    this.gameOverText.alpha = 0.5 + Math.abs(Math.sin(Date.now() / 500));

    if (input.isKeyPressed("start")) {
      state.change(state.PLAY);
    }
    return true;
  }

  onDestroyEvent() {
    input.unbindKey(input.KEY.ENTER);
    game.world.removeChild(this.gameOverText);
    game.world.removeChild(this.restartText);
  }
}

export default GameOver;
