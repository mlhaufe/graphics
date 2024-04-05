import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { Circle, Ellipse, Polygon, Rectangle, RightTriangle, Square, Triangle } from './Shape.mjs';

describe('Shape', () => {
    it('should calculate the area of a circle', () => {
        // Arrange
        const circle = new Circle(15),
            expected = Math.PI * 15 * 15,
            // Act
            actual = circle.area();

        // Assert
        assert.strictEqual(actual, expected);
    });

    it('should calculate the area of an ellipse', () => {
        // Arrange
        const ellipse = new Ellipse(3, 4),
            expected = Math.PI * 3 * 4,
            // Act
            actual = ellipse.area();

        // Assert
        assert.strictEqual(actual, expected);
    });

    it('should be able to calculate the area of a polygon', () => {
        // Arrange
        const polygon = new Polygon([0, 0], [0, 4], [3, 0]),
            expected = 6,

            // Act
            actual = polygon.area();

        // Assert
        assert.strictEqual(actual, expected);
    });

    it('should be able to calculate the area of a Rectangle', () => {
        // Arrange
        const rectangle = new Rectangle(3, 4),
            expected = 12,
            // Act
            actual = rectangle.area();

        // Assert
        assert.strictEqual(actual, expected);
    });

    it('should be able to calculate the area of a RightTriangle', () => {
        // Arrange
        const triangle = new RightTriangle(3, 4),
            expected = 6,
            // Act
            actual = triangle.area();

        // Assert
        assert.strictEqual(actual, expected);
    });

    it('should be able to calculate the area of a Square', () => {
        // Arrange
        const square = new Square(3),
            expected = 9,
            // Act
            actual = square.area();

        // Assert
        assert.strictEqual(actual, expected);
    });

    it('should be able to calculate the area of a Triangle', () => {
        // Arrange
        const triangle = new Triangle([0, 0], [0, 4], [3, 0]),
            expected = 6,
            // Act
            actual = triangle.area();

        // Assert
        assert.strictEqual(actual, expected);
    });
});