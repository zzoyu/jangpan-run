import { Scene } from "phaser";

export enum StateType {
  Standing = "standing",
  Jumping = "jumping",
  Crawling = "crawling",
  Dead = "dead",
}

export class PlayerController {
  states: Map<StateType, PlayerState>;
  currentState: StateType | undefined;
  previousState: StateType | undefined;
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  isJumpable: boolean = true;
  scene: Scene;

  constructor(
    player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    scene: Scene
  ) {
    this.scene = scene;
    this.player = player;
    this.states = new Map<StateType, PlayerState>();
    this.states.set(
      StateType.Standing,
      new PlayerState(
        () => true,
        () => {
          this.isJumpable = true;
          this.player.play(StateType.Standing, true);
        }
      )
    );
    this.states.set(
      StateType.Jumping,
      new PlayerState(
        () => this.isJumpable || this.previousState === StateType.Jumping,
        () => {
          if (this.isJumpable) {
            this.isJumpable = false;
            this.player.setVelocityY(-150);
            scene.sound.play("jump");
          }
          this.player.play(StateType.Jumping, true);
        }
      )
    );
    this.states.set(
      StateType.Crawling,
      new PlayerState(
        () => true,
        () => {
          this.player.play(StateType.Crawling, true);
        }
      )
    );
    // Animation set
    this.player.anims.create({
      key: StateType.Standing,
      frames: this.player.anims.generateFrameNumbers("character", {
        frames: [0, 1, 2, 3],
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.player.anims.create({
      key: StateType.Jumping,
      frames: this.player.anims.generateFrameNumbers("character", {
        frames: [1, 2],
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.player.anims.create({
      key: StateType.Crawling,
      frames: this.player.anims.generateFrameNumbers("character", {
        frames: [4, 5],
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.player.anims.create({
      key: StateType.Dead,
      frames: this.player.anims.generateFrameNumbers("character", {
        frames: [6, 7, 8, 9],
      }),
      frameRate: 8,
    });

    this.player.setCollideWorldBounds(true);
    this.setState?.(StateType.Standing);
  }

  updateVelocity(stage: number) {
    // this.player.setVelocityX(100 + stage * 10);
  }

  setState(state: StateType) {
    if (this.currentState === state) return;
    if (!this.states.get(state)?.condition?.()) return;
    this.previousState = this.currentState;
    this.currentState = state;
    this.states.get(this.currentState)?.enter?.(this.scene);
  }

  restoreState() {
    this.previousState && this.setState(this.previousState);
  }
}

export class PlayerState {
  condition: () => void;
  constructor(condition: () => void, enter: (scene: Scene) => void) {
    this.condition = condition;
    this.enter = enter;
  }
  enter: (scene: Scene) => void;
  // abstract ;
}
