import chalk from 'chalk'

/**
 * Blank style applied to Boxen.
 */
const blankBoxenStyle = {
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
const defaultBoxenStyle = {
  borderColor: 'magentaBright',
  borderStyle: 'round',
  float: 'center',
  padding: { top: 0, bottom: 0, right: 1, left: 1 }
}

const statusColors = {
  Accepted: chalk.greenBright,
  Applied: chalk.yellowBright,
  Rejected: chalk.redBright
}

module.exports = {
  blankBoxenStyle,
  defaultBoxenStyle,
  statusColors
}
