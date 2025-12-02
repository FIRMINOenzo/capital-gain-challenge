import { Portfolio } from "./portfolio.entity";
import { Transaction } from "./transaction.entity";

describe("Portfolio Entity", () => {
  let portfolio: Portfolio;

  beforeEach(() => {
    portfolio = new Portfolio();
  });

  it("should initialize with zero values", () => {
    expect(portfolio.getWeightedAveragePrice()).toBe(0);
    expect(portfolio.getTotalQuantity()).toBe(0);
    expect(portfolio.getAccumulatedLoss()).toBe(0);
  });

  describe("Buy Operations", () => {
    it("should update weighted average price correctly on first buy", () => {
      const transaction = Transaction.create("buy", 10, 100);
      const { tax } = portfolio.buy(transaction);

      expect(tax).toBe(0);
      expect(portfolio.getTotalQuantity()).toBe(100);
      expect(portfolio.getWeightedAveragePrice()).toBe(10);
    });

    it("should update weighted average price correctly on subsequent buys", () => {
      portfolio.buy(Transaction.create("buy", 20, 10));
      portfolio.buy(Transaction.create("buy", 10, 5));

      expect(portfolio.getTotalQuantity()).toBe(15);
      expect(portfolio.getWeightedAveragePrice()).toBe(16.67);
    });
  });

  describe("Sell Operations", () => {
    it("should not pay tax if total operation value is <= 20000", () => {
      portfolio.buy(Transaction.create("buy", 10, 100));

      const { tax } = portfolio.sell(Transaction.create("sell", 15, 50));

      expect(tax).toBe(0);
      expect(portfolio.getTotalQuantity()).toBe(50);
    });

    it("should pay 20% tax on profit if operation > 20000", () => {
      portfolio.buy(Transaction.create("buy", 10, 10000));

      const { tax } = portfolio.sell(Transaction.create("sell", 20, 5000));

      expect(tax).toBe(10000);
    });

    it("should accumulate loss if sell price < weighted average", () => {
      portfolio.buy(Transaction.create("buy", 20, 10));

      const { tax } = portfolio.sell(Transaction.create("sell", 10, 5));

      expect(tax).toBe(0);
      expect(portfolio.getAccumulatedLoss()).toBe(50);
    });

    it("should deduct accumulated loss from future profits", () => {
      portfolio.buy(Transaction.create("buy", 20, 10));
      portfolio.sell(Transaction.create("sell", 10, 5));

      expect(portfolio.getAccumulatedLoss()).toBe(50);
    });

    it("should handle Case #3 from docs correctly", () => {
      portfolio.buy(Transaction.create("buy", 10, 10000));

      const { tax } = portfolio.sell(Transaction.create("sell", 5, 5000));
      expect(tax).toBe(0);
      expect(portfolio.getAccumulatedLoss()).toBe(25000);

      const { tax: tax2 } = portfolio.sell(
        Transaction.create("sell", 20, 3000)
      );
      expect(tax2).toBe(1000);
      expect(portfolio.getAccumulatedLoss()).toBe(0);
    });
  });
});
