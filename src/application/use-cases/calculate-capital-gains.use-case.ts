import { Transaction } from "../../domain/entities/transaction.entity";
import { Portfolio } from "../../domain/entities/portfolio.entity";
import { MarketOperationEnum } from "../../domain/enums/market-operation.enum";

export type TaxResult = {
  tax: string;
};

export class CalculateCapitalGainsUseCase {
  public execute(transactions: Transaction[]): TaxResult[] {
    const portfolio = new Portfolio();
    const results: TaxResult[] = [];

    for (const transaction of transactions) {
      const operation = transaction.getMarketOperation();

      if (operation === MarketOperationEnum.BUY) {
        const { tax } = portfolio.buy(transaction);
        results.push({ tax: tax.toFixed(1) });
        continue;
      }

      if (operation === MarketOperationEnum.SELL) {
        const { tax } = portfolio.sell(transaction);
        results.push({ tax: tax.toFixed(1) });
        continue;
      }
    }

    return results;
  }
}
