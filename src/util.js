import boxen from 'boxen'
import chalk from 'chalk'
import figlet from 'figlet'

import { readFile } from 'fs'
import { join } from 'path'
import { async } from 'regenerator-runtime'

/**
 * Default style applied to Boxen.
 */
const defaultBoxenStyle = {
  borderColor: 'magentaBright',
  borderStyle: 'round',
  float: 'center',
  padding: { top: 0, bottom: 0, right: 1, left: 1 }
}

/**
 * Uses Figlet to transform your text to ASCII.
 * @param {String} txt Text to be figlet-itized.
 * @param {Object} options Options object.
 * @returns {Promise} Resolves with text.
 */
const figletPromise = (txt, options = {}) =>
  new Promise((resolve, reject) =>
    figlet.text(txt, options, (error, result) => {
      if (error) {
        return reject(error)
      }

      return resolve(result)
    })
  )

const read = path =>
  new Promise((resolve, reject) => {
    try {
      readFile(path, (err, data) => {
        if (err) {
          return reject(err)
        }

        resolve(JSON.parse(data.toString()))
      })
    } catch (e) {
      reject(e)
    }
  })

const displayJobs = () =>
  new Promise(async (resolve, reject) => {
    try {
      const jobs = await read(join(__dirname, '../jobs.json'))
      console.log(JSON.stringify(jobs, null, 2))
      resolve()
    } catch (e) {
      reject(e)
    }
  })

const displayTitle = () =>
  new Promise(async (resolve, reject) => {
    try {
      const text = await figletPromise('Job Applications', { font: 'slant' })

      console.log(boxen(chalk.blueBright(text), defaultBoxenStyle))
      resolve()
    } catch (e) {
      reject(e)
    }
  })

module.exports = {
  displayJobs,
  displayTitle
}
