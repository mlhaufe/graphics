import { Vector2 } from './Vector.mjs';

export class Point2 extends Vector2 {
    constructor(readonly x: number, readonly y: number) { super(x, y); }

    override toString() { return `(${this.x}, ${this.y})`; }
}

/**
 * A Vertex2 is a point where two or more lines meet.
 */
export class Vertex2 extends Point2 { }