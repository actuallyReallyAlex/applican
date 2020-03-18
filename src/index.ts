import "core-js/stable";
import "regenerator-runtime/runtime";

import {
  displayJobs,
  displayTitle,
  displayMainMenu,
  interpretMenuAction,
  MenuAction
} from "./util";

const main: Function = async () => {
  await displayTitle();

  await displayJobs();

  const menuAction: MenuAction = await displayMainMenu();

  await interpretMenuAction(menuAction);
};

main();
