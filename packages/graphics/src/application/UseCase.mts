export abstract class UseCase<T> {
    abstract execute(args: T): void;
}