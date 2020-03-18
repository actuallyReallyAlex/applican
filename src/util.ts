import boxen from "boxen";
import chalk from "chalk";
import clear from "clear";
import Table from "cli-table";
import figlet from "figlet";
import inquirer from "inquirer";

import { readFile, writeFile } from "fs";
import { join } from "path";

import { blankBoxenStyle, defaultBoxenStyle, statusColors } from "./constants";
import edit from "./actions/edit";

/**
 * Uses Figlet to transform your text to ASCII.
 * @param {String} txt Text to be figlet-itized.
 * @param {Object} options Options object.
 * @returns {Promise} Resolves with text.
 */
const figletPromise: Function = (
  txt: string,
  options: object = {}
): Promise<string> =>
  new Promise((resolve, reject) =>
    figlet.text(
      txt,
      options,
      (error: undefined | object, result: undefined | string) => {
        if (error) {
          return reject(error);
        }

        return resolve(result);
      }
    )
  );

/**
 * Reads a file and returns as parsed JSON.
 * @param {String} path - Path to file to be read.
 */
export const read: Function = (path: string) =>
  new Promise((resolve, reject) => {
    try {
      readFile(path, (err: undefined | object, data: undefined | object) => {
        if (err) {
          return reject(err);
        }

        resolve(JSON.parse(data.toString()));
      });
    } catch (e) {
      reject(e);
    }
  });

export const write: Function = (path: string, data: JSON): Promise<Buffer> =>
  new Promise((resolve: Function, reject: Function) => {
    try {
      writeFile(path, data, (err: Error) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
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

export const displayJobs: Function = () =>
  new Promise(async (resolve, reject) => {
    try {
      const { jobs }: JobsObject = await read(join(__dirname, "../jobs.json"));
      const table: object = await createTable(jobs);

      console.log(boxen(table.toString(), blankBoxenStyle));
      resolve();
    } catch (e) {
      reject(e);
    }
  });

export const displayTitle: Function = () =>
  new Promise(async (resolve, reject) => {
    try {
      const text: string = await figletPromise("Job Applications", {
        font: "slant"
      });

      clear();
      console.log(boxen(chalk.blueBright(text), defaultBoxenStyle));
      resolve();
    } catch (e) {
      reject(e);
    }
  });

export const displayMainMenu: Function = (): Promise<void> =>
  new Promise(async (resolve: Function, reject: Function) => {
    try {
      const { menuAction } = await inquirer.prompt([
        {
          type: "list",
          message: "Main Menu",
          name: "menuAction",
          choices: [{ value: "edit", name: "Edit" }]
        }
      ]);
      resolve(menuAction);
    } catch (e) {
      reject(e);
    }
  });

export type MenuAction = "Edit";

export const interpretMenuAction: Function = async (
  menuAction: MenuAction
): Promise<void> => {
  try {
    const actions = {
      edit: async (): Promise<void> => {
        await edit();
      }
    };

    await actions[menuAction]();
  } catch (e) {
    throw new Error(e);
  }
};
