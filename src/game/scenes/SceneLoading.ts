import { Scene } from "phaser";

export default class SceneLoading extends Scene {
  constructor() {
    super({ key: SceneLoading.name });
  }

  preload() {
    this.load.setPath("assets/");
    this.load.audio("jump", "sounds/jump.wav");
    this.load.spritesheet("character", "images/spritesheet.png", {
      frameWidth: 40,
      frameHeight: 40,
    });
    this.load.spritesheet("sky", "images/background-sky.png", {
      frameWidth: 40,
      frameHeight: 160,
    });
    this.load.image("ground", "images/background-ground.png");
    this.load.spritesheet("gui", "images/gui.png", {
      frameWidth: 40,
      frameHeight: 40,
    });
  }

  create() {
    // Animation set
    this.anims.create({
      key: "stand",
      frames: this.anims.generateFrameNumbers("character", {
        frames: [0, 1, 2, 3],
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("character", {
        frames: [1, 2],
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "crawl",
      frames: this.anims.generateFrameNumbers("character", {
        frames: [4, 5],
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.scene.start("SceneGame");
  }
}
