import inquirer from "inquirer";
import { writeIt } from "pickitt";

import { join } from "path";

import { JobObject, JobsObject, AppState } from "../util";

const edit = (state: AppState): Promise<void> =>
  new Promise(async (resolve: Function, reject: Function) => {
    try {
      const { id } = await inquirer.prompt([
        { type: "number", name: "id", message: "Job ID?" }
      ]);

      const jobs = state.jobs.jobs;

      const selectedJob = jobs.find((job: JobObject) => job.id === id);

      interface FieldToEditAnswer {
        fieldToEdit: string;
      }

      interface NewValueAnswer {
        newValue: string;
      }

      const { fieldToEdit }: FieldToEditAnswer = await inquirer.prompt([
        {
          type: "list",
          name: "fieldToEdit",
          message: "Select a field to edit",
          choices: [
            { value: "company", name: "Company" },
            { value: "contact", name: "Contact" },
            { value: "status", name: "Status" },
            { value: "title", name: "Title" },
            { value: "todo", name: "TODO" },
            { value: "type", name: "Type" }
          ]
        }
      ]);

      const { newValue }: NewValueAnswer = await inquirer.prompt([
        {
          type: "input",
          message: `${fieldToEdit.toUpperCase()}`,
          name: "newValue",
          default: selectedJob[fieldToEdit]
        }
      ]);

      const newJobs: JobsObject = {
        jobs: jobs.map((job: JobObject) => {
          if (job.id === id) {
            return { ...job, [fieldToEdit]: newValue };
          } else {
            return job;
          }
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

export default edit;
