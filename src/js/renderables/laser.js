import {Body, collision, game, Rect, Renderable, state} from "melonjs";
import CONSTANTS from '../constants.js';


export class Laser extends Renderable {

  constructor(x, y) {
    super(x, y, CONSTANTS.LASER.WIDTH, CONSTANTS.LASER.HEIGHT);

    this.body = new Body(this);
    this.body.addShape(new Rect(0, 0, this.width, this.height));
    this.body.vel.set(0, -16);
    this.body.force.set(0, -8);
    this.body.setMaxVelocity(3, 16);
    this.body.collisionType = collision.types.PROJECTILE_OBJECT;
    this.body.ignoreGravity = true;

    this.alwaysUpdate = true;
  }

  onResetEvent(x, y, w, h) {
    this.pos.set(x, y);
  }

  update(dt) {
    super.update(dt);

    if (this.pos.y + this.height <= 0) {
      game.world.removeChild(this);
    }
    return true;
  }

  draw(renderer, viewport) {
    const color = renderer.getColor().clone();
    renderer.setColor('#5EFF7E');
    renderer.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    renderer.setColor(color);
    return true;
  }

  onCollision(response, other) {

    if (other.body.collisionType === collision.types.ENEMY_OBJECT) {
      game.world.removeChild(this);

      state.current().enemyManager.removeChild(other);

      return false;
    }
  }
}

export default Laser;

