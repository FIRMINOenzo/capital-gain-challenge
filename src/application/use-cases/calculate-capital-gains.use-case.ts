import { Transaction } from "../../domain/entities/transaction.entity";
import { Portfolio } from "../../domain/entities/portfolio.entity";
import { MarketOperationEnum } from "../../domain/enums/market-operation.enum";

export type TaxResult = {
  tax: number;
};

export type RawTransaction = {
  operation: string;
  "unit-cost": number;
  quantity: number;
};

export class CalculateCapitalGainsInput {
  readonly transactions: RawTransaction[];

  constructor(transactions: RawTransaction[]) {
    this.transactions = transactions;
  }
}

export class CalculateCapitalGainsUseCase {
  public execute(input: CalculateCapitalGainsInput): TaxResult[] {
    const portfolio = new Portfolio();
    const results: TaxResult[] = [];

    for (const rawTransaction of input.transactions) {
      const transaction = Transaction.create(
        rawTransaction.operation,
        rawTransaction["unit-cost"],
        rawTransaction.quantity
      );
      const operation = transaction.getMarketOperation();

      if (operation === MarketOperationEnum.BUY) {
        const tax = portfolio.buy(transaction);
        results.push(tax);
        continue;
      }

      if (operation === MarketOperationEnum.SELL) {
        const tax = portfolio.sell(transaction);
        results.push(tax);
        continue;
      }
    }

    return results;
  }
}
