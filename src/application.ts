import {
  CalculateCapitalGainsInput,
  CalculateCapitalGainsUseCase,
  RawTransaction,
} from "./application/use-cases/calculate-capital-gains.use-case";
import { inject } from "./infra/dependency-injection/registry";
import { InputReader } from "./infra/IO/input.reader";
import { OutputWriter } from "./infra/IO/output.writer";

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

      const results = this.useCase.execute(
        new CalculateCapitalGainsInput(rawOperations)
      );

      this.outputWriter.write(results);
    }
  }
}
