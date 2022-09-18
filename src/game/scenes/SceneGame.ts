import { Scene } from "phaser";
import {
  PlayerController,
  PlayerState,
  StateType,
} from "../classes/PlayerController";

const TIME_PER_STAGE = 1000;

export default class SceneGame extends Scene {
  isStarted: Boolean = false;
  keyJump: Phaser.Input.Keyboard.Key | undefined;
  keySlide: Phaser.Input.Keyboard.Key | undefined;
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
  isJumpable: boolean = true;
  controller: PlayerController | undefined;
  sky: Phaser.GameObjects.TileSprite | undefined;
  stage = 1;
  startedTime: number = 0;

  // groundsPool: Phaser.GameObjects.Group | undefined;
  title: Phaser.GameObjects.Image | undefined;
  gui: Phaser.GameObjects.Image | undefined;
  grounds: Phaser.GameObjects.Group | undefined;
  groundsPool: Phaser.GameObjects.Group | undefined;
  constructor() {
    super({ key: SceneGame.name });
  }

  preload() {
    this.load.image("title", "./assets/images/title-2.png");
  }

  create() {
    // for (var i = 0; i < 7; i++) {
    //   this.add.image(40 * i, 0, "sky", 0).setOrigin(0);
    // }

    this.sky = this.add
      .tileSprite(0, 0, 280, 160, "sky", this.stage - 1)
      .setOrigin(0, 0)
      .setScrollFactor(0.25, 0);

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
        .setCollideWorldBounds(false)
        .setImmovable(true)
        .setBodySize(40, 50, true);
      ground.body.allowGravity = false;
      this.grounds?.add(ground);
    }

    this.title = this.add.image(140, 60, "title").setOrigin(0.5).setScale(2);

    this.player = this.physics.add
      .sprite(40, 92, "character")
      .setBodySize(20, 20, true);

    this.controller = new PlayerController(this.player, this);

    this.physics.add.collider(this.player, this.grounds, () => {
      if (this.controller?.currentState === StateType.Jumping)
        this.controller?.setState(StateType.Standing);
    });

    this.keyJump = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.keySlide = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );

    // this.cameras.main.startFollow(this.player, true);
    // this.cameras.main.setBounds(
    //   0,
    //   0,
    //   Number.MAX_SAFE_INTEGER,
    //   this.scale.baseSize.height
    // );
    this.gui = this.add.image(140, 105, "gui", 4).setOrigin(0.5).setScale(2);

    // this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, 160);
  }

  // update stage
  updateStage(startedTime: number, currentTime: number) {
    if (this.isStarted === false) return;
    this.stage = Math.floor((currentTime - startedTime) / TIME_PER_STAGE);
    this.sky?.setFrame(this.stage % 14);
    this.controller?.updateVelocity(this.stage);
    // this.moveGrounds(this.stage);
  }

  update(time: number, delta: number): void {
    if (!this.player) return;
    if (!this.controller) return;

    this.updateStage(this.startedTime, time);

    // 0 1 2 3 4 5
    // t 0 ~ 5
    // 6 5 4 3 2 1
    // t 6 ~ 11
    // 0 1 2 3 4 5

    // this.player.play(this.controller.currentState || StateType.Standing);
    switch (true) {
      case this.isStarted === false &&
        (this.keyJump?.isDown || this.keySlide?.isDown):
        this.isStarted = true;
        this.startedTime = time;
        this.gui?.destroy();
        // this.controller.startGame(this.stage);

        break;
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
