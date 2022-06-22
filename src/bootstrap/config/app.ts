export interface AppConfig {
    serverPort: number
}

let appConfig: Partial<AppConfig> = Object.freeze({
    serverPort: 8089
})

export const initialAppConfig = (config: AppConfig) => {
    appConfig = Object.freeze(config)
}

export const getAppConfig = () => {
    return appConfig;
}