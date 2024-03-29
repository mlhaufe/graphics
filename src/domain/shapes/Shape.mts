export type Vertex2 = [x: number, y: number];
export type Radius = number;
export type Side = number;

export abstract class Shape { }

export class Rectangle extends Shape {
    constructor(
        readonly width: Side,
        readonly height: Side
    ) { super(); }
}

export class Ellipse extends Shape {
    constructor(
        readonly radiusX: Radius,
        readonly radiusY: Radius
    ) { super(); }
}

export class RtTriangle extends Shape {
    constructor(
        readonly base: Side,
        readonly height: Side
    ) { super(); }
}

export class Polygon extends Shape {
    #vertices: Vertex2[];
    constructor(...vertices: Vertex2[]) {
        super();
        if (vertices.length < 3)
            throw new Error('A polygon must have at least 3 vertices');
        this.#vertices = vertices;
    }
    get vertices(): Vertex2[] { return this.#vertices; }
}