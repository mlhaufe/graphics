import { Equatable } from './Equatable.mjs';

export abstract class ValueObject implements Equatable<ValueObject> {
    equals(other: ValueObject): boolean {
        if (this === other)
            return true;

        if (this.constructor !== other.constructor)
            return false;

        const thisAttributes = Object.values(this),
            otherAttributes = Object.values(other);

        // Perform a pairwise comparison of attribute values
        for (let i = 0; i < thisAttributes.length; i++)
            if (thisAttributes[i] !== otherAttributes[i])
                return false;


        return true;
    }
}