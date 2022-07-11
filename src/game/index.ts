import Phaser from "phaser";

export default function launch(parent: HTMLElement) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    parent,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 300 },
        debug: process.env?.development ? true : false,
      },
    },
    scene: [],
  });
}
