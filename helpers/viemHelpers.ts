import { formatUnits, parseUnits, isAddress } from "viem";
import { trimmedNumber } from ".";

export type VIEMSUCCESS<T> = {
  error?: undefined;
  result: T;
  status: "success";
};
export const MAXUINT256 = BigInt(
  "115792089237316195423570985008687907853269984665640564039457584007913129639935"
);

export type VIEMFAILURE = {
  error: Error;
  result?: undefined;
  status: "failure";
};
export type VIEMBNSUCCESS = VIEMSUCCESS<bigint>;
export type VIEMBOOLSUCCESS = VIEMSUCCESS<boolean>;
export type VIEMRESULT<T> = VIEMFAILURE | VIEMSUCCESS<T>;
export type VIEMBNRESULT = VIEMFAILURE | VIEMSUCCESS<bigint>;
export type VIEMBOOLRESULT = VIEMFAILURE | VIEMSUCCESS<boolean>;
export const bnToStr = (
  bn: bigint | undefined | VIEMBNRESULT,
  decimals: number = 18
) => {
  if (bn === undefined) return "0";
  if (typeof bn === "object") {
    if ((bn as VIEMBNRESULT).status === "failure") return "0";
    else return formatUnits((bn as VIEMBNSUCCESS).result, decimals);
  }
  return formatUnits(bn, decimals);
};
export const strToBn = (str: string, decimals: number = 18) => {
  const formattedStr = Number(str).toFixed(decimals);
  return parseUnits(formattedStr, decimals);
};
export const numToBn = (num: number, decimals: number = 18) => {
  return parseUnits(num.toString(), decimals);
};

export const bnToNumber = (
  bn: bigint | undefined | VIEMBNRESULT,
  decimals: number = 0
) => {
  if (bn === undefined) return 0;
  if (typeof bn === "object") {
    if ((bn as VIEMBNRESULT).status === "failure") return 0;
    else return Number(formatUnits((bn as VIEMBNSUCCESS).result, decimals));
  }
  return Number(formatUnits(bn, decimals));
};

export const bnToBn = (bn: BigInt | undefined | VIEMBNRESULT) => {
  if (bn === undefined) return BigInt(0);
  if (typeof bn === "object") {
    if ((bn as VIEMBNRESULT).status === "failure") return BigInt(0);
    else return (bn as VIEMBNSUCCESS).result;
  }
  return bn;
};

export const bnToBool = (bn: BigInt | undefined | VIEMBOOLRESULT) => {
  if (bn === undefined) return false;
  if (typeof bn === "object") {
    if ((bn as VIEMBOOLRESULT).status === "failure") return false;
    else return (bn as VIEMBOOLSUCCESS).result;
  }
  return bn;
};

export const maxBn = (...bns: (bigint | undefined)[]) => {
  return (
    bns.reduce((max, bn) => {
      if (bn === undefined) return max;
      return (max || BigInt(0)) > bn ? max : bn;
    }, BigInt(0)) || BigInt(0)
  );
};

export const minBn = (...bns: (bigint | undefined)[]) => {
  return (
    bns.reduce((min, bn) => {
      if (bn === undefined) return min;
      return (min || BigInt(0)) < bn ? min : bn;
    }, MAXUINT256) || BigInt(0)
  );
};

export const trimmedBn = (
  bn: bigint | undefined,
  decimals: number,
  precision: number = 0
) => {
  return trimmedNumber(bnToNumber(bn, decimals), precision);
};

export const isAddressValid = (address: string | undefined) => {
  return !!address && isAddress(address) && /^0x[a-fA-F0-9]{40}$/.test(address);
};

export function extractError(error: string = "") {
  const match = error.match(/the following reason:([\s\S]*?)Contract Call:/);
  const reason = match && match[1] ? match[1].trim() : "";
  const reasonWithDot = reason
    ? reason.endsWith(".")
      ? reason
      : reason + "."
    : "";
  return reasonWithDot;
}
