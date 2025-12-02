import { CalculateCapitalGainsUseCase } from "./application/use-cases/calculate-capital-gains.use-case";
import { Transaction } from "./domain/entities/transaction.entity";
import { inject } from "./infra/dependency-injection/registry";
import { InputReader } from "./infra/IO/input.reader";
import { OutputWriter } from "./infra/IO/output.writer";

type RawTransaction = {
  operation: string;
  "unit-cost": number;
  quantity: number;
};

export class Application {
  @inject("InputReader")
  inputReader!: InputReader;
  @inject("OutputWriter")
  outputWriter!: OutputWriter;
  @inject("CalculateCapitalGainsUseCase")
  useCase!: CalculateCapitalGainsUseCase;

  async run(): Promise<void> {
    const inputs = await this.inputReader.read<RawTransaction[]>();

    for (const rawOperations of inputs) {
      if (!Array.isArray(rawOperations)) {
        console.error("Invalid input: expected a JSON array");
        continue;
      }

      const transactions = rawOperations.map((op: RawTransaction) => {
        return Transaction.create(op.operation, op["unit-cost"], op.quantity);
      });

      const results = this.useCase.execute(transactions);

      this.outputWriter.write(results);
    }
  }
}
