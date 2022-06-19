import fs from 'fs';
import path from 'path'
import { ErrorType, invariant } from '../error/invariant';
import { AppConfigService } from './app';

export const loadAppConfig = (configFilePath: string = 'app-config.json') => {
    const filePath = path.resolve(configFilePath)
    invariant(!fs.existsSync(filePath), `cannot found file: ${filePath}`, ErrorType.App)
    const content = fs.readFileSync(filePath, 'utf-8')
    try {
        const config = JSON.parse(content)
        AppConfigService.initialInstance(config);
    } catch (_e) {
        invariant(true, 'cannot parse config file', ErrorType.App)
    }
}

