import { div } from '~/domain/Math.mjs';
import { Vertex2 } from './Point.mjs';
import { ValueObject } from '~/domain/ValueObject.mjs';

export type Radius = number;
export type Side = number;

const { abs, sqrt, PI } = Math;

export abstract class Shape extends ValueObject {
    abstract area(): number;
    abstract toPath2D(): Path2D;
}

export class Circle extends Shape {
    constructor(readonly radius: Radius) { super(); }

    area(): number {
        return Math.PI * this.radius ** 2;
    }

    override toPath2D(): Path2D {
        const [x, y] = [0, 0],
            { radius } = this,
            path = new Path2D(`M ${x} ${y - radius}`);
        path.arc(x, y, radius, 0, 2 * PI);

        return path;
    }
}
export class Ellipse extends Shape {
    constructor(
        readonly radiusX: Radius,
        readonly radiusY: Radius
    ) { super(); }

    area(): number {
        return Math.PI * this.radiusX * this.radiusY;
    }

    override toPath2D(): Path2D {
        const [x, y] = [0, 0],
            { radiusX, radiusY } = this,
            path = new Path2D(`M ${x} ${y - radiusY}`);
        path.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * PI);

        return path;
    }
}
export class Polygon extends Shape {
    [Symbol.iterator]() { return this.vertices[Symbol.iterator](); }

    #vertices: Vertex2[];
    constructor(...vertices: [x: number, y: number][]) {
        super();
        if (vertices.length < 3)
            throw new Error('A polygon must have at least 3 vertices');
        this.#vertices = vertices.map(([x, y]) => new Vertex2(x, y));
    }

    get vertices(): Vertex2[] { return this.#vertices; }

    // Shoelace formula
    // https://en.wikipedia.org/wiki/Shoelace_formula
    area(): number {
        const vs = this.vertices,
            areaSum = vs.reduce(function (sum, v1, i) {
                const v2 = vs[(i + 1) % vs.length];

                return sum + v1.cross(v2);
            }, 0);

        return abs(areaSum) / 2;
    }

    override toPath2D(): Path2D {
        const { vertices: [v0, ...vn] } = this,
            path = new Path2D();

        path.moveTo(v0.x, v0.y);
        vn.forEach(({ x, y }) => path.lineTo(x, y));
        path.closePath();

        return path;
    }
}
export class Rectangle extends Shape {
    constructor(
        readonly width: Side,
        readonly height: Side
    ) { super(); }

    area(): number {
        return this.width * this.height;
    }

    override toPath2D(): Path2D {
        const { width, height } = this,
            path = new Path2D();

        // draw from the center
        path.rect(-div(width, 2), -div(height, 2), width, height);

        return path;
    }
}
export class RightTriangle extends Shape {
    constructor(
        readonly base: Side,
        readonly height: Side
    ) { super(); }

    area(): number {
        return this.base * this.height / 2;
    }

    override toPath2D(): Path2D {
        const { base, height } = this,
            v1 = { x: 0, y: 0 },
            v2 = { x: base, y: 0 },
            v3 = { x: 0, y: height };

        return new Path2D(
            `M ${v1.x} ${v1.y} L ${v2.x} ${v2.y} L ${v3.x} ${v3.y} Z`
        );
    }
}
export class Square extends Shape {
    constructor(readonly side: Side) { super(); }

    area(): number {
        return this.side ** 2;
    }

    override toPath2D(): Path2D {
        const { side } = this,
            halfSide = div(side, 2),
            path = new Path2D();

        // draw from the center
        path.rect(-halfSide, -halfSide, side, side);

        return path;
    }
}
export class Triangle extends Polygon {
    constructor(
        readonly v1: [x: number, y: number],
        readonly v2: [x: number, y: number],
        readonly v3: [x: number, y: number]
    ) { super(v1, v2, v3); }

    override area(): number {
        const [v1, v2, v3] = this,
            a = v1.distanceTo(v2),
            b = v2.distanceTo(v3),
            c = v3.distanceTo(v1),
            s = (a + b + c) / 2;

        return sqrt(s * (s - a) * (s - b) * (s - c));
    }

    override toPath2D(): Path2D {
        const { vertices: [v1, v2, v3] } = this;

        return new Path2D(
            `M ${v1.x} ${v1.y} L ${v2.x} ${v2.y} L ${v3.x} ${v3.y} Z`
        );
    }
}