import Phaser from "phaser";
import scene from "./scenes";

export default function launch(
  parent: HTMLElement,
  config: Phaser.Types.Core.GameConfig
) {
  return new Promise(() => new Phaser.Game({ ...config, parent, scene }));
}
