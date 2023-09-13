export interface Validator<T>{
    validate(entity: T): void
}