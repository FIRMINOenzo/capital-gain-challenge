import { ValueObjectValidationError } from "../errors/value-object-validation.error";
import { ValueObject } from "./value-object.interface";

export class Quantity implements ValueObject<number> {
  private readonly value: number;

  constructor(value: number) {
    this.validate(value);
    this.value = value;
  }

  private validate(value: number) {
    if (value < 1) {
      throw new ValueObjectValidationError("Quantity cannot be less than 1");
    }

    if (value % 1 !== 0) {
      throw new ValueObjectValidationError("Quantity cannot be a float");
    }
  }

  getValue(): number {
    return this.value;
  }
}
