import { ErrorType, invariant } from "../error/invariant";

export interface AppConfig {
    serverPort: number
}

export class AppConfigService {
    static service: AppConfigService;
    private readonly config: AppConfig

    static initialInstance = (config: AppConfig) => {
        if (AppConfigService.service) {
            return
        }
        AppConfigService.service = new AppConfigService(config)
    }

    static getInstance() {
        invariant(!AppConfigService.service, 'not iniaial service', ErrorType.App)
        return AppConfigService.service;
    }

    constructor(config: AppConfig) {
        this.config = Object.freeze(config);
    }

    getAppConfig = () => this.config
}