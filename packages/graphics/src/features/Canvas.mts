import { Presenter } from '~/application/Presenter.mjs';
import { div } from '~/domain/Math.mjs';
import { Shape } from './shapes/Shape.mjs';

interface ShapePosition {
    shape: Shape;
    position: [x: number, y: number];
    fillStyle?: string;
    strokeStyle?: string;
}

export class Canvas extends Presenter<ShapePosition> {
    #canvas = document.createElement('canvas');
    #ctx = this.#canvas.getContext('2d', { alpha: false });

    constructor({ container, height, width }) {
        super();
        Object.assign(this.#canvas, { height, width });

        // move the origin to the center of the canvas
        this.#ctx.translate(div(width, 2), div(height, 2));

        container.appendChild(this.#canvas);
    }

    present({ shape, position: [x, y], fillStyle, strokeStyle }: ShapePosition) {
        this.#ctx.save();

        this.#ctx.translate(x, y);

        if (fillStyle) {
            this.#ctx.fillStyle = fillStyle;
            this.#ctx.fill(shape.toPath2D());
        }

        if (strokeStyle) {
            this.#ctx.strokeStyle = strokeStyle;
            this.#ctx.stroke(shape.toPath2D());
        }

        this.#ctx.restore();
    }
}