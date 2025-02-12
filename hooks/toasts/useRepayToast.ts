import { Token } from "@/types";
import { useToast } from "@/hooks";

export type RepayToastProps = {
  amount: string;
  token: Token;
};
export const useRepayToast = (props: RepayToastProps) => {
  const { amount, token } = props;

  const { pending, success, error } = useToast({
    action: "Repay",
    descriptions: {
      pending: `Repaying ${amount} ${token.name}, please wait.`,
      success: `Successfully repaid ${amount} ${token.name}!`,
      error: `The ${token.name} repaying failed`,
    },
  });

  return {
    pendingRepayToast: pending,
    successRepayToast: success,
    errorRepayToast: error,
  };
};
