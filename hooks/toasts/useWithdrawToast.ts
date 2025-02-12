import { Token } from "@/types";
import { useToast } from "@/hooks";

export type WithdrawToastProps = {
  amount: string;
  token: Token;
};
export const useWithdrawToast = (props: WithdrawToastProps) => {
  const { amount, token } = props;

  const { pending, success, error } = useToast({
    action: "Withdraw",
    descriptions: {
      pending: `Withdrawing ${amount} ${token.name}, please wait.`,
      success: `Successfully withdrawn ${amount} ${token.name}!`,
      error: `The ${token.name} withdrawing failed`,
    },
  });

  return {
    pendingWithdrawToast: pending,
    successWithdrawToast: success,
    errorWithdrawToast: error,
  };
};
