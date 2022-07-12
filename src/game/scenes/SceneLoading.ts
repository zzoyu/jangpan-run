import { Scene } from "phaser";

export default class SceneLoading extends Scene {
  keyJump: Phaser.Input.Keyboard.Key | undefined;
  keySlide: Phaser.Input.Keyboard.Key | undefined;
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
  isJumpable: boolean = true;
  constructor() {
    super({ key: SceneLoading.name });
  }

  preload() {
    this.load.spritesheet("character", "./assets/images/spritesheet.png", {
      frameWidth: 40,
      frameHeight: 40,
    });
    this.load.spritesheet("sky", "./assets/images/background-sky.png", {
      frameWidth: 40,
      frameHeight: 160,
    });
    this.load.image("ground", "./assets/images/background-ground.png");
    this.load.spritesheet("gui", "./assets/images/gui.png", {
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

    for (var i = 0; i < 7; i++) {
      this.add.image(40 * i, 0, "sky", i).setOrigin(0);
    }

    const grounds = [];

    for (var i = 0; i < 7; i++) {
      const ground = this.physics.add
        .image(40 * i, 95, "ground", i)
        .setOrigin(0)
        .setCollideWorldBounds(true)
        .setImmovable(true)
        .setBodySize(40, 50, true);
      ground.body.allowGravity = false;
      grounds.push(ground);
    }

    this.player = this.physics.add
      .sprite(40, 92, "character")
      .setBodySize(20, 20, true);
    this.player.setCollideWorldBounds(true);
    // cody.setScale(1);
    this.player.play("stand");

    // this.add.image(15, 115, "gui", 3).setOrigin(0);
    // this.add.image(225, 115, "gui", 0).setOrigin(0);

    // this.add.image(140, 110, "gui", 4).setOrigin(0.5).setScale(3);

    // this.add.image(140, 50, "gui", 5).setOrigin(0.5).setScale(3);
    this.add.image(140, 115, "character", 18).setOrigin(0.5).setScale(2);

    this.physics.add.collider(this.player, grounds);

    this.keyJump = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.keySlide = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );
  }
  setJumpable() {
    console.log("1231312");
    // this.isJumpable = true;
  }
  update(time: number, delta: number): void {
    if (!this.player) return;
    // if( this.physics.is)
    switch (true) {
      case this.keyJump?.isDown:
        if (!this.isJumpable) break;
        this.player.play("jump", true);
        this.player.setVelocityY(-150);
        // this.isJumpable = false;
        break;
      case this.keySlide?.isDown:
        this.player.play("crawl", true);
        break;
      default:
        this.player.play("stand", true);
    }
  }
}
