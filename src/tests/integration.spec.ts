import {
  CalculateCapitalGainsInput,
  CalculateCapitalGainsUseCase,
} from "../application/use-cases/calculate-capital-gains.use-case";
import { Transaction } from "../domain/entities/transaction.entity";

describe("Integration Tests", () => {
  let useCase: CalculateCapitalGainsUseCase;

  beforeEach(() => {
    useCase = new CalculateCapitalGainsUseCase();
  });

  it("Case #1", () => {
    const input = [
      { operation: "buy", "unit-cost": 10.0, quantity: 100 },
      { operation: "sell", "unit-cost": 15.0, quantity: 50 },
      { operation: "sell", "unit-cost": 15.0, quantity: 50 },
    ];
    const expected = [{ tax: "0.0" }, { tax: "0.0" }, { tax: "0.0" }];
    const result = useCase.execute(new CalculateCapitalGainsInput(input));
    expect(result).toEqual(expected);
  });

  it("Case #2", () => {
    const input = [
      { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
      { operation: "sell", "unit-cost": 20.0, quantity: 5000 },
      { operation: "sell", "unit-cost": 5.0, quantity: 5000 },
    ];
    const expected = [{ tax: "0.0" }, { tax: "10000.0" }, { tax: "0.0" }];
    const result = useCase.execute(new CalculateCapitalGainsInput(input));
    expect(result).toEqual(expected);
  });

  it("Case #3", () => {
    const input = [
      { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
      { operation: "sell", "unit-cost": 5.0, quantity: 5000 },
      { operation: "sell", "unit-cost": 20.0, quantity: 3000 },
    ];
    const expected = [{ tax: "0.0" }, { tax: "0.0" }, { tax: "1000.0" }];
    const result = useCase.execute(new CalculateCapitalGainsInput(input));
    expect(result).toEqual(expected);
  });

  it("Case #4", () => {
    const input = [
      { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
      { operation: "buy", "unit-cost": 25.0, quantity: 5000 },
      { operation: "sell", "unit-cost": 15.0, quantity: 10000 },
    ];
    const expected = [{ tax: "0.0" }, { tax: "0.0" }, { tax: "0.0" }];
    const result = useCase.execute(new CalculateCapitalGainsInput(input));
    expect(result).toEqual(expected);
  });

  it("Case #5", () => {
    const input = [
      { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
      { operation: "buy", "unit-cost": 25.0, quantity: 5000 },
      { operation: "sell", "unit-cost": 15.0, quantity: 10000 },
      { operation: "sell", "unit-cost": 25.0, quantity: 5000 },
    ];
    const expected = [
      { tax: "0.0" },
      { tax: "0.0" },
      { tax: "0.0" },
      { tax: "10000.0" },
    ];
    const result = useCase.execute(new CalculateCapitalGainsInput(input));
    expect(result).toEqual(expected);
  });

  it("Case #6", () => {
    const input = [
      { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
      { operation: "sell", "unit-cost": 2.0, quantity: 5000 },
      { operation: "sell", "unit-cost": 20.0, quantity: 2000 },
      { operation: "sell", "unit-cost": 20.0, quantity: 2000 },
      { operation: "sell", "unit-cost": 25.0, quantity: 1000 },
    ];
    const expected = [
      { tax: "0.0" },
      { tax: "0.0" },
      { tax: "0.0" },
      { tax: "0.0" },
      { tax: "3000.0" },
    ];
    const result = useCase.execute(new CalculateCapitalGainsInput(input));
    expect(result).toEqual(expected);
  });

  it("Case #7", () => {
    const input = [
      { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
      { operation: "sell", "unit-cost": 2.0, quantity: 5000 },
      { operation: "sell", "unit-cost": 20.0, quantity: 2000 },
      { operation: "sell", "unit-cost": 20.0, quantity: 2000 },
      { operation: "sell", "unit-cost": 25.0, quantity: 1000 },
      { operation: "buy", "unit-cost": 20.0, quantity: 10000 },
      { operation: "sell", "unit-cost": 15.0, quantity: 5000 },
      { operation: "sell", "unit-cost": 30.0, quantity: 4350 },
      { operation: "sell", "unit-cost": 30.0, quantity: 650 },
    ];
    const expected = [
      { tax: "0.0" },
      { tax: "0.0" },
      { tax: "0.0" },
      { tax: "0.0" },
      { tax: "3000.0" },
      { tax: "0.0" },
      { tax: "0.0" },
      { tax: "3700.0" },
      { tax: "0.0" },
    ];
    const result = useCase.execute(new CalculateCapitalGainsInput(input));
    expect(result).toEqual(expected);
  });

  it("Case #8", () => {
    const input = [
      { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
      { operation: "sell", "unit-cost": 50.0, quantity: 10000 },
      { operation: "buy", "unit-cost": 20.0, quantity: 10000 },
      { operation: "sell", "unit-cost": 50.0, quantity: 10000 },
    ];
    const expected = [
      { tax: "0.0" },
      { tax: "80000.0" },
      { tax: "0.0" },
      { tax: "60000.0" },
    ];
    const result = useCase.execute(new CalculateCapitalGainsInput(input));
    expect(result).toEqual(expected);
  });

  it("Case #9", () => {
    const input = [
      { operation: "buy", "unit-cost": 5000.0, quantity: 10 },
      { operation: "sell", "unit-cost": 4000.0, quantity: 5 },
      { operation: "buy", "unit-cost": 15000.0, quantity: 5 },
      { operation: "buy", "unit-cost": 4000.0, quantity: 2 },
      { operation: "buy", "unit-cost": 23000.0, quantity: 2 },
      { operation: "sell", "unit-cost": 20000.0, quantity: 1 },
      { operation: "sell", "unit-cost": 12000.0, quantity: 10 },
      { operation: "sell", "unit-cost": 15000.0, quantity: 3 },
    ];
    const expected = [
      { tax: "0.0" },
      { tax: "0.0" },
      { tax: "0.0" },
      { tax: "0.0" },
      { tax: "0.0" },
      { tax: "0.0" },
      { tax: "1000.0" },
      { tax: "2400.0" },
    ];
    const result = useCase.execute(new CalculateCapitalGainsInput(input));
    expect(result).toEqual(expected);
  });
});
