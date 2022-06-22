export const invariant = (condition: boolean, errorMsg: string, ErrorClass: ErrorConstructor = Error) => {
    if (condition) {
        throw new ErrorClass(errorMsg)
    }
}