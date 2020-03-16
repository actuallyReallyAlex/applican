import * as boxen from 'boxen'
import * as chalk from 'chalk'
import * as clear from 'clear'
import * as figlet from 'figlet'
import * as Table from 'cli-table'

import { readFile } from 'fs'
import { join } from 'path'

import { blankBoxenStyle, defaultBoxenStyle, statusColors } from './constants'

/**
 * Uses Figlet to transform your text to ASCII.
 * @param {String} txt Text to be figlet-itized.
 * @param {Object} options Options object.
 * @returns {Promise} Resolves with text.
 */
const figletPromise: Function = (txt: String, options: Object = {}): Promise<any> =>
  new Promise((resolve, reject) =>
    figlet.text(txt, options, (error: undefined | Object, result: undefined | String) => {
      if (error) {
        return reject(error)
      }

      return resolve(result)
    })
  )

/**
 * Reads a file and returns as parsed JSON.
 * @param {String} path - Path to file to be read.
 */
const read: Function = (path: string) =>
  new Promise((resolve, reject) => {
    try {
      readFile(path, (err: undefined | Object, data: undefined | Object) => {
        if (err) {
          return reject(err)
        }

        resolve(JSON.parse(data.toString()))
      })
    } catch (e) {
      reject(e)
    }
  })

interface JobObject {
  company: String
  id: Number
  status: 'Accepted' | 'Applied' | 'Rejected' | 'Initial Communications'
  title: String
  type: 'Contract' | 'Fulltime' | 'Parttime'
}

const createTable: Function = (jobs: any[]) =>
  new Promise((resolve, reject) => {
    try {
      const table = new Table({ head: ['id', 'Company', 'Title', 'Type', 'Status'] })

      jobs.forEach((job: JobObject) => {
        const status = statusColors[job.status] ? statusColors[job.status](job.status) : chalk.yellowBright(job.status)

        table.push([`${job.id}`, `${job.company}`, `${job.title}`, `${job.type}`, status])
      })

      resolve(table)
    } catch (e) {
      reject(e)
    }
  })

interface jobsObject {
  jobs: Array<object>
}

export const displayJobs: Function = () =>
  new Promise(async (resolve, reject) => {
    try {
      const { jobs }: jobsObject = await read(join(__dirname, '../jobs.json'))
      const table: Object = await createTable(jobs)

      console.log(boxen(table.toString(), blankBoxenStyle))
      resolve()
    } catch (e) {
      reject(e)
    }
  })

export const displayTitle: Function = () =>
  new Promise(async (resolve, reject) => {
    try {
      const text: String = await figletPromise('Job Applications', { font: 'slant' })

      clear()
      console.log(boxen(chalk.blueBright(text), defaultBoxenStyle))
      resolve()
    } catch (e) {
      reject(e)
    }
  })
