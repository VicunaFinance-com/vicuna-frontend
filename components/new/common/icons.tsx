import Image from "next/image";

type ImageSize = number | `${number}` | undefined;

export const BaseIcon = ({
  className,
  name,
  url,
  h,
  w,
  size,
}: {
  className?: string;
  name: string;
  url: string;
  h?: ImageSize;
  w?: ImageSize;
  size?: ImageSize;
}) => {
  return (
    <Image
      className={className}
      src={url}
      alt={name}
      height={size ? size : h}
      width={size ? size : w}
    />
  );
};

export const LocalIcon = ({
  className,
  name,
  h,
  w,
  size,
  mode,
}: {
  className?: string;
  name: string;
  mode?: string;
  h?: ImageSize;
  w?: ImageSize;
  size?: ImageSize;
}) => {
  return (
    <BaseIcon
      className={className}
      name={name}
      url={`assets/icons/${mode ? mode + "/" : ""}${
        name + (mode ? "-" + mode : "")
      }.svg`}
      h={h}
      w={w}
      size={size}
    />
  );
};
