import { Token } from "@/types";
import { useToast } from "@/hooks";

export type ApproveToastProps = {
  amount: string;
  token: Token;
};
export const useApproveToast = (props: ApproveToastProps) => {
  const { amount, token } = props;

  const { pending, success, error } = useToast({
    action: "Approve",
    descriptions: {
      pending: `Approving ${amount} ${token.name}, please wait.`,
      success: `Successfully approved ${amount} ${token.name}!`,
      error: `The ${token.name} approval failed`,
    },
  });

  return {
    pendingApproveToast: pending,
    successApproveToast: success,
    errorApproveToast: error,
  };
};
