export default interface Validatorinterface<T> {
  validate(entity: T): void
}