import fs from "fs";
import path from "path";

function calcCheckDigit(payloadStr) {
  const digits = payloadStr.split("").map(Number);
  let sum = 0;
  const rev = digits.slice().reverse();
  for (let i = 0; i < rev.length; i++) {
    sum += rev[i] * (i % 2 === 0 ? 3 : 1);
  }
  return (10 - (sum % 10)) % 10;
}

const filePath = path.resolve(process.cwd(), "src/data/indianMedicines.ts");
let content = fs.readFileSync(filePath, "utf8");

// Match each barcode line: barcode: "890..."
content = content.replace(/barcode:\s*"(\d{12})(\d)"/g, (match, prefix, oldCheck) => {
  const validCheck = calcCheckDigit(prefix);
  return `barcode: "${prefix}${validCheck}"`;
});

// Match each gtin line: gtin: "0890..."
content = content.replace(/gtin:\s*"0(\d{12})(\d)"/g, (match, prefix, oldCheck) => {
  const validCheck = calcCheckDigit(prefix);
  return `gtin: "0${prefix}${validCheck}"`;
});

fs.writeFileSync(filePath, content, "utf8");
console.log("Successfully normalized all barcode and GTIN check digits in indianMedicines.ts to valid GS1 standard!");
