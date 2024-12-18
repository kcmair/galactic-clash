import {
  audio,
  loader,
  state,
  device,
  video,
  utils,
  plugin,
  pool,
} from "melonjs";

import "./index.css";

import PlayScreen from "./js/stage/play.js";
import StartScreen from "./js/stage/start.js";
import PlayerEntity from "./js/renderables/player.js";
import EnemyEntity from "./js/renderables/enemy.js";
import EnemyManager from "./js/managers/enemy-manager.js";
import Laser from "./js/renderables/laser.js";
import GameOver from "./js/stage/game-over.js";

import DataManifest from "./manifest.js";

device.onReady(() => {
  if (
    !video.init(1218, 562, {
      parent: "screen",
      scale: "auto",
      scaleMethod: "flex-width",
    })
  ) {
    alert("Your browser does not support HTML5 canvas.");
    return;
  }

  if (process.env.NODE_ENV === "development") {
    import("@melonjs/debug-plugin").then((debugPlugin) => {
      utils.function.defer(
        plugin.register,
        this,
        debugPlugin.DebugPanelPlugin,
        "debugPanel",
      );
    });
  }

  audio.init("mp3,ogg");

  loader.setOptions({ crossOrigin: "anonymous" });

  loader.preload(DataManifest, function () {
    state.set(state.START, new StartScreen());
    state.set(state.PLAY, new PlayScreen());
    state.set(state.GAMEOVER, new GameOver());

    pool.register("mainPlayer", PlayerEntity);
    pool.register("enemy", EnemyEntity);
    pool.register("enemyManager", EnemyManager, true);
    pool.register("laser", Laser, true);

    state.change(state.START);
  });
});
