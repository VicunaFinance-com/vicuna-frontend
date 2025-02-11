import { Token } from "@/types";
import { useToast } from "@/hooks";

export type SupplyToastProps = {
  amount: string;
  token: Token;
};
export const useSupplyToast = (props: SupplyToastProps) => {
  const { amount, token } = props;

  const { pending, success, error } = useToast({
    action: "Supply",
    descriptions: {
      pending: `Supplying ${amount} ${token.name}, please wait.`,
      success: `Successfully supplied ${amount} ${token.name}!`,
      error: `The ${token.name} supplying failed`,
    },
  });

  return {
    pendingSupplyToast: pending,
    successSupplyToast: success,
    errorSupplyToast: error,
  };
};
