import { Token } from "@/types";
import { useToast } from "@/hooks";

export type BorrowToastProps = {
  amount: string;
  token: Token;
};
export const useBorrowToast = (props: BorrowToastProps) => {
  const { amount, token } = props;

  const { pending, success, error } = useToast({
    action: "Borrow",
    descriptions: {
      pending: `Borrowing ${amount} ${token.name}, please wait.`,
      success: `Successfully borrowed ${amount} ${token.name}!`,
      error: `The ${token.name} borrowing failed`,
    },
  });

  return {
    pendingBorrowToast: pending,
    successBorrowToast: success,
    errorBorrowToast: error,
  };
};
