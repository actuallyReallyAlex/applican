import "core-js/stable";
import "regenerator-runtime/runtime";

import EventEmitter from "events";

import {
  AppState,
  displayJobs,
  displayTitle,
  displayMainMenu,
  interpretMenuAction,
  readJobs
} from "./util";

const main: Function = async () => {
  const menuActionEmitter = new EventEmitter.EventEmitter();
  menuActionEmitter.on("actionCompleted", async state => {
    console.log("here");
    await displayTitle();
    await displayJobs(state);
    await displayMainMenu(state);
    await interpretMenuAction(state);
  });

  const state: AppState = {
    jobs: null,
    menuAction: null,
    menuActionEmitter
  };

  await readJobs(state);

  await displayTitle();

  await displayJobs(state);

  await displayMainMenu(state);

  await interpretMenuAction(state);
};

main();
