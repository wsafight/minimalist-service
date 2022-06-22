export const enum ErrorType {
    App = 'app',
    RequestArgument = 'requestArgument',
    SqlExecute = 'sqlExecute'
}

export class AppError extends Error {
    constructor(message: string) {
        super(message)
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }
}

export class RequestArgumentError extends Error {
    constructor(message: string) {
        super(message)
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }
}

export class SqlExcuteError extends Error {
    constructor(message: string) {
        super(message)
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }
}


export const ERROR_CLASS: Record<ErrorType, any> = {
    [ErrorType.App]: AppError,
    [ErrorType.RequestArgument]: RequestArgumentError,
    [ErrorType.SqlExecute]: SqlExcuteError,
}

export const invariant = (condition: boolean, errorMsg: string, type?: ErrorType) => {
    if (condition) {
        const ErrorClass: ErrorConstructor = ERROR_CLASS[type] || Error;
        throw new ErrorClass(errorMsg)
    }
}