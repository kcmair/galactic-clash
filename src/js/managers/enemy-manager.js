import {Container, game, state, timer} from "melonjs";
import EnemyEntity from "../renderables/enemy.js";
import GameOver from "../stage/game-over.js";

class EnemyManager extends Container {
  static COLS = 9;
  static ROWS = 4;

  constructor() {
    super(16, 32, EnemyManager.COLS * 64 - 32, EnemyManager.ROWS * 64 - 32);
    this.enableChildBoundsUpdate = true;
    this.vel = 16;
    this.name = "enemyManager";
    this.className = "EnemyManager";
    this.isPoolable = true;
  }

  onActivateEvent() {
    this.timer = timer.setInterval(() => {
      let bounds = this.getBounds();

      if (
        (this.vel > 0 && bounds.right + this.vel >= game.viewport.width) ||
        (this.vel < 0 && bounds.left + this.vel <= 0)
      ) {
        this.vel *= -1;
        this.pos.y += 16;
        if (this.vel > 0) {
          this.vel += 0.5;
        } else {
          this.vel -= 0.5;
        }
      } else {
        this.pos.x += this.vel;
      }
    }, 10);
  }

  createEnemies() {
    for (let i = 0; i < EnemyManager.COLS; i++) {
      for (let j = 0; j < EnemyManager.ROWS; j++) {
        var enemy = new EnemyEntity(i * 64, j * 64);
        this.addChild(enemy);
      }
    }
    this.createEnemies = true;
  }

  onDeactivateEvent() {
    timer.clearInterval(this.timer);
  }

  onChildChange = () => {
    if (this.children.length === 0) {
      state.current().reset();
    }
  };

  destroy() {
    if (this.timer) {
      timer.clearInterval(this.timer);
    }
    super.destroy();
  }

  onResetEvent() {
    this.vel = 16;
    this.createEnemies();
  }

  checkEnemyPositions() {
    if (this.children.length > 0) {
      const bounds = this.getBounds();
      if (bounds.bottom >= state.current().player.pos.y) {
        game.world.addChild(new GameOver());
      }
    }
  }

  update(dt) {
    this.checkEnemyPositions();
    super.update(dt);
    return true;
  }
}

export default EnemyManager;
