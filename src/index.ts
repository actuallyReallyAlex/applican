import "core-js/stable";
import "regenerator-runtime/runtime";

import {
  AppState,
  displayJobs,
  displayTitle,
  displayMainMenu,
  interpretMenuAction,
  MenuAction,
  readJobs
} from "./util";

const main: Function = async () => {
  const state: AppState = {
    jobs: null,
    menuAction: null
    // menuActionEmitter,
  };

  await readJobs(state);

  await displayTitle();

  await displayJobs(state);

  const menuAction: MenuAction = await displayMainMenu();

  await interpretMenuAction(menuAction);
};

main();
