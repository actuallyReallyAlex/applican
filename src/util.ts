import boxen from "boxen";
import chalk from "chalk";
import Table from "cli-table";
import inquirer from "inquirer";
import { readIt } from "pickitt";

import EventEmitter from "events";
import { join } from "path";

import { blankBoxenStyle, statusColors } from "./constants";
import edit from "./actions/edit";
import add from "./actions/add";
import deleteJob from "./actions/delete";

export interface AppState {
  jobs: JobsObject;
  menuAction: null | string;
  menuActionEmitter: EventEmitter.EventEmitter;
}

export const readJobs: Function = (state: AppState): Promise<object> =>
  new Promise(async (resolve: Function, reject: Function) => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const jobs: JobsObject = await readIt(join(__dirname, "../jobs.json"));
      state.jobs = jobs;
      resolve(jobs);
    } catch (e) {
      reject(e);
    }
  });

export interface JobObject {
  company: string;
  contact: string;
  id: number;
  status: "Accepted" | "Applied" | "Rejected" | "Initial Communications";
  title: string;
  todo: string;
  type: "Contract" | "Fulltime" | "Parttime";
  url: string;
}

export const createTable: Function = (jobs: object[]) =>
  new Promise((resolve, reject) => {
    try {
      const table = new Table({
        head: ["id", "Company", "Title", "Type", "Contact", "TODO", "Status"]
      });

      jobs.forEach((job: JobObject) => {
        const status = statusColors[job.status]
          ? statusColors[job.status](job.status)
          : chalk.yellowBright(job.status);

        table.push([
          `${job.id}`,
          `${job.company}`,
          `${job.title}`,
          `${job.type}`,
          `${job.contact}`,
          `${job.todo}`,
          status
        ]);
      });

      resolve(table);
    } catch (e) {
      reject(e);
    }
  });

export interface JobsObject {
  jobs: Array<object>;
}

export const displayJobs: Function = (state: AppState) =>
  new Promise(async (resolve: Function, reject: Function) => {
    try {
      const table: object = await createTable(state.jobs.jobs);

      console.log(boxen(table.toString(), blankBoxenStyle));
      resolve();
    } catch (e) {
      reject(e);
    }
  });

export const displayMainMenu: Function = (state: AppState): Promise<void> =>
  new Promise(async (resolve: Function, reject: Function) => {
    try {
      const { menuAction } = await inquirer.prompt([
        {
          type: "list",
          message: "Main Menu",
          name: "menuAction",
          choices: [
            { value: "add", name: "Add" },
            { value: "delete", name: "Delete" },
            { value: "edit", name: "Edit" },
            new inquirer.Separator(),
            { value: "exit", name: "Exit" }
          ]
        }
      ]);
      state.menuAction = menuAction;
      resolve(menuAction);
    } catch (e) {
      reject(e);
    }
  });

export type MenuAction = "Edit";

export const interpretMenuAction: Function = async (
  state: AppState
): Promise<void> => {
  try {
    const actions = {
      add: async (state: AppState): Promise<void> => {
        await add(state);
        state.menuActionEmitter.emit("actionCompleted", state);
      },
      delete: async (state: AppState): Promise<void> => {
        await deleteJob(state);
        state.menuActionEmitter.emit("actionCompleted", state);
      },
      edit: async (state: AppState): Promise<void> => {
        await edit(state);
        state.menuActionEmitter.emit("actionCompleted", state);
      },
      exit: (): void => process.exit()
    };

    await actions[state.menuAction](state);
  } catch (e) {
    throw new Error(e);
  }
};
