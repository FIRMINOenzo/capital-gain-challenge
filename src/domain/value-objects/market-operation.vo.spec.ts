import { MarketOperation } from "./market-operation.vo";
import { MarketOperationEnum } from "../enums/market-operation.enum";
import { ValueObjectValidationError } from "../errors/value-object-validation.error";

describe("Market Operation Value Object", () => {
    it("should create a market operation", () => {
        const marketOperation = new MarketOperation("buy");
        expect(marketOperation.getValue()).toBe(MarketOperationEnum.BUY);
    });

    it("should ignore case and create a market operation", () => {
        const marketOperation = new MarketOperation("BUY");
        expect(marketOperation.getValue()).toBe(MarketOperationEnum.BUY);
    });

    it("should throw an error if the market operation is invalid", () => {
        expect(() => new MarketOperation("invalid")).toThrow(ValueObjectValidationError);
    });

    it("should throw an error if the market operation is null an empty string", () => {
        expect(() => new MarketOperation("")).toThrow(ValueObjectValidationError);
    });
});