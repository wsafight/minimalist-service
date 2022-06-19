import { RequestArgumentError, SqlExcuteError, AppError } from "./business-error";

export const enum ErrorType {
    App = 'app',
    RequestArgument = 'requestArgument',
    SqlExecute = 'sqlExecute'
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