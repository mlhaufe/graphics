import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { Vector2 } from './Vector.mjs';

describe('Vector', () => {
    it('should be able to calculate the distance between two 2D vectors', () => {
        // Arrange
        const v1 = new Vector2(1, 2),
            v2 = new Vector2(3, 4),
            expected = Math.sqrt(8),

            // Act
            actual = v1.distanceTo(v2);

        // Assert
        assert.strictEqual(actual, expected);
    });

    it('should be able to calculate the cross product of two 2D vectors', () => {
        // Arrange
        const v1 = new Vector2(1, 2),
            v2 = new Vector2(3, 4),
            expected = -2,

            // Act
            actual = v1.cross(v2);

        // Assert
        assert.strictEqual(actual, expected);
    });
});