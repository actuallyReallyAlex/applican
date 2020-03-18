import inquirer from "inquirer";
import { writeIt } from "pickitt";

import { join } from "path";

import { AppState, JobObject, JobsObject } from "../util";

const add = (state: AppState): Promise<void> =>
  new Promise(async (resolve: Function, reject: Function) => {
    try {
      const { company } = await inquirer.prompt([
        { type: "input", name: "company", message: "Company?" }
      ]);
      const { url } = await inquirer.prompt([
        { type: "input", name: "url", message: "URL?" }
      ]);
      const { title } = await inquirer.prompt([
        { type: "input", name: "title", message: "Title?" }
      ]);
      const { type } = await inquirer.prompt([
        { type: "input", name: "type", message: "Type?" }
      ]);
      const { status } = await inquirer.prompt([
        { type: "input", name: "status", message: "Status?" }
      ]);
      const { contact } = await inquirer.prompt([
        { type: "input", name: "contact", message: "Contact?" }
      ]);
      const { todo } = await inquirer.prompt([
        { type: "input", name: "todo", message: "TODO?" }
      ]);

      const newJob: JobObject = {
        id: state.jobs.jobs.length,
        company,
        url,
        title,
        type,
        status,
        contact,
        todo
      };

      const newJobs: JobsObject = {
        jobs: Array.from(state.jobs.jobs)
      };

      newJobs.jobs.push(newJob);

      await writeIt(
        join(__dirname, "../../jobs.json"),
        JSON.stringify(newJobs, null, 2)
      );

      state.jobs = newJobs;

      resolve();
    } catch (e) {
      reject(e);
    }
  });

export default add;
