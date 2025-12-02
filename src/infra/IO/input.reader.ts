import * as readline from "readline";

export interface InputReader {
  read<T>(): Promise<T[]>;
}

export class StdInputReader implements InputReader {
  read<T>(): Promise<T[]> {
    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
      });

      const allData: T[] = [];

      rl.on("line", (line) => {
        if (line.trim() === "") {
          rl.close();
          return;
        }

        try {
          const data = JSON.parse(line) as T;
          allData.push(data);
        } catch (err) {
          throw new Error("Failed to parse line");
        }
      });

      rl.on("close", () => {
        resolve(allData);
      });
    });
  }
}
