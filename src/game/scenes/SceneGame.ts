import { Scene } from "phaser";
import {
  PlayerController,
  PlayerState,
  StateType,
} from "../classes/PlayerController";

export default class SceneGame extends Scene {
  keyJump: Phaser.Input.Keyboard.Key | undefined;
  keySlide: Phaser.Input.Keyboard.Key | undefined;
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
  isJumpable: boolean = true;
  controller: PlayerController | undefined;
  sky: Phaser.GameObjects.TileSprite | undefined;
  stage = 1;
  grounds: Phaser.GameObjects.Group | undefined;
  groundsPool: Phaser.GameObjects.Group | undefined;
  constructor() {
    super({ key: SceneGame.name });
  }

  preload() {}

  create() {
    // for (var i = 0; i < 7; i++) {
    //   this.add.image(40 * i, 0, "sky", 0).setOrigin(0);
    // }

    this.sky = this.add
      .tileSprite(0, 0, 280, 160, "sky", this.stage - 1)
      .setOrigin(0, 0)
      .setScrollFactor(0, 0);

    this.grounds = this.add.group({
      removeCallback: (ground) => {
        this.groundsPool?.add(ground);
      },
    });

    this.groundsPool = this.add.group({
      removeCallback: (ground) => {
        this.grounds?.add(ground);
      },
    });

    for (var i = 0; i < 1000; i++) {
      const ground = this.physics.add
        .image(40 * i, 95, "ground", 0)
        .setOrigin(0)
        .setCollideWorldBounds(true)
        .setImmovable(true)
        .setBodySize(40, 50, true);
      ground.body.allowGravity = false;
      this.grounds.add(ground);
    }

    this.player = this.physics.add
      .sprite(40, 92, "character")
      .setBodySize(20, 20, true);

    this.controller = new PlayerController(this.player, this);

    // this.add.image(15, 115, "gui", 3).setOrigin(0);
    // this.add.image(225, 115, "gui", 0).setOrigin(0);

    // this.add.image(140, 50, "gui", 5).setOrigin(0.5).setScale(3);
    // this.add.image(140, 115, "character", 18).setOrigin(0.5).setScale(2);

    this.physics.add.collider(this.player, this.grounds, () => {
      // console.log(this.controller?.currentState);
      if (this.controller?.currentState === StateType.Jumping)
        this.controller?.setState(StateType.Standing);
    });

    this.keyJump = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.keySlide = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );

    this.cameras.main.startFollow(this.player, true);
    this.cameras.main.setBounds(
      0,
      0,
      Number.MAX_SAFE_INTEGER,
      this.scale.baseSize.height
    );

    // this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, 160);
  }
  update(time: number, delta: number): void {
    if (!this.player) return;
    if (!this.controller) return;

    this.stage = Math.floor(time / 1000);
    this.sky?.setFrame(
      (this.stage % 6) +
        (Math.floor(this.stage / 6) % 2) * (6 - (this.stage % 6))
    );

    // 0 1 2 3 4 5
    // t 0 ~ 5
    // 6 5 4 3 2 1
    // t 6 ~ 11
    // 0 1 2 3 4 5

    // this.player.play(this.controller.currentState || StateType.Standing);
    switch (true) {
      case this.keyJump?.isDown:
        this.controller?.setState?.(StateType.Jumping);
        break;
      //     if (!this.isJumpable) break;
      //     this.player.play("jump", true);
      //     this.sound.play("jump");
      //     this.player.setVelocityY(-150);
      //     // this.isJumpable = false;
      //     break;
      case this.keySlide?.isDown:
        this.controller?.setState?.(StateType.Crawling);
        break;
      case this.keySlide?.isUp &&
        this.controller.currentState === StateType.Crawling:
        this.controller?.restoreState();
    }
  }
}
