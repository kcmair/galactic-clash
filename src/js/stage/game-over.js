import { Renderable, game, input, state, Text } from "melonjs";

class GameOver extends Renderable {
  constructor() {
    super(0, 0, game.viewport.width, game.viewport.height);
    this.floating = true;
    this.alpha = 0.8;

    // Create text objects
    this.gameOverText = new Text(
      game.viewport.width / 2,
      game.viewport.height / 2 - 40,
      {
        font: "32px Arial",
        textAlign: "center",
        text: "GAME OVER",
      },
    );

    this.restartText = new Text(
      game.viewport.width / 2,
      game.viewport.height / 2 + 40,
      {
        font: "24px Arial",
        textAlign: "center",
        text: "Press ENTER to restart",
      },
    );
  }

  draw(renderer, viewport) {
    // Fill with semi-transparent black
    renderer.setColor("rgba(0, 0, 0, 0.8)");
    renderer.fillRect(0, 0, this.width, this.height);

    // Draw text
    this.gameOverText.draw(renderer);
    this.restartText.draw(renderer);

    return true;
  }

  onActivateEvent() {
    input.bindKey(input.KEY.ENTER, "restart", true);
    this.handler = input.registerPointerEvent("pointerdown", this, () => {
      state.change(state.PLAY, true);
    });

    // Add key handler for restart
    this.restart_handler = () => {
      if (input.isKeyPressed("restart")) {
        state.change(state.PLAY, true);
      }
    };

    // Subscribe to update event
    state.current().subscribe(this.restart_handler);
  }

  onDeactivateEvent() {
    input.unbindKey(input.KEY.ENTER);
    input.releasePointerEvent("pointerdown", this);
  }
}

export default GameOver;
