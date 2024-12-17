import { Body, Rect, Sprite, Math, collision } from "melonjs";

class EnemyEntity extends Sprite {
  constructor(x, y) {
    super(x, y, {
      image: "ships",
      framewidth: 32,
      frameheight: 32,
    });

    this.body = new Body(this);
    this.body.addShape(new Rect(0, 0, this.width, this.height));
    this.body.ignoreGravity = true;
    this.chooseShipImage();
    this.body.vel.set(0, 0);
    this.body.collisionType = collision.types.ENEMY_OBJECT;
  }

  chooseShipImage() {
    let frame = Math.random(0, 4);

    this.addAnimation("idle", [frame], 1);
    this.setCurrentAnimation("idle");
  }
}

export default EnemyEntity;
