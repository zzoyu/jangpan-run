<script setup lang="ts">
import { env } from "process";
import { nextTick, onMounted, ref } from "vue";
import launch from "./game";

const container = ref<HTMLElement>();
const game = ref();

onMounted(() =>
  nextTick(async () => {
    if (!container.value) return;

    game.value = await launch(container.value, {
      type: Phaser.AUTO,
      width: 280,
      height: 160,
      pixelArt: true,
      zoom: 3,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 300 },
          debug: env?.NODE_ENV === "development" ? true : false,
        },
      },
    });
    game.value.scale.pageAlignHorizontally = true;
    game.value.scale.pageAlignVertically = true;
    console.log(game.value);
  })
);
</script>

<template>
  <div ref="container"></div>
</template>

<style>
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background-color: black;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
