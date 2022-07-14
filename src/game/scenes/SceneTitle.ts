import { Scene } from "phaser";

export default class SceneTitle extends Scene {
  constructor() {
    super({ key: SceneTitle.name, active: false });
  }

  preload() {
    this.load.image("title", "./assets/images/title-2.png");
  }

  create() {
    this.add.image(140, 60, "title").setOrigin(0.5).setScale(2);
    this.add.image(140, 105, "gui", 4).setOrigin(0.5).setScale(2);
    // this.scene.start("SceneTitle");
  }
}
