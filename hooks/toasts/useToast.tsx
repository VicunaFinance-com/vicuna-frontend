import { ErrorToast, PendingToast, SuccessToast } from "@/components";
import { useCallback } from "react";
import { toast } from "react-toastify";

export type ToastProps = {
  action: string;
  descriptions: {
    pending: string;
    success: string;
    error: string;
  };
  link?: string;
};

export const useToast = (props: ToastProps) => {
  const { action, descriptions, link } = props;

  const pending = useCallback(
    (hash: string) => {
      toast.info(
        <PendingToast
          action={action}
          description={descriptions.pending}
          link={link}
        />,
        {
          toastId: hash,
          autoClose: false,
        }
      );
    },
    [action, descriptions.pending, link]
  );

  const success = useCallback(
    (hash: string) => {
      if (toast.isActive(hash)) {
        toast.update(hash, {
          render: (
            <SuccessToast
              action={action}
              description={descriptions.success}
              link={link}
            />
          ),
          type: "success",
          autoClose: 5000,
        });
      } else {
        toast.success(
          <SuccessToast action={action} description={descriptions.success} />,
          {
            toastId: hash,
            autoClose: 5000,
          }
        );
      }
    },
    [action, descriptions.success, link]
  );

  const error = useCallback(
    (hash: string, error?: string) => {
      if (toast.isActive(hash)) {
        toast.update(hash, {
          render: (
            <ErrorToast
              action={action}
              description={error ? error : descriptions.error}
            />
          ),
          type: "error",
          autoClose: 5000,
        });
      } else {
        toast.error(
          <ErrorToast
            action={action}
            description={error ? error : descriptions.error}
          />,
          {
            toastId: hash,
            autoClose: 5000,
          }
        );
      }
    },
    [action, descriptions.error]
  );

  return { pending, success, error };
};
