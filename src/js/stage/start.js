import { Stage, Text, input, state, game } from "melonjs";

class StartScreen extends Stage {
  onResetEvent() {
    // Get center position dynamically
    const centerX = game.viewport.width / 2;

    // Add title text with larger, bold font
    this.titleText = new Text(centerX, 180, {
      font: "Arial",
      fontSize: 60,
      fillStyle: "#FFD700",
      textAlign: "center",
      text: "GALACTIC CLASH",
      textBaseline: "middle",
      shadowColor: "#000",
      shadowBlur: 10,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
    });
    console.log("This is the font: ", this.titleText.font);

    // Add start instruction text with pulsing effect
    this.startText = new Text(centerX, 420, {
      font: "bold Arial",
      fillStyle: "#00FF00",
      textAlign: "center",
      text: "Press ENTER to Start",
      textBaseline: "middle",
      shadowColor: "#000",
      shadowBlur: 5,
      shadowOffsetX: 2,
      shadowOffsetY: 2,
    });

    game.world.addChild(this.titleText);
    game.world.addChild(this.startText);

    input.bindKey(input.KEY.ENTER, "start");
  }

  update() {
    // Update text positions if viewport changes
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
