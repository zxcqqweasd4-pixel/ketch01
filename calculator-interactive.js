

const readline = require("node:readline");

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

function remainder(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a % b;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  const operations = {
    "1": { label: "Multiply", symbol: "x", calculate: multiply },
    "2": { label: "Divide", symbol: "/", calculate: divide },
    "3": { label: "Remainder", symbol: "%", calculate: remainder },
  };

  while (true) {
    console.log("\n1. Multiply");
    console.log("2. Divide");
    console.log("3. Remainder");
    console.log("4. Exit");

    const choice = (await ask("Choose an option: ")).trim();
    if (choice === "4") {
      break;
    }

    const operation = operations[choice];
    if (!operation) {
      console.log("Invalid choice. Please choose 1, 2, 3, or 4.");
      continue;
    }

    const firstInput = (await ask("Enter the first number: ")).trim();
    const secondInput = (await ask("Enter the second number: ")).trim();
    const a = Number(firstInput);
    const b = Number(secondInput);

    if (
      firstInput === "" ||
      secondInput === "" ||
      !Number.isFinite(a) ||
      !Number.isFinite(b)
    ) {
      console.log("Invalid number. Please enter valid numbers.");
      continue;
    }

    try {
      const result = operation.calculate(a, b);
      console.log(`${a} ${operation.symbol} ${b} = ${result}`);
    } catch (error) {
      console.log(error.message);
    }
  }

  rl.close();
}

main();
