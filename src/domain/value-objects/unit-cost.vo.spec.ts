import { ValueObjectValidationError } from "../errors/value-object-validation.error";
import { UnitCost } from "./unit-cost.vo";

describe("Unit Cost Value Object", () => {
    it("should create an unit cost", () => {
        const unitCost = new UnitCost(1);
        expect(unitCost.getValue()).toBe(1);
    });

    it("should create an unit cost with float values", () => {
        const unitCost = new UnitCost(1.01);
        expect(unitCost.getValue()).toBe(1.01);
    });

    it("should throw an error if the unit cost is negative", () => {
        expect(() => new UnitCost(-1)).toThrow(ValueObjectValidationError);
    });
});