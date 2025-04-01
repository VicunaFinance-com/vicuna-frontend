export const MoneyFormat = (value: number | bigint, digits?: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);
};

export const oldThousandsFormat = (value: number | bigint, digits?: number) => {
  return new Intl.NumberFormat(
    "en-US",
    digits !== undefined
      ? {
        maximumFractionDigits: digits,
        minimumFractionDigits: digits,
      }
      : {}
  ).format(value);
};

export const ThousandsFormat = (
  value: number,
  digits: number = 2,
  suffix: "K" | "Thousand" = "K"
): string => {
  return `${(Math.abs(Number(value)) / 1.0e3).toFixed(digits)} ${suffix}`;
};

export const MillionsFormat = (
  value: number,
  digits: number = 2,
  suffix: "M" | "Million" = "Million"
): string => {
  return `${(Math.abs(Number(value)) / 1.0e6).toFixed(digits)} ${suffix}`;
};

export const BillionsFormat = (
  value: number,
  digits: number = 2,
  suffix: "B" | "Billion" = "Billion"
): string => {
  return `${(Math.abs(Number(value)) / 1.0e9).toFixed(digits)} ${suffix}`;
};

export const TrillionsFormat = (
  value: number,
  digits: number = 2,
  suffix: "T" | "Trillion" = "Trillion"
): string => {
  return `${(Math.abs(Number(value)) / 1.0e12).toFixed(digits)} ${suffix}`;
};

export const QuadrillionsFormat = (
  value: number,
  digits: number = 2,
  suffix: "Q" | "Quadrillion" = "Quadrillion"
): string => {
  return `${(Math.abs(Number(value)) / 1.0e15).toFixed(digits)} ${suffix}`;
};

export function trimmedNumber(number = 0, precision = 0, useE = true) {
  if (Math.abs(number) < 1e-6) {
    return "0.00";
  }
  //account for number being in e notation
  if (number.toString().includes("e")) {
    const [num, exponent] = number.toString().split("e");
    const exponentValue = Number(exponent);
    if (!useE) {
      if (exponentValue >= 3 && exponentValue < 6) {
        return ThousandsFormat(Number(number), precision);
      }
      if (exponentValue >= 6 && exponentValue < 9) {
        return MillionsFormat(Number(number), precision);
      }
      if (exponentValue >= 9 && exponentValue < 12) {
        return BillionsFormat(Number(number), precision, "Billion");
      }
      if (exponentValue >= 12 && exponentValue < 15) {
        return TrillionsFormat(Number(number), precision, "Trillion");
      }
      if (exponentValue >= 15) {
        return QuadrillionsFormat(Number(number), precision, "Quadrillion");
      }
    }

    return Number(num).toFixed(2) + "e" + exponentValue;
  }

  const array = Number(number).toFixed(8).split(".");
  if (array.length === 1) return number.toString();
  if (precision === 0) return array[0].toString();

  const poppedNumber = array.pop() || "0";
  array.push(poppedNumber.substring(0, precision));
  return array.join(".").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const parseTiny = (num: number) => {
  if (num === 0) {
    return "0.00";
  }

  const expString = num.toExponential(3);
  let [coeff, exponent] = expString.split("e");
  let nexponent = parseInt(exponent, 10);
  coeff = coeff.replace(".", "");
  const neededZeros = Math.abs(nexponent) - 1;
  return ["0.0", neededZeros, coeff];
};

export const formatSuffix = (
  num: number,
  mode: "abbreviated" | "money" | "linkedToMoney" = "abbreviated",
  moneyValue: number = 0
) => {
  if (mode === "linkedToMoney" && moneyValue < 0.000001) return "0";
  switch (true) {
    case num >= 1e12:
      return `${(num / 1000000000000).toFixed(2)}T`;
    case num >= 1e9:
      return `${(num / 1000000000).toFixed(2)}B`;
    case num >= 1e6:
      return `${(num / 1000000).toFixed(2)}M`;
    case num >= 1e3:
      return `${(num / 1000).toFixed(2)}K`;
    case num >= 1:
      return `${num.toFixed(2)}`;
    case num > 0.000001:
      return num.toPrecision(4);
    case num > 0:
      switch (mode) {
        case "abbreviated":
        case "linkedToMoney":
          let display = parseTiny(num);
          return (
            <>
              {display[0]}
              <sub className="mx-[1.5px] text-xs">{display[1]}</sub>
              {display[2]}
            </>
          );
        case "money":
          return "0";
      }
    case num === 0:
      return "0";
    case num < 0:
      return `${num.toFixed(2)}`;
    default:
      return null;
  }
};

export function trimmedString(number = "0", precision = 0) {
  return trimmedNumber(Number(number), precision);
}
