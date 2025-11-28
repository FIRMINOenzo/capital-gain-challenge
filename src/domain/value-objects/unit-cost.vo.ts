import { ValueObjectValidationError } from "../errors/value-object-validation.error";
import { ValueObject } from "./value-object.interface";

export class UnitCost implements ValueObject<number> {
  private readonly value: number;

  constructor(value: number) {
    this.validate(value);
    this.value = value;
  }

  private validate(value: number) {
    if (value < 0) {
      throw new ValueObjectValidationError("Unit cost cannot be negative");
    }
  }

  getValue(): number {
    return this.value;
  }
}
