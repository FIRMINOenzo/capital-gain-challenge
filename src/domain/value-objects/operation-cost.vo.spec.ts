import { ValueObjectValidationError } from "../errors/value-object-validation.error";
import { OperationCost } from "./operation-cost.vo";

describe("Operation Cost Value Object", () => {
    it("should create an operation cost", () => {
        const operationCost = new OperationCost(1);
        expect(operationCost.getValue()).toBe(1);
    });

    it("should create an operation cost with float values", () => {
        const operationCost = new OperationCost(1.01);
        expect(operationCost.getValue()).toBe(1.01);
    });

    it("should throw an error if the operation cost is negative", () => {
        expect(() => new OperationCost(-1)).toThrow(ValueObjectValidationError);
    });
});