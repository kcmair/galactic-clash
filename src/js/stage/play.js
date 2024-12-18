import { Stage, game, ColorLayer, input } from "melonjs";
import PlayerEntity from "../renderables/player.js";
import EnemyManager from "../managers/enemy-manager.js";

class PlayScreen extends Stage {
  onResetEvent(args) {
    this.backgroundColor = new ColorLayer("background", "#000000");
    game.world.addChild(this.backgroundColor, 0);

    this.player = new PlayerEntity();
    game.world.addChild(this.player, 1);

    this.enemyManager = new EnemyManager();
    this.enemyManager.createEnemies();
    game.world.addChild(this.enemyManager, 2);

    input.bindKey(input.KEY.LEFT, "left");
    input.bindKey(input.KEY.RIGHT, "right");
    input.bindKey(input.KEY.SPACE, "shoot", true);
  }

  onDestroyEvent(args) {
    input.unbindKey(input.KEY.LEFT);
    input.unbindKey(input.KEY.RIGHT);
    input.unbindKey(input.KEY.SPACE);
  }

  checkIfLoss(y) {
    if (y >= this.player.pos.y) {
      const gameOverScreen = new GameOver();
      game.world.addChild(gameOverScreen);
    }
  }
}

export default PlayScreen;
