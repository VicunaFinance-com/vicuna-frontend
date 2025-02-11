import { ReactNode } from "react";
import { LocalIcon } from "@/components/new";

export const BaseToast = ({
  title,
  titleIcon,
  description,
  link = "",
}: {
  title: string;
  titleIcon: ReactNode;
  description: string;
  link?: string;
}) => {
  return (
    <div className="flex flex-col gap-[5px] z-100">
      <div className="flex flex-row gap-[8px]">
        <div className="self-center">{titleIcon}</div>
        <div className="font-grenze font-bold text-[18px] leading-none h-[18px]">
          {title}
        </div>
      </div>
      <div className="font-inter text-[14px] text-[#8CACCC] leading-[21px] mt-[5px]">
        {description}
      </div>
      {link && (
        <a
          href={link}
          target="_blank"
          className="font-inter text-[14px] text-[#8CACCC] leading-[21px] group hover:underline"
        >
          <div className="flex flex-row gap-[5px]">
            <div className="text-[#C9B46A] leading-[21px] group-hover:underline">
              View transaction
            </div>
            <LocalIcon name="arrow-up-right" size={11} />
          </div>
        </a>
      )}
    </div>
  );
};

export const SuccessToast = ({
  action,
  description,
  link,
}: {
  action: string;
  description: string;
  link?: string;
}) => (
  <BaseToast
    title={`${action} successful!`}
    titleIcon={<LocalIcon name="check-circle" size={14} />}
    description={description}
    link={link}
  />
);

export const PendingToast = ({
  action,
  description,
  link,
}: {
  action: string;
  description: string;
  link?: string;
}) => (
  <BaseToast
    title={`${action} in progress...`}
    titleIcon={<LocalIcon name="clock" size={14} />}
    description={description}
    link={link}
  />
);

export const ErrorToast = ({
  action,
  description,
  link,
}: {
  action: string;
  description: string;
  link?: string;
}) => (
  <BaseToast
    title={`${action} failed!`}
    titleIcon={<LocalIcon name="circle-exclamation" size={14} />}
    description={description}
    link={link}
  />
);
