import 'core-js/stable'
import 'regenerator-runtime/runtime'

import { displayJobs, displayTitle } from './util'

const main: Function = async () => {
  await displayTitle()

  await displayJobs()
}

main()
