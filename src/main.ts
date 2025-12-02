import { Application } from "./application";
import { CalculateCapitalGainsUseCase } from "./application/use-cases/calculate-capital-gains.use-case";
import { Registry } from "./infra/dependency-injection/registry";
import { StdInputReader } from "./infra/IO/input.reader";
import { StdOutputWriter } from "./infra/IO/output.writer";

Registry.getInstance().register("InputReader", new StdInputReader());
Registry.getInstance().register("OutputWriter", new StdOutputWriter());
Registry.getInstance().register(
  "CalculateCapitalGainsUseCase",
  new CalculateCapitalGainsUseCase()
);

const application = new Application();
application.run();
