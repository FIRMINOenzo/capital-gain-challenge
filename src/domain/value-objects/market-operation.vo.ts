import { MarketOperationEnum } from "../enums/market-operation.enum";
import { ValueObjectValidationError } from "../errors/value-object-validation.error";
import { ValueObject } from "./value-object.interface";

export class MarketOperation implements ValueObject<MarketOperationEnum> {
  private readonly value: MarketOperationEnum;

  constructor(value: string) {
    const lowerCaseValue = value.toLowerCase();
    this.validate(lowerCaseValue);
    this.value = lowerCaseValue as MarketOperationEnum;
  }

  private validate(value: string) {
    const marketOperationValues = Array.from(
      Object.values(MarketOperationEnum)
    ) as string[];

    if (!marketOperationValues.includes(value)) {
      throw new ValueObjectValidationError("Invalid market operation");
    }
  }

  getValue(): MarketOperationEnum {
    return this.value;
  }
}
