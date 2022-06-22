import fs from 'fs';
import path from 'path'
import { invariant } from '../error/invariant';

import { getAppConfig, initialAppConfig } from './app';

export const loadAppConfig = (configFilePath: string = '') => {
    if (!configFilePath.length) {
        return getAppConfig()
    }
    const filePath = path.resolve(configFilePath)
    invariant(!fs.existsSync(filePath), `cannot found file: ${filePath}`)
    const content = fs.readFileSync(filePath, 'utf-8')
    try {
        const config = JSON.parse(content)
        initialAppConfig(config)
        return getAppConfig();
    } catch (_e) {
        invariant(true, 'cannot parse config file')
    }
}

