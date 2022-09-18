import { Scene } from "phaser";

export default class SceneTitle extends Scene {
  constructor() {
    super({ key: SceneTitle.name, active: false });
  }

  preload() {}

  create() {
    // this.scene.start("SceneTitle");
  }
}
