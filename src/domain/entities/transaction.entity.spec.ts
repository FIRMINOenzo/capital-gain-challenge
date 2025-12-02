import { MarketOperation } from "../value-objects/market-operation.vo";
import { OperationCost } from "../value-objects/operation-cost.vo";
import { Quantity } from "../value-objects/quantity.vo";
import { Transaction } from "./transaction.entity";
import { MarketOperationEnum } from "../enums/market-operation.enum";
import { ValueObjectValidationError } from "../errors/value-object-validation.error";

describe("Transaction Entity", () => {
    it("should create a transaction", () => {
        const transaction = Transaction.create("buy", 1, 1);
        expect(transaction.getMarketOperation()).toBe(MarketOperationEnum.BUY);
        expect(transaction.getUnitCost()).toBe(1);
        expect(transaction.getQuantity()).toBe(1);
        expect(transaction.getTotalCost()).toBe(1);
    });

    it("should throw an error if any data is invalid", () => {
        expect(() => Transaction.create("invalid", 1, 1)).toThrow(ValueObjectValidationError);
    });

    it("should calculate the total cost", () => {
        const transaction = Transaction.create("buy", 5.20, 7);
        expect(transaction.getTotalCost()).toBe(36.40);
    });
});