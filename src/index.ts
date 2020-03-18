import "core-js/stable";
import "regenerator-runtime/runtime";

import { displayJobs, displayTitle, displayMainMenu } from "./util";

const main: Function = async () => {
  await displayTitle();

  await displayJobs();

  await displayMainMenu();
};

main();
