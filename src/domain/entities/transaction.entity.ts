import { MarketOperationEnum } from "../enums/market-operation.enum";
import { MarketOperation } from "../value-objects/market-operation.vo";
import { Quantity } from "../value-objects/quantity.vo";
import { OperationCost } from "../value-objects/operation-cost.vo";

export class Transaction {
  private readonly marketOperation: MarketOperation;
  private readonly unitCost: OperationCost;
  private readonly quantity: Quantity;
  private readonly totalCost: OperationCost;

  constructor(
    marketOperation: MarketOperation,
    unitCost: OperationCost,
    quantity: Quantity
  ) {
    this.marketOperation = marketOperation;
    this.unitCost = unitCost;
    this.quantity = quantity;
    this.totalCost = new OperationCost(this.unitCost.getValue() * this.quantity.getValue());
  }

  static create(
    marketOperation: string,
    unitCost: number,
    quantity: number
  ): Transaction {
    return new Transaction(
      new MarketOperation(marketOperation),
      new OperationCost(unitCost),
      new Quantity(quantity)
    );
  }

  public getMarketOperation(): MarketOperationEnum {
    return this.marketOperation.getValue();
  }

  public getUnitCost(): number {
    return this.unitCost.getValue();
  }

  public getQuantity(): number {
    return this.quantity.getValue();
  }

  public getTotalCost(): number {
    return this.totalCost.getValue();
  }
}
