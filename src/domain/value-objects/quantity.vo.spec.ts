import { Quantity } from "./quantity.vo";
import { ValueObjectValidationError } from "../errors/value-object-validation.error";

describe("Quantity Value Object", () => {
    it("should create a quantity", () => {
        const quantity = new Quantity(1);
        expect(quantity.getValue()).toBe(1);
    });

    it("should throw an error if the quantity is less than 1", () => {
        expect(() => new Quantity(0)).toThrow(ValueObjectValidationError);
    });

    it("should throw an error if the quantity is a float", () => {
        expect(() => new Quantity(1.1)).toThrow(ValueObjectValidationError);
    });

    it("should throw an error if the quantity is a big float", () => {
        expect(() => new Quantity(1.0000000001)).toThrow(ValueObjectValidationError);
    });
});