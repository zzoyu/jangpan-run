import { Scene } from "phaser";

export default class SceneLoading extends Scene {
  constructor() {
    super({ key: SceneLoading.name });
  }

  preload() {
    // this.load
  }

  create() {
    this.scene.start("SceneTitle");
    // this.scene.stop()
  }
}
