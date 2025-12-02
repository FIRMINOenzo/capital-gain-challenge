import { Transaction } from "../../domain/entities/transaction.entity";
import { Portfolio } from "../../domain/entities/portfolio.entity";
import { MarketOperationEnum } from "../../domain/enums/market-operation.enum";

export type TaxResult = {
  tax: string;
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

      /*
      Usando `tax.toFixed(1)` para seguir o padrão da documentação
      de retornar o valor com uma casa decimal. Em JavaScript, o `toFixed` retorna uma string.

      Talvez seria interessante ocultar esse .0, para retonar o valor em número mesmo.
      Ou até mesmo usar sempre em centavos, para não ter que lidar com casas decimais.
      */

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
