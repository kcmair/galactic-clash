import {game, loader, Sprite, input, pool} from "melonjs";
import CONSTANTS from "../constants.js";

class PlayerEntity extends Sprite {

  /**
   * constructor
   */
  constructor() {
    let image = loader.getImage("player");

    super(
      game.viewport.width / 2 - image.width / 2,
      game.viewport.height - image.height - 20,
      {
        image: image,
        framewidth: 32,
        frameheight: 32
      }
    );
    this.velx = 450;
    this.maxX = game.viewport.width -   this.width;
  }
  /**
    * update the sprite
    */
  update(dt) {
    super.update(dt);

    if (input.isKeyPressed("left")) {
        this.pos.x -= this.velx * dt / 1000;
    }

    if (input.isKeyPressed("right")) {
        this.pos.x += this.velx * dt / 1000;
    }

    if (input.isKeyPressed("shoot")) {
      game.world.addChild(pool.pull("laser", this.getBounds().centerX - CONSTANTS.LASER.WIDTH / 2, this.getBounds().top));
    }

    // Keep player within bounds
    this.pos.x = Math.max(32, Math.min(this.pos.x, this.maxX));

    return true;
  }

  onCollision(response, other) {
    // Make all other objects solid
    return true;
  }
}

export default PlayerEntity;
