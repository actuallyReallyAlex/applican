import inquirer from "inquirer";

import { join } from "path";

import { JobObject, JobsObject, read, write } from "../util";

const edit = (): Promise<void> =>
  new Promise(async (resolve: Function, reject: Function) => {
    try {
      const { id } = await inquirer.prompt([
        { type: "number", name: "id", message: "Job ID?" }
      ]);

      const { jobs }: JobsObject = await read(
        join(__dirname, "../../jobs.json")
      );

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

      await write(
        join(__dirname, "../../jobs.json"),
        JSON.stringify(newJobs, null, 2)
      );

      resolve();
    } catch (e) {
      reject(e);
    }
  });

export default edit;
