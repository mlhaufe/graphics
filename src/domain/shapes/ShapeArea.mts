import { Ellipse, Polygon, Rectangle, RtTriangle, Shape } from './Shape.mjs';

export abstract class ShapeArea extends Shape {
    abstract area(): number;
}

export class RectangleArea extends Rectangle implements ShapeArea {
    area(): number {
        return this.width * this.height;
    }
}

export class EllipseArea extends Ellipse implements ShapeArea {
    area(): number {
        return Math.PI * this.radiusX * this.radiusY;
    }
}

export class RtTriangleArea extends RtTriangle implements ShapeArea {
    area(): number {
        return this.base * this.height / 2;
    }
}

export class PolygonArea extends Polygon implements ShapeArea {

    area(): number {

    }
}