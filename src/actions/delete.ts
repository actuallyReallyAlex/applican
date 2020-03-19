import inquirer from "inquirer";
import { writeIt } from "pickitt";

import { join } from "path";

import { AppState, JobObject } from "../util";

const deleteJob = (state: AppState): Promise<void> =>
  new Promise(async (resolve: Function, reject: Function) => {
    try {
      const { id } = await inquirer.prompt([
        { type: "number", name: "id", message: "Job ID?" }
      ]);

      const jobs = state.jobs.jobs;

      const newJobs = {
        jobs: jobs
          .filter((job: JobObject) => job.id !== id)
          .map((job: JobObject, i: number) => {
            return { ...job, id: i };
          })
      };

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

export default deleteJob;
