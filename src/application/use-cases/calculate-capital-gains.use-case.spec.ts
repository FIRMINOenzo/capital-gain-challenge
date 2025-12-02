import { CalculateCapitalGainsUseCase } from "./calculate-capital-gains.use-case";
import { Transaction } from "../../domain/entities/transaction.entity";

describe("CalculateCapitalGainsUseCase", () => {
  let useCase: CalculateCapitalGainsUseCase;

  beforeEach(() => {
    useCase = new CalculateCapitalGainsUseCase();
  });

  it("should return zero tax for buy operations", () => {
    const transactions = [
      Transaction.create("buy", 10, 100),
      Transaction.create("buy", 20, 50),
    ];

    const result = useCase.execute(transactions);

    expect(result).toHaveLength(2);
    expect(result[0]!.tax).toBe("0.0");
    expect(result[1]!.tax).toBe("0.0");
  });

  it("should calculate tax correctly for a sequence of operations", () => {
    const transactions = [
      Transaction.create("buy", 10, 10000),
      Transaction.create("sell", 20, 5000),
      Transaction.create("sell", 5, 5000),
    ];

    const result = useCase.execute(transactions);

    expect(result).toHaveLength(3);
    expect(result[0]!.tax).toBe("0.0");
    expect(result[1]!.tax).toBe("10000.0");
    expect(result[2]!.tax).toBe("0.0");
  });
});
