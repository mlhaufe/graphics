export abstract class Presenter<D> {
    abstract present(data: D): void;
}