import {
  CalculateCapitalGainsInput,
  CalculateCapitalGainsUseCase,
} from "./calculate-capital-gains.use-case";

describe("CalculateCapitalGainsUseCase", () => {
  let useCase: CalculateCapitalGainsUseCase;

  beforeEach(() => {
    useCase = new CalculateCapitalGainsUseCase();
  });

  it("should return zero tax for buy operations", () => {
    const transactions = [
      { operation: "buy", "unit-cost": 10, quantity: 100 },
      { operation: "buy", "unit-cost": 20, quantity: 50 },
    ];

    const result = useCase.execute(
      new CalculateCapitalGainsInput(transactions)
    );

    expect(result).toHaveLength(2);
    expect(result[0]!.tax).toBe("0.0");
    expect(result[1]!.tax).toBe("0.0");
  });

  it("should calculate tax correctly for a sequence of operations", () => {
    const transactions = [
      { operation: "buy", "unit-cost": 10, quantity: 10000 },
      { operation: "sell", "unit-cost": 20, quantity: 5000 },
      { operation: "sell", "unit-cost": 5, quantity: 5000 },
    ];

    const result = useCase.execute(
      new CalculateCapitalGainsInput(transactions)
    );

    expect(result).toHaveLength(3);
    expect(result[0]!.tax).toBe("0.0");
    expect(result[1]!.tax).toBe("10000.0");
    expect(result[2]!.tax).toBe("0.0");
  });
});
