import 'core-js/stable'
import 'regenerator-runtime/runtime'

import { displayJobs, displayTitle } from './util'

const main = async () => {
  await displayTitle()

  await displayJobs()
}

main()
