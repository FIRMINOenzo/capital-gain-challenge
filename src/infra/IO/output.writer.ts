export interface OutputWriter {
  write(data: any[]): void;
}

export class StdOutputWriter implements OutputWriter {
  write(data: any[]): void {
    console.log(JSON.stringify(data));
  }
}
