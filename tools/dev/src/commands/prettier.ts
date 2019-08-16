import { prettier as runPrettier } from '../binaries'

export const prettier = (argv: string[]): Promise<number> => runPrettier('--write', ...argv, 'src/**/*.ts', '**/*.js')
