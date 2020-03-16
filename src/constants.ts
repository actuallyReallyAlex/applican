import chalk from 'chalk'
import { Options as boxenOptions, BorderStyle } from 'boxen'

/**
 * Blank style applied to Boxen.
 */
export const blankBoxenStyle: boxenOptions = {
  borderStyle: {
    topLeft: ' ',
    topRight: ' ',
    bottomLeft: ' ',
    bottomRight: ' ',
    horizontal: ' ',
    vertical: ' '
  },
  float: 'center',
  padding: { top: 0, bottom: 0, right: 1, left: 1 }
}

/**
 * Default style applied to Boxen.
 */
export const defaultBoxenStyle: boxenOptions = {
  borderColor: 'magentaBright',
  borderStyle: BorderStyle.Round,
  float: 'center',
  padding: { top: 0, bottom: 0, right: 1, left: 1 }
}

export const statusColors: object = {
  Accepted: chalk.greenBright,
  Applied: chalk.yellowBright,
  Rejected: chalk.redBright
}

module.exports = {
  blankBoxenStyle,
  defaultBoxenStyle,
  statusColors
}
