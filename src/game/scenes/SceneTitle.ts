import { Scene } from "phaser";

export default class SceneTitle extends Scene {
  constructor() {
    super({ key: SceneTitle.name, active: true });
  }

  preload() {}

  create() {
    this.add.image(140, 50, "title").setOrigin(0.5).setScale(2);
    this.add.image(140, 110, "gui", 4).setOrigin(0.5).setScale(2);
    // this.scene.start("SceneTitle");
  }
}
