enum State {
  Standing,
  Jumping,
  Crawling,
  Dead,
}

export default class PlayerController {
  states: Map<State, PlayerState>;
  currentState: PlayerState | undefined;
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor(
    player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    states: Map<State, PlayerState>
  ) {
    this.player = player;
    this.states = states;
    this.currentState = states.get(State.Standing);
  }
}

abstract class PlayerState {
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  constructor(player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
    this.player = player;
  }
  abstract enter: void;
  // abstract ;
}
