import { Stage, Text, input, state, game } from "melonjs";

class StartScreen extends Stage {
  onResetEvent() {
    const centerX = game.viewport.width / 2;
    const titleSize = game.viewport.width * 0.08

    this.titleText = new Text(centerX, 180, {
      font: "Arial",
      size: titleSize,
      fillStyle: "#FFD700",
      textAlign: "center",
      text: "GALACTIC CLASH",
    });

    this.startText = new Text(centerX, 420, {
      font: "Arial",
      fillStyle: "#00FF00",
      textAlign: "center",
      text: "Press ENTER to Start",
    });

    game.world.addChild(this.titleText);
    game.world.addChild(this.startText);

    input.bindKey(input.KEY.ENTER, "start");
  }

  update() {
    const centerX = game.viewport.width / 2;
    this.titleText.pos.x = centerX;
    this.startText.pos.x = centerX;

    this.startText.alpha = 0.5 + Math.abs(Math.sin(Date.now() / 500));

    if (input.isKeyPressed("start")) {
      state.change(state.PLAY);
    }
    return true;
  }

  onDestroyEvent() {
    input.unbindKey(input.KEY.ENTER);
    game.world.removeChild(this.titleText);
    game.world.removeChild(this.startText);
  }
}

export default StartScreen;
