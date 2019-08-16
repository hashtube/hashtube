import { add } from './add'
import { build } from './build'
import { checkDependencies } from './check-deps'
import { clean } from './clean'
import { eslint } from './eslint'
import { prettier } from './prettier'
import { run } from './run'
import { tslint } from './tslint'
import { watch } from './watch'

const commands: Record<string, (argv: string[]) => Promise<number>> = {
  add,
  build,
  clean,
  eslint,
  prettier,
  run,
  tslint,
  watch,
  'check-deps': checkDependencies,
}

export default commands
