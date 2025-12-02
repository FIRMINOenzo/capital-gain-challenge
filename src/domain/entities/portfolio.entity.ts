import { twoDecimalsRound } from "../../shared/numbers";
import { MarketOperationEnum } from "../enums/market-operation.enum";
import { Transaction } from "./transaction.entity";

export class Portfolio {
  private weightedAveragePrice: number = 0;
  private totalQuantity: number = 0;
  private accumulatedLoss: number = 0;

  private readonly TAX_RATE = 0.2;
  private readonly TOTAL_OPERATION_COST_THRESHOLD = 20000;

  public buy(transaction: Transaction): { tax: number } {
    if (transaction.getMarketOperation() !== MarketOperationEnum.BUY) {
      throw new Error("Invalid operation: expected BUY");
    }

    const quantity = transaction.getQuantity();
    const totalCost = transaction.getTotalCost();

    const newTotalQuantity = this.totalQuantity + quantity;
    const newWeightedAveragePrice =
      (this.totalQuantity * this.weightedAveragePrice + totalCost) /
      newTotalQuantity;

    this.weightedAveragePrice = twoDecimalsRound(newWeightedAveragePrice);
    this.totalQuantity = newTotalQuantity;

    return { tax: 0 };
  }

  public sell(transaction: Transaction): { tax: number } {
    if (transaction.getMarketOperation() !== MarketOperationEnum.SELL) {
      throw new Error("Invalid operation: expected SELL");
    }

    const quantity = transaction.getQuantity();
    const unitCost = transaction.getUnitCost();
    const totalOperationCost = transaction.getTotalCost();

    if (quantity > this.totalQuantity) {
      throw new Error("Cannot sell more than owned");
    }

    const profitPerShare = unitCost - this.weightedAveragePrice;
    const totalProfit = profitPerShare * quantity;

    this.totalQuantity -= quantity;

    if (this.totalQuantity === 0) {
      this.weightedAveragePrice = 0;
    }

    if (totalProfit < 0) {
      this.accumulatedLoss += Math.abs(totalProfit);
      return { tax: 0 };
    }

    if (totalOperationCost <= this.TOTAL_OPERATION_COST_THRESHOLD) {
      return { tax: 0 };
    }

    let taxableProfit = totalProfit - this.accumulatedLoss;

    if (taxableProfit < 0) {
      this.accumulatedLoss = Math.abs(taxableProfit);
      taxableProfit = 0;
    } else {
      this.accumulatedLoss = 0;
    }

    const tax = taxableProfit * this.TAX_RATE;
    return { tax: twoDecimalsRound(tax) };
  }

  public getWeightedAveragePrice(): number {
    return this.weightedAveragePrice;
  }

  public getTotalQuantity(): number {
    return this.totalQuantity;
  }

  public getAccumulatedLoss(): number {
    return this.accumulatedLoss;
  }
}
